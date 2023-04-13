import { Request, Response } from "express";
import { say } from "../../modules/slack";

// TODO: 別モジュールに移動する
import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_TOKEN,
});
const openAiApi = new OpenAIApi(configuration);

/**
 * 挨拶API
 * 疎通確認用
 */
export const helloHanlder = async (req: Request, res: Response) => {
  try {
    const prompt = process.env.HELLO_MESSAGE ?? "環境変数が設定されていませんでした。";
    const gptResponse = await openAiApi.createChatCompletion({
      model: "gpt-3.5-turbo-0301",
      messages: [{ role: "user", content: prompt }]
    });
    
    await say("bot実験コーナー", gptResponse.data.choices[0].message?.content || "INVALID RESPONSE");

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
