import { APIGatewayProxyResult } from "aws-lambda";

/**
 * EntryPoint
 */
exports.handler = async (): Promise<APIGatewayProxyResult> => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hello, World",
    }),
  };
};
