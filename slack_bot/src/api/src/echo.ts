import { Request, Response } from "express";
import { say } from "../../modules/slack";
import { SlackRecvEvent } from "../../modules/slack/types";
import { openAiApi } from "../../modules/chatgpt/";

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
    const prompt = "以下を、英訳してオウム返ししてください。\n\n" + recvEvent.message;
    const chatGptResponse = await openAiApi.createChatCompletion({
      model: "gpt-3.5-turbo-0301",
      messages: [{ role: "user", content: prompt }],
    });
    
    await say(recvEvent.channel, chatGptResponse.data.choices[0].message?.content ?? "Invalid Message", {
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