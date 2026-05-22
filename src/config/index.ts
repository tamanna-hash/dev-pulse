import dotenv from "dotenv";

dotenv.config({ quiet: true });

const config =  {
  CONNECTION_STRING: process.env.CONNECTION_STRING,
  ACCESS_TOKEN_SECRET_KEY: process.env.ACCESS_TOKEN_SECRET_KEY,
  REFRESH_TOKEN_SECRET_KEY: process.env.REFRESH_TOKEN_SECRET_KEY,
  ORIGIN: process.env.ORIGIN || 'http://localhost:5000/'
};
export default config;
