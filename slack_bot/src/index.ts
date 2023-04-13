import express, { Request, Response } from "express";
import serverlessExpress from "@vendia/serverless-express";
import { say } from "./modules/slack";

const app = express();
app.use(express.json());

app.get("/hello", async (req: Request, res: Response) => {
  try { 
    const msg = process.env.HELLO_MESSAGE ?? "INVALID ENVIRONMENT VARIABLE";
    await say("test", msg);

    res.status(200).json({
      body: {
        message: "OK",
      },
    });
  } catch (error: any) {
    console.error("Slack API Error", error);
    res.status(500).json({
      body: {
        message: "Slack API Error",
        error,
      }
    });
  }
});

app.post("/echo", async (req: Request, res: Response) => {
  // チャレンジトークン処理
  if (req.body.type === "url_verification") {
    res.send(req.body.challenge);
    return;
  }
  
  const originMessage: string = req.body.event.text;
  const channel: string = req.body.event.channel;
  const thread = req.body.event.thread_ts || req.body.event.ts;
  const user = req.body.event.user;

  try { 
    let message = originMessage.replace(/<@[A-Z0-9]+>/gi, "").trim();
    await say(channel, message, {
      thread, user,
    });

    res.status(200).json({
      body: {
        message: "OK",
      },
    });
    console.log(channel, message);
  } catch (error: any) {
    console.error("Slack API Error", error);
    res.status(500).json({
      body: {
        message: "Slack API Error",
        error,
      }
    });
  }
});

exports.handler = serverlessExpress({ app });
