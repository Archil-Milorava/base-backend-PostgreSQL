import nodemailer from "nodemailer";


export const sendEmail = async (to, resetToken, next) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });


    await transporter.sendMail({
      from: `"Your App" <achis@gmail.com>`,
      to,
      subject: "reset password",
      html: `<p> Please use this code to reset your password: ${resetToken}  </p>`,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
