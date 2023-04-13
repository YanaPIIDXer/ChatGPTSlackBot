import express, { Request, Response } from "express";
import serverlessExpress from "@vendia/serverless-express";

const app = express();
app.use(express.json());

app.get("/hello", (req: Request, res: Response) => {
  res.status(200).json({
    body: {
      message: process.env.HELLO_MESSAGE ?? "INVALID ENVIRONMENT VARIABLE",
    },
  });
});

app.post("/echo", (req: Request, res: Response) => {
  const message = req.body.message;
  res.status(200).json({
    body: {
      message,
    },
  });
})

exports.handler = serverlessExpress({ app });
