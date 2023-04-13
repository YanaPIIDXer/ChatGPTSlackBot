import { webClient } from "../core";

/**
 * 受信した発言に関する情報
 */
 export class SlackRecvEvent {
  readonly originMessage: string;
  readonly channel: string;
  readonly threadId: string;
  readonly senderId: string;
  readonly message: string;
  
  /**
   * コンストラクタ
   * @param event リクエストについていたイベント情報
   */
  constructor(event: any) {
    this.originMessage = event.text;
    this.channel = event.channel;
    this.threadId = event.thread_ts || event.ts;
    this.senderId = event.user;
    this.message = this.originMessage.replace(/<@[A-Z0-9]+>/gi, "").trim();
  }
};
