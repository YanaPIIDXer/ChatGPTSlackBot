import express, { Request, Response } from "express";
import serverlessExpress from "@vendia/serverless-express";
import * as apiHandlers from "./api";

const app = express();
app.use(express.json());

// リクエスト・レスポンスログ出力
app.use((req: Request, res: Response, next: Function) => {
  console.log("RECV REQUEST", req.body);
  res.on("finish", () => {
    console.log("SEND RESPONSE", `${req.method} ${req.url} ${res.statusCode} ${res.statusMessage}`);
  });
  next();
});

// APIハンドラ定義
app.get("/hello", apiHandlers.helloHandler);
app.post("/echo", apiHandlers.echoHandler);
app.post("/mentor", apiHandlers.mentorHandler);

exports.handler = serverlessExpress({ app });
