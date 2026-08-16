<x-mail::message>
# Order Confirmation

Thank you for your purchase, {{ $orderData['customer']['firstName'] }}!

We've received your order and payment. Below are the details of your transaction.

**Payment Code:** {{ $orderData['payment_code'] }}

## Order Details

| Item | Qty | Price |
| :--- | :---: | :--- |
| {{ $orderData['product']['title'] }} | {{ $orderData['quantity'] }} | Rs. {{ number_format($orderData['subtotal'], 2) }} |

**Shipping:** Rs. {{ number_format($orderData['shipping'], 2) }}  
**Total Paid:** **Rs. {{ number_format($orderData['total'], 2) }}**  

## Shipping Details
{{ $orderData['customer']['firstName'] }} {{ $orderData['customer']['lastName'] }}  
{{ $orderData['customer']['address'] }}  
{{ $orderData['customer']['city'] }}, {{ $orderData['customer']['postalCode'] }}  
{{ $orderData['customer']['phone'] }}  

If you have any questions about your order, please contact our support team and quote your Payment Code.

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
