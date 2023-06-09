import express, { Request, Response } from "express";
import serverlessExpress from "@vendia/serverless-express";
import * as apiHandlers from "./api";

const app = express();
app.use(express.json());

// 再送は問答無用で終了
app.use((req: Request, res: Response, next: Function) => {
  if (req.get("X-Slack-Retry-Num")) {
    res.status(200);
    return;
  }
  
  next();
});

// APIハンドラ定義
app.get("/hello", apiHandlers.helloHandler);
app.post("/echo", apiHandlers.echoHandler);
app.post("/mentor", apiHandlers.mentorHandler);

exports.handler = serverlessExpress({ app });
