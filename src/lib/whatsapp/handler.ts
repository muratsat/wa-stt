import { webhookSchema } from "@/lib/whatsapp/schemas";
import { speechToText } from "@/lib/stt";
import { replyToMessage } from "@/lib/whatsapp/messages";
import { env } from "@/env";

const isChatEnabled = (chatId: string) => {
  const commaSeparatedChats = env.WHATSAPP_ENABLED_CHATS;
  if (!commaSeparatedChats) return true;

  return commaSeparatedChats.split(",").includes(chatId);
};

export const handleWebhook = async (body: unknown) => {
  const parsed = webhookSchema.safeParse(body);
  if (!parsed.success) return;

  const payload = parsed.data;
  const chatId = payload.data.message.from;

  if (!isChatEnabled(chatId)) {
    console.log(`Chat ${chatId} is not enabled`);
    return;
  }

  console.log(`Received message from ${chatId}`);

  if (payload.dataType === "media") {
    const text = await speechToText(
      payload.data.messageMedia.data,
      payload.data.messageMedia.mimetype
    );

    await replyToMessage({
      message: text,
      chatId: payload.data.message.from,
      messageId: payload.data.message.id.id
    });
  }
};
