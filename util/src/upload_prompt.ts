import * as fs from "fs";
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

fs.readFile("assets/prompt.md", async (err: any, data: Buffer) => {
  if (err) {
    console.error(err);
    return;
  }

  const client = new S3Client({});
  try {
    await client.send(new PutObjectCommand({
      Bucket: "slack-bot-utility",
      Key: "prompt.md",
      Body: data,
    }));
  } catch (error) {
    console.error("S3 Upload Error", error);
    return;
  }
  
  console.log("Upload Success.");
});
