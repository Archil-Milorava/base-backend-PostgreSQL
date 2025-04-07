import resend from "../config/resend.js";
import { forgotPasswordCodeTemplate } from "../constants/emailTemplates.js";

const recipientEmail = (to) =>
  process.env.NODE_ENV === "development" ? "achimilorava16@gmail.com" : to;

const senderEmail = () =>
  process.env.NODE_ENV === "development"
    ? "onboarding@resend.dev"
    : process.env.EMAIL_SENDER;

export const handleTokenEmailSend = async (receiver, payload) => {
  await resend.emails.send({
    from: senderEmail(),
    to: [recipientEmail(receiver)],
    subject: "Password code",
    html: forgotPasswordCodeTemplate(payload),
  });
};
