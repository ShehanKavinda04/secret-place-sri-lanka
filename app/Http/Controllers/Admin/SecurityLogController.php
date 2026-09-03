<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class SecurityLogController extends Controller
{
    public function index(Request $request)
    {
        // Mock dataset for Security Logs
        $mockLogs = collect([
            [
                'id' => 'SEC-9081',
                'timestamp' => Carbon::now()->subMinutes(2)->toIso8601String(),
                'user' => [
                    'name' => 'John Doe',
                    'email' => 'admin@secretplace.lk',
                    'role' => 'Super Admin',
                    'avatar' => 'https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff'
                ],
                'event' => 'SYSTEM_BACKUP_INITIATED',
                'severity' => 'info',
                'ip_address' => '192.168.1.45',
                'location' => 'Colombo, LK',
                'user_agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36',
                'metadata' => [
                    'trigger' => 'automated_cron',
                    'target_db' => 'production_main',
                    'auth_token' => 'Valid',
                    'headers' => [
                        'Host' => 'admin.secretplace.lk',
                        'Accept' => 'application/json'
                    ]
                ]
            ],
            [
                'id' => 'SEC-9080',
                'timestamp' => Carbon::now()->subMinutes(15)->toIso8601String(),
                'user' => [
                    'name' => 'System',
                    'email' => 'system@internal',
                    'role' => 'System',
                    'avatar' => 'https://ui-avatars.com/api/?name=System&background=333&color=fff'
                ],
                'event' => 'API_RATE_LIMIT_EXCEEDED',
                'severity' => 'warning',
                'ip_address' => '104.28.21.14',
                'location' => 'Singapore, SG',
                'user_agent' => 'python-requests/2.26.0',
                'metadata' => [
                    'endpoint' => '/api/v1/auth/login',
                    'attempts' => 150,
                    'window' => '1 minute',
                    'action_taken' => 'IP_BLOCKED_TEMPORARY'
                ]
            ],
            [
                'id' => 'SEC-9079',
                'timestamp' => Carbon::now()->subMinutes(45)->toIso8601String(),
                'user' => [
                    'name' => 'Unknown Actor',
                    'email' => 'N/A',
                    'role' => 'Guest',
                    'avatar' => 'https://ui-avatars.com/api/?name=Unknown&background=e11d48&color=fff'
                ],
                'event' => 'FAILED_LOGIN_ATTEMPT',
                'severity' => 'critical',
                'ip_address' => '45.133.1.22',
                'location' => 'Moscow, RU',
                'user_agent' => 'Mozilla/5.0 (X11; Linux x86_64; rv:89.0) Gecko/20100101 Firefox/89.0',
                'metadata' => [
                    'attempted_email' => 'superadmin@secretplace.lk',
                    'reason' => 'INVALID_PASSWORD',
                    'headers' => [
                        'X-Forwarded-For' => '45.133.1.22',
                        'User-Agent' => 'Mozilla/5.0 Firefox/89.0'
                    ]
                ]
            ],
            [
                'id' => 'SEC-9078',
                'timestamp' => Carbon::now()->subHours(2)->toIso8601String(),
                'user' => [
                    'name' => 'Jane Smith',
                    'email' => 'manager@secretplace.lk',
                    'role' => 'Admin',
                    'avatar' => 'https://ui-avatars.com/api/?name=Jane+Smith&background=10b981&color=fff'
                ],
                'event' => 'USER_ROLE_UPDATED',
                'severity' => 'info',
                'ip_address' => '175.157.2.10',
                'location' => 'Kandy, LK',
                'user_agent' => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Safari/605.1.15',
                'metadata' => [
                    'target_user_id' => 442,
                    'old_role' => 'Tourist',
                    'new_role' => 'Merchant',
                    'approved_by' => 'Jane Smith'
                ]
            ],
            [
                'id' => 'SEC-9077',
                'timestamp' => Carbon::now()->subHours(3)->toIso8601String(),
                'user' => [
                    'name' => 'Michael Chen',
                    'email' => 'merchant@demo.com',
                    'role' => 'Merchant',
                    'avatar' => 'https://ui-avatars.com/api/?name=Michael+Chen&background=f59e0b&color=fff'
                ],
                'event' => 'PAYMENT_REFUNDED',
                'severity' => 'warning',
                'ip_address' => '202.124.50.12',
                'location' => 'Galle, LK',
                'user_agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Edge/119.0.0.0',
                'metadata' => [
                    'transaction_id' => 'TXN-88421',
                    'amount' => 45000.00,
                    'currency' => 'LKR',
                    'gateway' => 'PayHere',
                    'reason' => 'CUSTOMER_REQUESTED_CANCELLATION'
                ]
            ],
            [
                'id' => 'SEC-9076',
                'timestamp' => Carbon::now()->subHours(5)->toIso8601String(),
                'user' => [
                    'name' => 'System',
                    'email' => 'system@internal',
                    'role' => 'System',
                    'avatar' => 'https://ui-avatars.com/api/?name=System&background=333&color=fff'
                ],
                'event' => 'FIREWALL_RULE_TRIGGERED',
                'severity' => 'critical',
                'ip_address' => '185.191.171.1',
                'location' => 'Beijing, CN',
                'user_agent' => 'sqlmap/1.5.2',
                'metadata' => [
                    'rule' => 'SQL_INJECTION_PREVENTION',
                    'payload_snippet' => '\' OR 1=1 --',
                    'action_taken' => 'CONNECTION_DROPPED'
                ]
            ],
            [
                'id' => 'SEC-9075',
                'timestamp' => Carbon::now()->subDays(1)->toIso8601String(),
                'user' => [
                    'name' => 'John Doe',
                    'email' => 'admin@secretplace.lk',
                    'role' => 'Super Admin',
                    'avatar' => 'https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff'
                ],
                'event' => 'ADMIN_LOGIN_SUCCESS',
                'severity' => 'info',
                'ip_address' => '192.168.1.45',
                'location' => 'Colombo, LK',
                'user_agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36',
                'metadata' => [
                    'session_id' => 'sess_842jfkf82jff82',
                    'mfa_status' => 'VERIFIED'
                ]
            ],
            [
                'id' => 'SEC-9074',
                'timestamp' => Carbon::now()->subDays(1)->subHours(2)->toIso8601String(),
                'user' => [
                    'name' => 'Support Team',
                    'email' => 'support@secretplace.lk',
                    'role' => 'Admin',
                    'avatar' => 'https://ui-avatars.com/api/?name=Support&background=8b5cf6&color=fff'
                ],
                'event' => 'BUSINESS_SUSPENDED',
                'severity' => 'warning',
                'ip_address' => '192.168.1.50',
                'location' => 'Colombo, LK',
                'user_agent' => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
                'metadata' => [
                    'business_id' => 45,
                    'business_name' => 'Ocean View Rest',
                    'reason' => 'MULTIPLE_POLICY_VIOLATIONS'
                ]
            ]
        ]);

        // Filtering logic based on request
        $query = clone $mockLogs;

        if ($request->filled('search')) {
            $search = strtolower($request->input('search'));
            $query = $query->filter(function ($log) use ($search) {
                return str_contains(strtolower($log['id']), $search) ||
                       str_contains(strtolower($log['event']), $search) ||
                       str_contains(strtolower($log['ip_address']), $search) ||
                       str_contains(strtolower($log['user']['email']), $search);
            });
        }

        if ($request->filled('severity') && $request->input('severity') !== 'all') {
            $query = $query->where('severity', $request->input('severity'));
        }

        // Filter by Type
        if ($request->filled('type') && $request->input('type') !== 'all') {
            $type = $request->input('type');
            $query = $query->filter(function ($log) use ($type) {
                if ($type === 'auth') {
                    return in_array($log['event'], ['FAILED_LOGIN_ATTEMPT', 'ADMIN_LOGIN_SUCCESS']);
                }
                if ($type === 'user') {
                    return in_array($log['event'], ['USER_ROLE_UPDATED', 'BUSINESS_SUSPENDED', 'PAYMENT_REFUNDED']);
                }
                if ($type === 'system') {
                    return in_array($log['event'], ['SYSTEM_BACKUP_INITIATED', 'API_RATE_LIMIT_EXCEEDED', 'FIREWALL_RULE_TRIGGERED']);
                }
                if ($type === 'critical') {
                    return $log['severity'] === 'critical';
                }
                return true;
            });
        }

        // Filter by Timeframe
        if ($request->filled('timeframe') && !in_array($request->input('timeframe'), ['all', 'live', 'custom'])) {
            $timeframe = $request->input('timeframe');
            $now = \Carbon\Carbon::now();
            $query = $query->filter(function ($log) use ($timeframe, $now) {
                $logTime = \Carbon\Carbon::parse($log['timestamp']);
                if ($timeframe === '1h') {
                    return $logTime->greaterThanOrEqualTo($now->copy()->subHour());
                }
                if ($timeframe === '24h') {
                    return $logTime->greaterThanOrEqualTo($now->copy()->subHours(24));
                }
                if ($timeframe === '7d') {
                    return $logTime->greaterThanOrEqualTo($now->copy()->subDays(7));
                }
                return true;
            });
        }

        // Simulating pagination for array
        $page = $request->input('page', 1);
        $perPage = 15;
        $total = $query->count();
        
        $paginatedLogs = new \Illuminate\Pagination\LengthAwarePaginator(
            $query->forPage($page, $perPage)->values(),
            $total,
            $perPage,
            $page,
            ['path' => $request->url(), 'query' => $request->query()]
        );

        $stats = [
            'totalEvents' => $mockLogs->count() * 124, // Simulated larger number
            'failedLogins' => $mockLogs->where('event', 'FAILED_LOGIN_ATTEMPT')->count() * 42,
            'activeAdmins' => 3,
            'flaggedIps' => 12
        ];

        return Inertia::render('Admin/SecurityLogs', [
            'logs' => $paginatedLogs,
            'stats' => $stats,
            'filters' => $request->only(['search', 'severity', 'timeframe', 'type'])
        ]);
    }
}
