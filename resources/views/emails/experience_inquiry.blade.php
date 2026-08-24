<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-w-xl mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-sm; }
        .header { background-color: #40030A; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
        .content { padding: 30px; }
        .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #555; }
        .value { margin-top: 5px; padding: 10px; background-color: #f9f9f9; border-left: 4px solid #40030A; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2 style="margin: 0;">New Experience Inquiry</h2>
        </div>
        
        <div class="content">
            <p>Hello <strong>{{ $experienceHost }}</strong>,</p>
            <p>You have received a new inquiry regarding the <strong>{{ $experienceTitle }}</strong> experience.</p>
            
            <hr style="border: none; border-top: 1px solid #eee; margin: 25px 0;">

            <div class="field">
                <div class="label">Inquirer Name</div>
                <div class="value">{{ $inquiry['name'] ?? 'Not provided' }}</div>
            </div>

            <div class="field">
                <div class="label">Inquirer Email</div>
                <div class="value">{{ $inquiry['email'] ?? 'Not provided' }}</div>
            </div>

            <div class="field">
                <div class="label">Contact Number</div>
                <div class="value">{{ $inquiry['phone'] ?: 'Not provided' }}</div>
            </div>

            <div class="field">
                <div class="label">Message</div>
                <div class="value" style="white-space: pre-wrap;">{{ $inquiry['message'] }}</div>
            </div>
            
            <p style="margin-top: 30px;">Please reply directly to the inquirer at <a href="mailto:{{ $inquiry['email'] }}">{{ $inquiry['email'] }}</a>.</p>
        </div>

        <div class="footer">
            &copy; {{ date('Y') }} Secret Places Sri Lanka. All rights reserved.
        </div>
    </div>
</body>
</html>
