export function createWelcomeEmailTemplate(name, verificationLink) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Welcome to MariGo</title>
</head>
<body style="margin:0; padding:0; background-color:#f0f7ff; font-family:Helvetica, Arial, sans-serif;">

<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f0f7ff;">
  <tr>
    <td align="center" style="padding:40px 20px;">

      <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0"
        style="max-width:600px; background:#ffffff; border-radius:24px; overflow:hidden; box-shadow:0 10px 40px rgba(14,42,108,0.08);">

        <!-- Header -->
        <tr>
          <td align="center" style="padding:40px 40px 24px 40px;">
            <div style="display:inline-flex; align-items:center; gap:12px; background:#f0f7ff; padding:14px 28px; border-radius:14px; border:1px solid #dbeafe;">
              <span style="font-size:20px;">💬</span>
              <div>
                <div style="font-size:18px; font-weight:700; color:#1e3a5f; letter-spacing:0.5px;">MariGo</div>
                <div style="font-size:10px; color:#60a5fa; letter-spacing:2px; text-transform:uppercase;">Real-Time Chat</div>
              </div>
            </div>
          </td>
        </tr>

        <!-- Hero text -->
        <tr>
          <td style="padding:8px 50px 0 50px; text-align:center;">
            <h1 style="margin:0; font-size:32px; line-height:42px; color:#1e3a5f; font-weight:700;">
              Welcome aboard, ${name}!
            </h1>
            <p style="margin:20px 0 0 0; font-size:16px; line-height:28px; color:#64748b;">
              Your MariGo account is ready. Connect instantly with friends and loved ones through secure, real-time messaging.
            </p>
          </td>
        </tr>

        <!-- Stats row -->
        <tr>
          <td style="padding:36px 50px 0 50px;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
              <tr>
                <td align="center" style="padding:16px; background:#f0f7ff; border-radius:14px; width:33%;">
                  <div style="font-size:22px; font-weight:700; color:#1e3a5f;">10K+</div>
                  <div style="font-size:12px; color:#60a5fa; margin-top:2px;">Active Users</div>
                </td>
                <td width="12" />
                <td align="center" style="padding:16px; background:#f0f7ff; border-radius:14px; width:33%;">
                  <div style="font-size:22px; font-weight:700; color:#1e3a5f;">500K+</div>
                  <div style="font-size:12px; color:#60a5fa; margin-top:2px;">Messages Daily</div>
                </td>
                <td width="12" />
                <td align="center" style="padding:16px; background:#f0f7ff; border-radius:14px; width:33%;">
                  <div style="font-size:22px; font-weight:700; color:#1e3a5f;">99.9%</div>
                  <div style="font-size:12px; color:#60a5fa; margin-top:2px;">Uptime</div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- CTA Button -->
        <tr>
          <td align="center" style="padding:40px 50px 50px 50px;">
            <table role="presentation" cellspacing="0" cellpadding="0" border="0">
              <tr>
                <td align="center" bgcolor="#0ea5e9" style="border-radius:14px;">
                  <a href="${verificationLink}" target="_blank"
                    style="display:inline-block; padding:16px 40px; color:#ffffff; text-decoration:none; font-size:15px; font-weight:600; border-radius:14px; letter-spacing:0.3px;">
                    Start Chatting →
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Divider -->
        <tr>
          <td style="padding:0 40px;">
            <div style="height:1px; background:#e0f0ff;"></div>
          </td>
        </tr>

        <!-- Footer note -->
        <tr>
          <td style="padding:30px 50px 16px 50px;">
            <p style="margin:0; font-size:13px; line-height:24px; color:#94a3b8;">
              If you did not create this account, you can safely ignore this email.
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td align="center" style="padding:0 40px 36px 40px;">
            <p style="margin:0; font-size:13px; color:#94a3b8;">MariGo · India</p>
            <p style="margin:8px 0 0 0; font-size:13px; color:#94a3b8;">
              Need help?
              <a href="mailto:support@marigo.app" style="color:#0ea5e9; text-decoration:none;">support@marigo.app</a>
            </p>
            <p style="margin:8px 0 0 0; font-size:13px; color:#94a3b8;">© 2026 MariGo. All rights reserved.</p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>

</body>
</html>
`;
}

export function createPasswordResetEmailTemplate(otp) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Reset Your Password</title>
</head>
<body style="margin:0; padding:0; background-color:#f0f7ff; font-family:Helvetica, Arial, sans-serif;">

<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f0f7ff;">
  <tr>
    <td align="center" style="padding:40px 20px;">

      <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0"
        style="max-width:600px; background:#ffffff; border-radius:24px; overflow:hidden; box-shadow:0 10px 40px rgba(14,42,108,0.08);">

        <!-- Header -->
        <tr>
          <td align="center" style="padding:40px 40px 24px 40px;">
            <div style="display:inline-flex; align-items:center; gap:12px; background:#f0f7ff; padding:14px 28px; border-radius:14px; border:1px solid #dbeafe;">
              <span style="font-size:20px;">💬</span>
              <div>
                <div style="font-size:18px; font-weight:700; color:#1e3a5f; letter-spacing:0.5px;">MariGo</div>
                <div style="font-size:10px; color:#60a5fa; letter-spacing:2px; text-transform:uppercase;">Real-Time Chat</div>
              </div>
            </div>
          </td>
        </tr>

        <!-- Title -->
        <tr>
          <td style="padding:8px 50px 0 50px; text-align:center;">
            <h1 style="margin:0; font-size:30px; line-height:40px; color:#1e3a5f; font-weight:700;">
              Password Reset Request
            </h1>
            <p style="margin:16px 0 0 0; font-size:15px; line-height:26px; color:#64748b;">
              Use the OTP below to reset your MariGo password. It expires in <strong>15 minutes</strong>.
            </p>
          </td>
        </tr>

        <!-- OTP Box -->
        <tr>
          <td align="center" style="padding:36px 50px;">
            <div style="display:inline-block; background:#f0f7ff; border:2px dashed #93c5fd; border-radius:16px; padding:24px 48px;">
              <div style="font-size:11px; color:#60a5fa; letter-spacing:3px; text-transform:uppercase; margin-bottom:8px;">Your OTP</div>
              <div style="font-size:40px; font-weight:700; color:#1e3a5f; letter-spacing:10px;">${otp}</div>
            </div>
          </td>
        </tr>

        <!-- Warning -->
        <tr>
          <td style="padding:0 50px 40px 50px; text-align:center;">
            <p style="margin:0; font-size:13px; line-height:22px; color:#94a3b8;">
              Do not share this OTP with anyone. MariGo will never ask for your OTP.
            </p>
          </td>
        </tr>

        <!-- Divider -->
        <tr>
          <td style="padding:0 40px;">
            <div style="height:1px; background:#e0f0ff;"></div>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td align="center" style="padding:30px 40px 36px 40px;">
            <p style="margin:0; font-size:13px; color:#94a3b8;">
              If you didn't request this, you can safely ignore this email.
            </p>
            <p style="margin:8px 0 0 0; font-size:13px; color:#94a3b8;">© 2026 MariGo. All rights reserved.</p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>

</body>
</html>
`;
}