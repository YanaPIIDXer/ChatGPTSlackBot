import { WebClient } from "@slack/web-api";

const SLACK_API_TOKEN = process.env.SLACK_TOKEN;
const web = new WebClient(SLACK_API_TOKEN);

/**
 * 発言する
 * @param channel チャンネル
 * @param message メッセージ
 */
export const say = async (channel: string, message: string) => {
  await web.chat.postMessage({
    channel: channel,
    text: message,
  });
};
