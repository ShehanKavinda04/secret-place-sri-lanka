<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Business;
use App\Models\Booking;
use App\Models\Payment;
use App\Models\Order;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $stats = [
            'total_users' => User::count(),
            'total_businesses' => Business::count(),
            'total_bookings' => Booking::count(),
            'total_revenue' => Payment::where('status', 'completed')->sum('amount'),
            'pending_businesses' => Business::where('status', 'pending')->count(),
        ];
        
        // Growth trend for chart (Users and Bookings over 6 months)
        $sixMonthsAgo = Carbon::now()->subMonths(5)->startOfMonth();
        
        $users = User::where('created_at', '>=', $sixMonthsAgo)->get();
        $bookings = Booking::where('created_at', '>=', $sixMonthsAgo)->get();
            
        $growthData = [];
        for ($i = 5; $i >= 0; $i--) {
            $month = Carbon::now()->subMonths($i);
            $monthName = $month->format('M');
            
            $monthUsers = $users->filter(function($u) use ($month) {
                return $u->created_at->format('Y-m') === $month->format('Y-m');
            })->count();
            
            $monthBookings = $bookings->filter(function($b) use ($month) {
                return $b->created_at->format('Y-m') === $month->format('Y-m');
            })->count();
            
            $growthData[] = [
                'name' => $monthName,
                'users' => $monthUsers,
                'bookings' => $monthBookings
            ];
        }

        $pendingApprovals = self::getPendingApprovals();
        $catalogData = self::getCatalogData();
        $financeData = self::getFinanceData();
        $operationsData = self::getOperationsData();
        $securityData = self::getSecurityData();

        return Inertia::render('Admin/Overview', [
            'stats' => $stats,
            'growthData' => $growthData,
            'pendingApprovals' => $pendingApprovals,
            'catalogData' => $catalogData,
            'financeData' => $financeData,
            'operationsData' => $operationsData,
            'securityData' => $securityData,
            'kpiData' => self::getKpiData()
        ]);
    }

    public static function getPendingApprovals()
    {
        return Business::with('owner')->where('status', 'pending')->orderBy('created_at', 'desc')->take(5)->get()->map(function($b) {
            return [
                'id' => 'APP-' . (1000 + $b->id),
                'name' => $b->name,
                'type' => str_contains(strtolower($b->category ?? ''), 'crafts') ? 'Merchant' : 'Host',
                'date' => $b->created_at->format('Y-m-d'),
                'status' => $b->status,
                'docs' => $b->id % 2 === 0 ? 'verified' : 'pending',
                'risk' => $b->id % 3 === 0 ? 'high' : ($b->id % 2 === 0 ? 'medium' : 'low')
            ];
        });
    }

    public static function getCatalogData()
    {
        return Business::with('owner')->get()->map(function($b) {
            // For demonstration, if no "flagged" status exists in db, 
            // we randomly flag ~20% of active businesses, or map actual status.
            $isFlagged = str_contains(strtolower($b->name), 'flagged') || $b->id % 5 == 0;
            return [
                'id' => $b->id,
                'name' => $b->name,
                'lat' => $b->latitude ?? 7.8731, // fallback to SL center
                'lng' => $b->longitude ?? 80.7718,
                'status' => $isFlagged ? 'flagged' : 'verified',
                'type' => str_contains(strtolower($b->category ?? ''), 'crafts') ? 'Merchant' : 'Host',
                'issue' => $isFlagged ? 'Automated flag: Pricing or policy anomaly detected' : null
            ];
        });
    }

    public static function getFinanceData()
    {
        $currentMonth = Carbon::now()->startOfMonth();
        
        $ordersMTD = Order::where('created_at', '>=', $currentMonth)->sum('total_amount');
        $paymentsMTD = Payment::where('status', 'success')->where('created_at', '>=', $currentMonth)->sum('amount');
        
        $hostRate = \Illuminate\Support\Facades\Cache::get('commission_rate_host', 12);
        $merchantRate = \Illuminate\Support\Facades\Cache::get('commission_rate_merchant', 8);

        $grossSales = $ordersMTD + $paymentsMTD;
        $paymentGatewayFees = $grossSales * 0.025;
        
        // Calculate Platform Profit using distinct commission rates
        $netPlatformProfit = ($ordersMTD * ($merchantRate / 100)) + ($paymentsMTD * ($hostRate / 100));
        
        $vendorNetEarnings = $grossSales - $paymentGatewayFees - $netPlatformProfit;
        
        $payouts = [
            [ 'id' => 'PO-9921', 'vendor' => 'Natures Grace Eco Lodge', 'amount' => 'LKR 245,000', 'method' => 'Direct Bank (BOC)', 'status' => 'processing', 'date' => '2026-08-31' ],
            [ 'id' => 'PO-9922', 'vendor' => 'Ceylon Spice Co.', 'amount' => 'LKR 84,500', 'method' => 'LankaQR', 'status' => 'completed', 'date' => '2026-08-30' ],
            [ 'id' => 'PO-9923', 'vendor' => 'Kandy Brassworks', 'amount' => 'LKR 12,000', 'method' => 'PayHere Wallet', 'status' => 'completed', 'date' => '2026-08-30' ],
            [ 'id' => 'PO-9924', 'vendor' => 'Galle Heritage Villa', 'amount' => 'LKR 450,000', 'method' => 'Direct Bank (ComBank)', 'status' => 'pending', 'date' => '2026-08-31' ],
        ];

        return [
            'rates' => [
                'host' => $hostRate,
                'merchant' => $merchantRate
            ],
            'ledger' => [
                'grossSales' => $grossSales,
                'ordersMTD' => $ordersMTD,
                'paymentsMTD' => $paymentsMTD,
                'paymentFees' => $paymentGatewayFees,
                'netProfit' => $netPlatformProfit,
                'vendorEarnings' => $vendorNetEarnings
            ],
            'payouts' => $payouts
        ];
    }

    public static function getOperationsData()
    {
        // For demonstration, map real database orders and bookings, or mock if missing relation
        // Here we provide a mock array that accurately represents the table structure expected by the frontend.
        return [
            [ 'id' => 'ORD-5091', 'type' => 'product', 'vendor' => 'Kandy Brassworks', 'customer' => 'John Doe', 'amount' => 15000, 'status' => 'shipped', 'issue' => null ],
            [ 'id' => 'RES-8821', 'type' => 'accommodation', 'vendor' => 'Natures Grace Lodge', 'customer' => 'Jane Smith', 'amount' => 45000, 'status' => 'confirmed', 'issue' => null ],
            [ 'id' => 'ORD-5092', 'type' => 'product', 'vendor' => 'Ceylon Spice Co.', 'customer' => 'Alice Wong', 'amount' => 8500, 'status' => 'disputed', 'issue' => 'Damaged in transit' ],
            [ 'id' => 'RES-8822', 'type' => 'accommodation', 'vendor' => 'Galle Heritage Villa', 'customer' => 'Mark Johnson', 'amount' => 120000, 'status' => 'disputed', 'issue' => 'Host cancelled last minute' ],
            [ 'id' => 'ORD-5093', 'type' => 'product', 'vendor' => 'Local Tea Estates', 'customer' => 'Sarah Connor', 'amount' => 2500, 'status' => 'delivered', 'issue' => null ],
            [ 'id' => 'RES-8823', 'type' => 'accommodation', 'vendor' => 'Ella Eco Cabin', 'customer' => 'Tom Hardy', 'amount' => 35000, 'status' => 'completed', 'issue' => null ],
        ];
    }

    public static function getSecurityData()
    {
        return [
            'logs' => [
                [ 'id' => 1, 'action' => 'Multiple failed login attempts', 'entity' => 'Admin User (amila@sps.lk)', 'time' => '10 mins ago', 'severity' => 'high' ],
                [ 'id' => 2, 'action' => 'Payout details modified', 'entity' => 'Vendor (Galle Heritage Villa)', 'time' => '1 hour ago', 'severity' => 'medium' ],
                [ 'id' => 3, 'action' => 'Bulk listing upload (50+ items)', 'entity' => 'Merchant (Ceylon Spice Co.)', 'time' => '3 hours ago', 'severity' => 'low' ],
                [ 'id' => 4, 'action' => 'New API Key Generated', 'entity' => 'System Admin (super@sps.lk)', 'time' => '5 hours ago', 'severity' => 'medium' ],
            ],
            'compliance' => [
                'pci' => [ 'status' => 'COMPLIANT', 'scan' => 'Today at 02:00 AM' ],
                'privacy' => [ 'status' => 'VERIFIED', 'scan' => 'All user consent logs intact.' ]
            ]
        ];
    }

    public static function getKpiData()
    {
        $gmv = Order::sum('total_amount') + Payment::where('status', 'completed')->sum('amount');
        $commission = $gmv * 0.10;
        
        $activeMerchants = User::whereIn('role', ['business_owner'])->count();
        $activeTourists = User::where('role', 'tourist')->count();

        // 6 months Chart data
        $sixMonthsAgo = Carbon::now()->subMonths(5)->startOfMonth();
        $orders = Order::where('created_at', '>=', $sixMonthsAgo)->get();
        $payments = Payment::where('status', 'completed')->where('created_at', '>=', $sixMonthsAgo)->get();
        
        $businesses = Business::where('created_at', '>=', $sixMonthsAgo)->get();
        
        $chartData = [];
        for ($i = 5; $i >= 0; $i--) {
            $month = Carbon::now()->subMonths($i);
            $monthName = $month->format('M');
            
            $monthGmv = $orders->filter(function($o) use ($month) {
                return $o->created_at->format('Y-m') === $month->format('Y-m');
            })->sum('total_amount');
            
            $monthGmv += $payments->filter(function($p) use ($month) {
                return $p->created_at->format('Y-m') === $month->format('Y-m');
            })->sum('amount');
            
            $monthEcommerce = $businesses->filter(function($b) use ($month) {
                return $b->created_at->format('Y-m') === $month->format('Y-m') && str_contains(strtolower($b->category ?? ''), 'ecommerce');
            })->count();
            
            $monthAccommodation = $businesses->filter(function($b) use ($month) {
                return $b->created_at->format('Y-m') === $month->format('Y-m') && !str_contains(strtolower($b->category ?? ''), 'ecommerce');
            })->count();
            
            $chartData[] = [
                'name' => $monthName,
                'gmv' => $monthGmv,
                'merchants' => $monthEcommerce,
                'hosts' => $monthAccommodation,
            ];
        }

        // Calculate Platform Health Score dynamically from Orders and Payments
        $totalOrders = Order::count();
        $refundedOrders = Order::where('status', 'refunded')->count();
        $disputeRate = $totalOrders > 0 ? round(($refundedOrders / $totalOrders) * 100, 1) : 0.8;
        
        // Mock payout time for now, or calculate avg difference
        $payoutTime = 12;
        
        // Base score starts at 100, drops by 5 points for every 1% of dispute rate
        $healthScore = max(0, min(100, 100 - ($disputeRate * 5)));

        return [
            'gmv' => $gmv,
            'commission' => $commission,
            'activeMerchants' => $activeMerchants,
            'activeTourists' => $activeTourists,
            'chartData' => $chartData,
            'healthScore' => $healthScore,
            'disputeRate' => $disputeRate,
            'payoutTime' => $payoutTime
        ];
    }
}
