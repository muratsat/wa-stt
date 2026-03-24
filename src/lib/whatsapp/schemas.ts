import { z } from "zod";

export const textMessageSchema = z.object({
  dataType: z.literal("message"),
  data: z
    .looseObject({
      message: z
        .looseObject({
          id: z
            .looseObject({
              fromMe: z.boolean(),
              remote: z.string(),
              id: z.string(),
              _serialized: z.string()
            })
            .strip(),
          body: z.string(),
          type: z.string(),
          timestamp: z.number(),
          from: z.string(),
          to: z.string(),
          fromMe: z.boolean()
        })
        .strip()
    })
    .strip(),
  sessionId: z.string()
});

export const audioMessageSchema = z
  .looseObject({
    dataType: z.literal("media"),
    data: z
      .looseObject({
        messageMedia: z.object({
          mimetype: z.string(),
          data: z.string(),
          filesize: z.number()
        }),
        message: z
          .looseObject({
            mediaKey: z.string(),
            id: z.object({
              fromMe: z.boolean(),
              remote: z.string(),
              id: z.string(),
              _serialized: z.string()
            }),
            ack: z.number(),
            hasMedia: z.boolean(),
            body: z.string(),
            type: z.string(),
            timestamp: z.number(),
            from: z.string(),
            to: z.string()
          })
          .strip()
      })
      .strip(),
    sessionId: z.string()
  })
  .strip();

export const webhookSchema = z.discriminatedUnion("dataType", [
  textMessageSchema,
  audioMessageSchema
]);
