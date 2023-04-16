import type { IPromptGenerator } from "..";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

/**
 * メンターBot用コンテキスト管理
 */
export class MentorContexts implements IPromptGenerator {
  /**
   * プロンプト生成
   * @param userMessage ユーザの入力
   */
  async generatePrompt(userMessage: string): Promise<string> {
    // 一旦封印
    /*
    const client = new S3Client({});
    let message = userMessage;
    try {
      const result = await client.send(new GetObjectCommand({
        Bucket: "slack-bot-utility",
        Key: "prompt.md",
      }));
      const prompt = await result.Body?.transformToString() ?? "";
      message = prompt.replace("[[USER_MESSAGE]]", userMessage);
    } catch (error) {
      console.error("Fetch Prompt Failed.", error);
    }
    return message;
    */
    return userMessage;
  }
}
