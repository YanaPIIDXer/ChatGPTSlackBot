import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";

const GPT_MODEL = "gpt-3.5-turbo-0301";

/**
 * ChatGPTを使ったBotを実現するクラス
 */
export class ChatGptBot {
  private api: OpenAIApi;
  private promptGenerator: IPromptGenerator;

  /**
   * コンストラクタ
   * @param promptGenerator プロンプト生成インタフェース実装オブジェクト
   */
  constructor (promptGenerator: IPromptGenerator) {
    const configuration = new Configuration({
      apiKey: process.env.OPEN_AI_TOKEN,
    });
    this.api = new OpenAIApi(configuration);
    this.promptGenerator = promptGenerator;
  }

  /**
   * メッセージ送信
   * @param message メッセージ
   * @returns レスポンス
   */
  async sendMessage(message: string): Promise<string> {
    const prompt = this.promptGenerator.generatePrompt(message);

    // TODO: コンテキスト管理の実装
    const messages: ChatCompletionRequestMessage[] = [];
    messages.push({ role: "user", content: prompt });
    
    const response = await this.api.createChatCompletion({
      model: GPT_MODEL,
      messages,
    })

    return response.data.choices[0].message?.content ?? "INVALID RESPONSE";
  }
}

/**
 * プロンプト生成インタフェース
 */
export interface IPromptGenerator {
  /**
   * プロンプト生成
   * @param userMessage ユーザの入力
   * @returns プロンプト
   */
  generatePrompt(userMessage: string): string
}
