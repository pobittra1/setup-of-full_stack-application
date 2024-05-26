import express, {
  Application,
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from "express";
import cors from "cors";
import globalErrorHandler from "./app/middlewares/globalErrorHandler/globalErrorHandler";
import notFoundRoute from "./app/middlewares/globalErrorHandler/notFoundRoute";

import router from "./app/routes";
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

//aplication routers
app.use("/api/v1", router);

const test: RequestHandler = (req, res) => {
  const a = 10;
  res.send(a);
};
app.get("/", test);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

//global error handler
app.use(globalErrorHandler);
//not found route
app.use(notFoundRoute);
export default app;
