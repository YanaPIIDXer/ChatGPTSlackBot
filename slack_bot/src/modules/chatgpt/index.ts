import { Configuration, OpenAIApi } from "openai";

/**
 * ChatGPTを使ったBotを実現するクラス
 */
export class ChatGptBot {
  private api: OpenAIApi;

  /**
   * コンストラクタ
   */
  constructor () {
    const configuration = new Configuration({
      apiKey: process.env.OPEN_AI_TOKEN,
    });
    this.api = new OpenAIApi(configuration);
  }
}
