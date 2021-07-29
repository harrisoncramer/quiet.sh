import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import user from "./routers/user";
import reports from "./routers/reports";
import globalErrorMiddleware from "./routers/routes/errors";
import globalDebugMiddleware from "./routers/routes/debug";
dotenv.config();

export const app = express();
app.use(express.json());
app.use(cookieParser());

//////////////////
// Debug Routes //
//////////////////
if (process.env.NODE_ENV === "development") app.use(globalDebugMiddleware);

////////////
// Routes //
////////////
app.use("/user", user);
app.use("/reports", reports);
app.use(globalErrorMiddleware);

////////////
// Listen //
////////////
export const server = app.listen(process.env.SERVER_PORT, () =>
  console.log(`Server listening on port ${process.env.SERVER_PORT} 🚀\n`)
);
