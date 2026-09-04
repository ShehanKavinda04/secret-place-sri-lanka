<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>{{ $type === 'otp' ? 'Your Password Reset OTP' : 'Reset Your Password' }} — {{ $appName }}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #F0F4F0; color: #1a1a1a; }
        .wrapper { max-width: 600px; margin: 40px auto; padding: 0 16px; }
        .card { background: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 4px 24px rgba(27, 77, 62, 0.12); }
        .header { background: linear-gradient(135deg, #1B4D3E 0%, #0d3328 100%); padding: 40px 40px 32px; text-align: center; }
        .logo-circle { width: 70px; height: 70px; background: rgba(255,255,255,0.15); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; border: 2px solid rgba(255,255,255,0.25); }
        .logo-icon { font-size: 32px; line-height: 1; }
        .header h1 { color: #ffffff; font-size: 22px; font-weight: 700; letter-spacing: -0.3px; margin-bottom: 6px; }
        .header p { color: rgba(255,255,255,0.7); font-size: 14px; }
        .body { padding: 40px; }
        .greeting { font-size: 18px; font-weight: 700; color: #1B4D3E; margin-bottom: 12px; }
        .text { font-size: 15px; line-height: 1.7; color: #4a5568; margin-bottom: 16px; }

        /* OTP Box */
        .otp-container { text-align: center; margin: 32px 0; }
        .otp-label { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #6b7280; margin-bottom: 16px; }
        .otp-code { display: inline-block; font-size: 48px; font-weight: 800; letter-spacing: 12px; color: #1B4D3E; background: #F0F9F6; border: 2px dashed #1B4D3E; border-radius: 16px; padding: 20px 36px; font-family: 'Courier New', monospace; }
        .otp-expiry { font-size: 13px; color: #D97706; font-weight: 600; margin-top: 14px; }

        /* Link Button */
        .btn-container { text-align: center; margin: 32px 0; }
        .btn { display: inline-block; background: linear-gradient(135deg, #D97706 0%, #b56305 100%); color: #ffffff; text-decoration: none; font-weight: 700; font-size: 15px; letter-spacing: 0.3px; padding: 16px 40px; border-radius: 12px; box-shadow: 0 4px 12px rgba(217, 119, 6, 0.35); }
        .link-fallback { font-size: 12px; color: #9ca3af; margin-top: 20px; word-break: break-all; }
        .link-fallback a { color: #1B4D3E; }

        /* Divider */
        .divider { height: 1px; background: #e5e7eb; margin: 28px 0; }

        /* Security Box */
        .security-box { background: #FFF9F0; border: 1px solid #FEE9B8; border-radius: 12px; padding: 18px 20px; margin-bottom: 28px; }
        .security-box p { font-size: 13px; color: #78340f; line-height: 1.6; }
        .security-box strong { color: #D97706; }

        /* Footer */
        .footer { background: #F8FAFC; padding: 24px 40px; text-align: center; border-top: 1px solid #e5e7eb; }
        .footer p { font-size: 12px; color: #9ca3af; line-height: 1.8; }
        .footer a { color: #1B4D3E; text-decoration: none; font-weight: 600; }
        .badge { display: inline-block; background: #1B4D3E; color: white; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; padding: 3px 10px; border-radius: 20px; margin-bottom: 12px; }
    </style>
</head>
<body>
<div class="wrapper">
    <div class="card">
        <!-- Header -->
        <div class="header">
            <div class="logo-circle">
                <span class="logo-icon">🌿</span>
            </div>
            <h1>{{ $appName }}</h1>
            <p>Discover the Hidden Beauty of Sri Lanka</p>
        </div>

        <!-- Body -->
        <div class="body">
            <p class="greeting">Hello, {{ explode(' ', $user->name)[0] }} 👋</p>

            @if ($type === 'confirmation')
                <p class="text">Your Secret Place Sri Lanka password was changed successfully. All other active sessions have been signed out.</p>
                <div class="security-box">
                    <p><strong>Wasn't you?</strong> Contact our support team immediately and secure your email account.</p>
                </div>
            @elseif ($type === 'otp')
                <p class="text">We received a request to reset the password for your account. Use the one-time verification code below to proceed. This code is valid for <strong>10 minutes</strong> only.</p>

                <div class="otp-container">
                    <p class="otp-label">Your One-Time Password</p>
                    <div class="otp-code">{{ $otp }}</div>
                    <p class="otp-expiry">⏱ Expires in 10 minutes</p>
                </div>

                <p class="text" style="font-size:13px; color:#6b7280;">Enter this code on the Secret Place Sri Lanka password reset page. Do not share this code with anyone.</p>
            @else
                <p class="text">We received a request to reset the password for your account. Click the button below to create a new password. This link will expire in <strong>60 minutes</strong>.</p>

                <div class="btn-container">
                    <a href="{{ $resetUrl }}" class="btn">🔑 &nbsp; Reset My Password</a>
                </div>

                <p class="text link-fallback">
                    If the button doesn't work, copy and paste this link into your browser:<br>
                    <a href="{{ $resetUrl }}">{{ $resetUrl }}</a>
                </p>
            @endif

            <div class="divider"></div>

            <div class="security-box">
                <p>🔒 <strong>Security Notice:</strong> If you did not request a password reset, please ignore this email or <a href="{{ url('/contact') }}" style="color:#D97706;">contact our support team</a> immediately. Your account remains secure and no changes have been made.</p>
            </div>
        </div>

        <!-- Footer -->
        <div class="footer">
            <span class="badge">Secure Notification</span>
            <p>
                This email was sent to <strong>{{ $user->email }}</strong><br>
                © {{ date('Y') }} <a href="{{ url('/') }}">{{ $appName }}</a> · All rights reserved<br>
                <a href="{{ url('/privacy') }}">Privacy Policy</a> &nbsp;·&nbsp; <a href="{{ url('/contact') }}">Support</a>
            </p>
        </div>
    </div>
</div>
</body>
</html>
