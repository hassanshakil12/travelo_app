import { Request, Response, NextFunction } from "express";

const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const start = Date.now();
  const now = new Date().toISOString();

  console.info(`[${now}] → ${req.method} ${req.originalUrl}`);

  res.on("finish", () => {
    const duration = Date.now() - start;
    const later = new Date().toISOString();
    console.info(
      `[${later}] ← ${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`,
    );
  });

  next();
};

export default requestLogger;
