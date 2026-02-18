import rateLimit, {
  RateLimitRequestHandler,
  Options,
} from "express-rate-limit";

/**
 * Helper to create a dynamic rate limiter
 */
export const createDynamicLimiter = (
  windowMinutes: number,
  maxRequests: number,
  message: string,
): RateLimitRequestHandler => {
  return rateLimit({
    windowMs: windowMinutes * 60 * 1000,
    max: maxRequests,
    message: { status: 429, error: message },
    standardHeaders: true,
    legacyHeaders: false,
  });
};


export const globalLimiter: RateLimitRequestHandler = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: {
    status: 429,
    error: "Too many requests from this IP, please try again later.",
  },
  standardHeaders: true, // RateLimit-* headers
  legacyHeaders: false, // Disable X-RateLimit-* headers
});


export const authLimiter: RateLimitRequestHandler = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5, // 5 attempts per IP
  message: {
    status: 429,
    error: "Too many login attempts, please try again later.",
  },
  skipSuccessfulRequests: true, // Only count failed attempts
  standardHeaders: true,
  legacyHeaders: false,
});

export const userProfileLimiter: RateLimitRequestHandler = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 30, // 30 requests per minute per IP
  message: {
    status: 429,
    error: "Too many profile requests, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
