import nodemailer, { Transporter } from "nodemailer";
import settings from "../settings";  // Import your Settings type here

interface SendMailOptions {
  receiver: string;
  subject: string;
  body: string;
  type?: "html" | "text";
}

export default function createMailService() {
  const transporter: Transporter = nodemailer.createTransport({
    host: settings.smtp_host,
    port: settings.smtp_port || 587,
    auth: {
      user: settings.smtp_user || "",
      pass: settings.smtp_password || "",
    },
  });

  console.log("=> Mail service started");

  return async function sendMail({
    receiver,
    subject,
    body,
    type = "text",
  }: SendMailOptions) {
    try {
      const msgObj: nodemailer.SendMailOptions = {
        from: `${settings.email_name} <${settings.email_from}>`,
        to: receiver,
        subject,
      };

      if (type === "html") {
        msgObj.html = body;
      } else {
        msgObj.text = body;
      }

      const info = await transporter.sendMail(msgObj);
      console.log("Message sent: %s", info.messageId);
      return info;
    } catch (error) {
      console.error(error);
      return error;
    }
  };
}
