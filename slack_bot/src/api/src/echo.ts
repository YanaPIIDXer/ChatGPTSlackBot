import { Request, Response } from "express";
import { say } from "../../modules/slack";
import { SlackRecvEvent } from "../../modules/slack/types";

/**
 * エコーAPI
 * メンション貰ったらそのままオウム返し
 */
export const echoHandler = async (req: Request, res: Response) => {
  // チャレンジトークン処理
  if (req.body.type === "url_verification") {
    res.send(req.body.challenge);
    return;
  }
  
  const recvEvent = new SlackRecvEvent(req.body.event);
  try { 
    await say(recvEvent.channel, recvEvent.message, {
      thread: recvEvent.threadId,
      user: recvEvent.senderId,
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