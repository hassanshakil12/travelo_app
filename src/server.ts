import "colors";
import express from "express";

const app = express();
const PORT: number = 5000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`.bgGreen.white.bold);
});
