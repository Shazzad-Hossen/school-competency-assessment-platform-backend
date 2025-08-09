function getEnvVar(name: string): string {
  const val = process.env[name];
  if (!val) throw new Error(`${name} not set`);
  return val;
}

interface Settings {
  port: number;
  origin: string;
  mongodb_uri: string;
  secret: string;
  access_token_expiry: number;
  refresh_token_expiry: number;

  smtp_host: string | undefined;
  smtp_port: number | undefined;
  smtp_user: string | undefined;
  smtp_password: string | undefined;
  email_name: string | undefined;
  email_from: string | undefined;
}

const settings: Settings = {
  port: Number(process.env.PORT) || 4000,
  origin: process.env.ORIGIN || "",
  mongodb_uri: getEnvVar("MONGODB_URL"),
  secret: getEnvVar("SECRET"),
  access_token_expiry: 1000 * 60 * 15,
  refresh_token_expiry: 1000 * 60 * 60 * 24 * 7,

  smtp_host: process.env.SMTP_HOST,
  smtp_port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined,
  smtp_user: process.env.SMTP_USER,
  smtp_password: process.env.SMTP_PASSWORD,
  email_name: process.env.EMAIL_NAME,
  email_from: process.env.EMAIL_FROM,
};


export default settings;
