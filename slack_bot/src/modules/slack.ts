import axios from "axios";

const SLACK_API_TOKEN = process.env.SLACK_TOKEN;

/**
 * 発言する
 * @param channel チャンネル
 * @param message メッセージ
 */
export const say = async (channel: string, message: string) => {
  const payload = {
    channel: `#${channel}`,
    text: message,
  };
  
  await axios.post("https://slack.com/api/chat.postMessage", payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${SLACK_API_TOKEN}`,
      },
  });
};
