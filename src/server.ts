import "colors";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { corsOptions, env } from "./config";
import bootstrap from "./bootstrap";
import { globalLimiter, requestLogger } from "./middlewares";

bootstrap();

const app = express();
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan(process.env.NODE_ENV === "development" ? "dev" : "combined"));
app.use(globalLimiter);
app.use(requestLogger);

app.listen(env.PORT, () => {
  console.info(`Server is listening on port ${env.PORT}`.bgGreen.white.bold);
});
