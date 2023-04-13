import { webClient } from "./core";

/**
 * 発言のオプション
 */
export interface SayOptions {
  // スレッドID
  thread?: string
  // メンション対象ID
  // ※変換前のユーザID
  user?: string
}

/**
 * 発言する
 * @param channel チャンネル
 * @param message メッセージ
 * @param options オプション
 */
export const say = async (channel: string, message: string, options: SayOptions | undefined = undefined) => {
  const postOption = {
    channel: channel,
    text: message,
  };
  if (options) {
    Object.assign(postOption, {
      thread_ts: options.thread,
    });
    if (options.user) {
      postOption.text = `<@${options.user}>\n` + postOption.text;
    }
  }
  
  await webClient.chat.postMessage(postOption);
};
