import Redis from "ioredis";
import { env } from "./";

const redisPort = Number(env.REDIS_PORT) || 6379;

const redisClient = new Redis({
  host: env.REDIS_HOST || "127.0.0.1",
  port: redisPort,
  password: env.NODE_ENV !== "development" ? env.REDIS_PASSWORD : undefined,
  db: 0,
  enableReadyCheck: true,
  maxRetriesPerRequest: null,
  retryStrategy(times: number) {
    // Exponential backoff capped at 2 seconds
    return Math.min(times * 50, 2000);
  },
});

// Event listeners
redisClient.on("connect", () => {
  console.info(`Redis client connected`.bgWhite.black);
});

redisClient.on("ready", () => {
  console.info(`Redis client ready to accept commands`.bgWhite.black);
});

redisClient.on("reconnecting", (time: number) => {
  console.warn(`Redis reconnecting, attempt #${time}`);
});

redisClient.on("close", () => {
  console.error("Redis connection closed");
});

redisClient.on("error", (err: Error) => {
  console.error(`Redis ERROR: ${err.message}`);
});

export default redisClient;
