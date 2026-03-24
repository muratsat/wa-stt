import { env } from "@/env";
import { handleWebhook } from "@/lib/whatsapp";
import { Elysia } from "elysia";

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .post("/whatsapp", async ({ body }) => {
    void handleWebhook(body);
  })
  .listen(env.PORT);

console.log(`🦊 Elysia is running at ${app.server?.url}`);
