Email setup and testing

Quick steps

1. For production or real emails:
   - Set MAIL_SERVICE (e.g., gmail)
   - Set MAIL_USER to your SMTP user (e.g., your Gmail address)
   - Set MAIL_PASS to your SMTP password. For Gmail, you must use an "App Password" (requires 2FA). See: https://support.google.com/accounts/answer/185833

2. For development/testing without a real SMTP account:
   - Leave MAIL_USER and MAIL_PASS unset and the code will use Ethereal (a test SMTP service).
   - Ethereal will print a "Preview URL" to the console when sending emails; open that URL to see the message.

How to test

- Start the backend (make sure server restarts after changes):
  npm start

- Use the test route (requires admin/HR auth):
  POST /api/admin/send-test-mail
  Body: { "to": "your-email@example.com", "subject": "Test", "text": "Hello" }

- If MAIL_USER/MAIL_PASS are set but credentials are wrong, you'll see an error logged but the app will no longer crash (the mailer logs the error and returns false).

Notes

- For Gmail: enable 2FA and create an App Password for the application; use that as MAIL_PASS. Regular account passwords are rejected by Google for SMTP access (BadCredentials / 535 errors).
- You may also use services like Mailtrap, SendGrid, SES, etc. and set MAIL_SERVICE and creds accordingly.
