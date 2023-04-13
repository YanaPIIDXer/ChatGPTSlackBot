import { Request, Response } from "express";
import { say } from "../../modules/slack";
import { SlackRecvEvent } from "../../modules/slack/types";
import { ChatGptBot } from "../../modules/chatgpt";

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
    const bot = new ChatGptBot({
      generatePrompt(userMessage: string): string {
        return "以下を、英訳してオウム返ししてください。\n\n" + userMessage;
      }
    });

    const responseMessage = await bot.sendMessage(recvEvent.message);
    await say(recvEvent.channel, responseMessage, {
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