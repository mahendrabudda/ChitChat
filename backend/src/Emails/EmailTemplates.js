export function createWelcomeEmailTemplate(name, verificationLink) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Welcome to ChitChat</title>
</head>
<body style="margin:0; padding:0; background-color:#f6f9fc; font-family:Helvetica, Arial, sans-serif;">

<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f6f9fc;">
  <tr>
    <td align="center" style="padding:40px 20px;">

      <table role="presentation"
             width="600"
             cellspacing="0"
             cellpadding="0"
             border="0"
             style="max-width:600px; background:#ffffff; border-radius:20px; overflow:hidden; box-shadow:0 10px 35px rgba(15,23,42,0.06);">

        <!-- Header -->
        <tr>
          <td align="center" style="padding:40px 40px 20px 40px;">
            <div style="display:inline-block; padding:12px 24px; border-radius:12px; background:#eef4ff;">
              <span style="font-size:20px; font-weight:700; color:#0f172a;">
                💬 ChitChat
              </span>
            </div>
          </td>
        </tr>

        <!-- Welcome -->
        <tr>
          <td style="padding:10px 50px 0 50px; text-align:center;">

            <h1 style="margin:0; font-size:34px; line-height:42px; color:#0f172a; font-weight:700;">
              Welcome to ChitChat
            </h1>

            <p style="margin:24px 0 0 0; font-size:17px; line-height:30px; color:#475569;">
              Hi <strong>${name}</strong>,
            </p>

            <p style="margin:16px 0 0 0; font-size:17px; line-height:30px; color:#475569;">
              Thank you for joining ChitChat. We're excited to have you on board and can't wait for you to start connecting with people in real time.
            </p>

            <p style="margin:16px 0 0 0; font-size:17px; line-height:30px; color:#475569;">
              Click the button below to access your account and begin chatting.
            </p>

          </td>
        </tr>

        <!-- Button -->
        <tr>
          <td align="center" style="padding:40px 50px 50px 50px;">

            <table role="presentation" cellspacing="0" cellpadding="0" border="0">
              <tr>
                <td align="center"
                    bgcolor="#335eea"
                    style="border-radius:12px;">

                  <a href="${verificationLink}"
                     target="_blank"
                     style="
                     display:inline-block;
                     padding:16px 36px;
                     color:#ffffff;
                     text-decoration:none;
                     font-size:16px;
                     font-weight:600;
                     border-radius:12px;">
                     Open ChitChat
                  </a>

                </td>
              </tr>
            </table>

          </td>
        </tr>

        <!-- Divider -->
        <tr>
          <td style="padding:0 40px;">
            <div style="height:1px; background:#e5e7eb;"></div>
          </td>
        </tr>

        <!-- Info -->
        <tr>
          <td style="padding:35px 50px;">
            <p style="margin:0; font-size:14px; line-height:26px; color:#64748b;">
              If you did not create this account, you can safely ignore this email.
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td align="center" style="padding:0 40px 40px 40px;">

            <p style="margin:0; font-size:13px; line-height:24px; color:#94a3b8;">
              ChitChat · India
            </p>

            <p style="margin:10px 0 0 0; font-size:13px; line-height:24px; color:#94a3b8;">
              Need help?
              <a href="mailto:support@chitchat.com"
                 style="color:#335eea; text-decoration:none;">
                support@chitchat.com
              </a>
            </p>

            <p style="margin:10px 0 0 0; font-size:13px; color:#94a3b8;">
              © 2026 ChitChat. All rights reserved.
            </p>

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