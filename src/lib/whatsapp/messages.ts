import { env } from "@/env";

export const sendMessage = async ({
  message,
  chatId
}: {
  message: string;
  chatId: string;
}) => {
  console.log(`Sending message to ${chatId}: ${message}`);

  const url = `${env.WHATSAPP_API_URL}/client/sendMessage/${env.WHATSAPP_SESSION_ID}`;

  const data = {
    chatId,
    contentType: "string",
    content: message
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": env.WHATSAPP_API_KEY
    },
    body: JSON.stringify(data)
  });
  console.log(response);
};

export const replyToMessage = async ({
  message,
  chatId,
  messageId
}: {
  message: string;
  chatId: string;
  messageId: string;
}) => {
  console.log(`Replying to message ${messageId} in chat ${chatId}: ${message}`);

  const url = `${env.WHATSAPP_API_URL}/message/reply/${env.WHATSAPP_SESSION_ID}`;

  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": env.WHATSAPP_API_KEY
    },
    body: JSON.stringify({
      chatId,
      messageId,
      contentType: "string",
      content: message
    })
  });
};
