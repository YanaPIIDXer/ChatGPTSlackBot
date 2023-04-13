import { Request, Response } from "express";
import { say } from "../../modules/slack";

/**
 * 挨拶API
 * 疎通確認用
 */
export const helloHanlder = async (req: Request, res: Response) => {
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
};
