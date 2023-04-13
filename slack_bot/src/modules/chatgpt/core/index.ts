// TODO: このソースは後で消す
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_TOKEN,
});
export const openAiApi = new OpenAIApi(configuration);
