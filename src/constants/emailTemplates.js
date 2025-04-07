export const forgotPasswordCodeTemplate = (code) => `
    <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f7fa;
                    margin: 0;
                    padding: 0;
                    color: #333;
                }
                .container {
                    max-width: 600px;
                    margin: 30px auto;
                    background-color: #ffffff;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }
                h1 {
                    color: #2c3e50;
                    text-align: center;
                }
                .content {
                    font-size: 16px;
                    line-height: 1.6;
                    margin-top: 20px;
                }
                .code {
                    font-size: 20px;
                    font-weight: bold;
                    color: #e74c3c;
                    background-color: #f9f9f9;
                    padding: 10px;
                    border-radius: 4px;
                }
                .footer {
                    text-align: center;
                    font-size: 12px;
                    color: #aaa;
                    margin-top: 40px;
                }
                .footer a {
                    color: #3498db;
                    text-decoration: none;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Password Reset</h1>
                <div class="content">
                    <p>Hello,</p>
                    <p>We received a request to reset your password. To complete the process, please use the code below:</p>
                    <p class="code">${code}</p>
                    <p>If you did not request this, please ignore this message.</p>
                </div>
                <div class="footer">
                    <p>&copy; ${new Date().getFullYear()} Acme. All rights reserved.</p>
                    <p>Need help? <a href="mailto:example@mail.com">Contact Support</a></p>
                </div>
            </div>
        </body>
    </html>
`;
