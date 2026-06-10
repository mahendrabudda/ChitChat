import transporter from "../lib/nodemailer.js";
import { createWelcomeEmailTemplate, createPasswordResetEmailTemplate } from "./EmailTemplates.js";

export const sendWelcomeEmail = async ({ email, name, verificationLink }) => {
  try {
    await transporter.sendMail({
      from: `MariGo <${process.env.SENDER_EMAIL}>`,
      to: email,
      subject: "Welcome to MariGo 💬",
      html: createWelcomeEmailTemplate(name, verificationLink),
    });
    console.log("Welcome email sent to:", email);
  } catch (error) {
    console.error("Error sending welcome email:", error);
    throw new Error("Failed to send welcome email");
  }
};

export const sendPasswordResetEmail = async ({ email, otp }) => {
  try {
    await transporter.sendMail({
      from: `MariGo <${process.env.SENDER_EMAIL}>`,
      to: email,
      subject: "MariGo — Password Reset OTP",
      html: createPasswordResetEmailTemplate(otp),
    });
    console.log("Password reset OTP sent to:", email);
  } catch (error) {
    console.error("Error sending reset email:", error);
    throw new Error("Failed to send reset email");
  }
};