import express, { Request, Response } from "express";
import serverlessExpress from "@vendia/serverless-express";
import * as apiHandlers from "./api";

const app = express();
app.use(express.json());

// APIハンドラ定義
app.get("/hello", apiHandlers.helloHandler);
app.post("/echo", apiHandlers.echoHandler);
app.post("/mentor", apiHandlers.mentorHandler);

exports.handler = serverlessExpress({ app });
