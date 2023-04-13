import { Request, Response } from "express";
import { say } from "../../modules/slack";
import { ChatGptBot } from "../../modules/chatgpt";

/**
 * 挨拶API
 * 疎通確認用
 */
export const helloHanlder = async (req: Request, res: Response) => {
  try {
    const bot = new ChatGptBot({
      async generatePrompt(userMessage: string): Promise<string> {
        return userMessage;
      }
    });

    const responseMessage = await bot.sendMessage(process.env.HELLO_MESSAGE ?? "環境変数が設定されていませんでした。");
    await say("bot実験コーナー", responseMessage);

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
};
