import dotenv from "dotenv";
import express from "express";
import user from "./routes/user";
import globalErrorHandler from "./routes/errors";
import globalDebugRouter from "./routes/debug";
dotenv.config();

export const app = express();
app.use(express.json());

//////////////////
// Debug Routes //
//////////////////
if (process.env.NODE_ENV === "development") app.use(globalDebugRouter);

////////////
// Routes //
////////////
app.use("/user", user);
app.use(globalErrorHandler);

////////////
// Listen //
////////////
export const server = app.listen(process.env.SERVER_PORT, () =>
  console.log(`Server listening on port ${process.env.SERVER_PORT} 🚀\n`)
);
