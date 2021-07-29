import { Router } from "express";
import { Request, Response, NextFunction } from "express";

const globalDebugRouter = Router();

const globalDebugHandler = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  console.log("\n\n");
  console.log("REQUEST URL: ", req.url);
  console.log("REQUEST METHOD: ", req.method);
  console.log("REQUEST BODY:", req.body);
  console.log("REQUEST HEADERS: ", req.headers);
  console.log("COOKIES ARE", req.cookies);
  console.log("\n\n");
  return next();
};

const testRouteHandler = (_req: Request, res: Response) => {
  res.status(200).send({ hello: "world" });
};

globalDebugRouter.use(globalDebugHandler);
globalDebugRouter.get("/test", testRouteHandler);

export default globalDebugRouter;
