import express, {
  Application,
  Request,
  RequestHandler,
  Response,
} from "express";
import cors from "cors";
import globalErrorHandler from "./app/middlewares/globalErrorHandler/globalErrorHandler";
import notFoundRoute from "./app/middlewares/globalErrorHandler/notFoundRoute";

import router from "./app/routes";
import cookieParser from "cookie-parser";
const app: Application = express();

//parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ["http://localhost:5173"] }));

//aplication routers
app.use("/api/v1", router);

const test: RequestHandler = async (req, res) => {
  //Promise.reject();
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
