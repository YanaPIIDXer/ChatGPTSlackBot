import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";

const GPT_MODEL = "gpt-3.5-turbo";

/**
 * ChatGPTを使ったBotを実現するクラス
 */
export class ChatGptBot {
  private api: OpenAIApi;
  private promptGenerator: IPromptGenerator;
  private contexts: ChatCompletionRequestMessage[];

  /**
   * コンストラクタ
   * @param promptGenerator プロンプト生成インタフェース実装オブジェクト
   * @param chatContext チャットで会話する上でのコンテキスト
   */
  constructor (promptGenerator: IPromptGenerator, chatContext: string = "") {
    const configuration = new Configuration({
      apiKey: process.env.OPEN_AI_TOKEN,
    });
    this.api = new OpenAIApi(configuration);
    this.contexts = [];
    if (chatContext) {
      this.contexts.push({ role: "system", content: chatContext });
    }
    this.promptGenerator = promptGenerator;
  }

  /**
   * コンテキスト追加
   * @param isUser ユーザの発言か？
   * @param content 内容
   */
  addContext (isUser: boolean, content: string) {
    this.contexts.push({
      role: isUser ? "user" : "assistant",
      content: content.replace(/<@[A-Z0-9]+>/gi, "").trim(),
    });
  }

  /**
   * メッセージ送信
   * @param message メッセージ
   * @returns レスポンス
   */
  async sendMessage(message: string): Promise<string> {
    const prompt = await this.promptGenerator.generatePrompt(message);

    const messages: ChatCompletionRequestMessage[] = [...this.contexts];
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
  generatePrompt(userMessage: string): Promise<string>
}
