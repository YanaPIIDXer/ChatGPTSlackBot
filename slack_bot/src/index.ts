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
  const message: string = req.body.text;
  const channel: string = req.body.channel_id;
  try { 
    await say(channel.replace("#", ""), message);

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

exports.handler = serverlessExpress({ app });
