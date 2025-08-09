import nodemailer, { Transporter } from "nodemailer";

interface MailSettings {
  SMTP_HOST: string;
  SMTP_PORT: number;
  SMTP_USER: string;
  SMTP_PASSWORD: string;
  EMAIL_NAME: string;
  EMAIL_FROM: string;
}

interface SendMailOptions {
  receiver: string;
  subject: string;
  body: string;
  type?: "html" | "text";
}

export default function createMailService(settings: MailSettings) {
  const transporter: Transporter = nodemailer.createTransport({
    host: settings.SMTP_HOST,
    port: settings.SMTP_PORT,
    auth: {
      user: settings.SMTP_USER,
      pass: settings.SMTP_PASSWORD,
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
        from: `${settings.EMAIL_NAME} <${settings.EMAIL_FROM}>`,
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
