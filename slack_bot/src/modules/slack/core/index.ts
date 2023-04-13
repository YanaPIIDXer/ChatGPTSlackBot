import { WebClient } from "@slack/web-api";

export const SLACK_API_TOKEN = process.env.SLACK_TOKEN;
export const webClient = new WebClient(SLACK_API_TOKEN);
