import { Request, Response } from "express";
import { say } from "../../modules/slack";
import { SlackEvent } from "../../modules/slack/types";

export const echoHandler = async (req: Request, res: Response) => {
  // チャレンジトークン処理
  if (req.body.type === "url_verification") {
    res.send(req.body.challenge);
    return;
  }
  
  const slackEvent = new SlackEvent(req.body.event);
  try { 
    await say(slackEvent.channel, slackEvent.message, {
      thread: slackEvent.threadId,
      user: slackEvent.senderId,
    });

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
}