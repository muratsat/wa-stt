import { env } from "@/env";
import { handleWebhook } from "@/lib/whatsapp";
import { Elysia } from "elysia";

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .post("/whatsapp", async ({ body, headers }) => {
    const apiKey = headers["x-api-key"];
    if (apiKey !== env.WHATSAPP_API_KEY) {
      return new Response("Unauthorized", { status: 401 });
    }
    void handleWebhook(body);
  })
  .listen(env.PORT);

console.log(`🦊 Elysia is running at ${app.server?.url}`);
