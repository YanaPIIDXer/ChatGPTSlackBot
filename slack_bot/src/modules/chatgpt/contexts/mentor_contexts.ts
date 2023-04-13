import type { IPromptGenerator } from "..";

/**
 * メンターBot用コンテキスト管理
 */
export class MentorContexts implements IPromptGenerator {
  /**
   * プロンプト生成
   * @param userMessage ユーザの入力
   */
  generatePrompt(userMessage: string): string {
    // TODO: 外部ファイルからプロンプトを読み込んで構築する
    return userMessage;
  }
}
