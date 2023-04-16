import { ConversationsInfoResponse } from "@slack/web-api";
import { Message } from "@slack/web-api/dist/response/ConversationsRepliesResponse";
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
  readonly isMyResponse: boolean;
  
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
    // HACK: 元の送信者がメンションに含まれていたら「Botの発言」と見做す
    this.isMyResponse = this.originMessage.includes(`<@${this.senderId}>`);
  }

  /**
   * チャンネルの情報を取得
   * @returns チャンネルの情報
   */
  async fetchChannelInfo (): Promise<ConversationsInfoResponse> {
    const info = await webClient.conversations.info({ channel: this.channel });
    return info;
  }

  /**
   * スレッドの発言リスト取得
   * @returns スレッドの発言リスト
   */
  async fetchThreadMessages (): Promise<Message[]> {
    const info = await webClient.conversations.replies({ channel: this.channel, ts: this.threadId })
    return info.messages ?? [];
  }
};
