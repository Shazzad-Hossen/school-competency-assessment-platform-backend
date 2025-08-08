
const settings = {
  port: Number(process?.env.PORT)|| 4000,
  origins: process.env.ORIGINS ? process.env.ORIGINS.split(',') : [],
  mongodb_uri: process.env.MONGODB_URL ?? (() => { throw new Error('MONGODB_URL not set'); })(),
};

export default settings;
