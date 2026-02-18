import dotenv from "dotenv";
import path from "path";

const NODE_ENV = process.env.NODE_ENV || "development";

dotenv.config({
  path: path.resolve(process.cwd(), `.env.${NODE_ENV}`),
});

const required = (value: string | undefined, name: string) => {
  if (!value || value.trim() === "") {
    throw new Error(`❌ Missing environment variable: ${name}`);
  }
  return value;
};

const env = {
  NODE_ENV: NODE_ENV as "development" | "production",
  PORT: parseInt(process.env.PORT || "4000", 10),
  MONGODB_URI: required(process.env.MONGODB_URI, "MONGODB_URI"),
  JWT_SECRET: required(process.env.JWT_SECRET, "JWT_SECRET"),
  JWT_EXPIRES_IN: required(process.env.JWT_EXPIRES_IN, "JWT_EXPIRES_IN"),
  SALT_ROUNDS: parseInt(process.env.SALT_ROUNDS || "10", 10),
  CORS_ORIGIN: required(process.env.CORS_ORIGIN, "CORS_ORIGIN"),
  REDIS_HOST: required(process.env.REDIS_HOST, "REDIS_HOST"),
  REDIS_PORT: parseInt(process.env.REDIS_PORT || "6379", 10),
  REDIS_PASSWORD: required(process.env.REDIS_PASSWORD, "REDIS_PASSWORD"),
  EMAIL_USER: required(process.env.EMAIL_USER, "EMAIL_USER"),
  EMAIL_PASS: required(process.env.EMAIL_PASS, "EMAIL_PASS"),
};

export default env;
