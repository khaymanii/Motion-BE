const { extractIncomingMessage } = require("../utils/extractIncomingMessage");
const parseUserMessage = require("../utils/parseUserMessage");
const { getUserSession, saveUserSession } = require("../services/flowSessions");
const { sendWhatsAppMessage } = require("../services/whatsappService");
const {
  isMessageProcessed,
  markMessageProcessed,
} = require("../services/dynamoService");

// Global menu commands
const MENU_KEYWORDS = ["menu", "start", "restart", "home"];

async function webhookHandler(event, config) {
  try {
    if (event.httpMethod === "GET") {
      const q = event.queryStringParameters || {};
      if (
        q["hub.mode"] === "subscribe" &&
        q["hub.verify_token"] === config.verifyToken
      ) {
        return { statusCode: 200, body: q["hub.challenge"] };
      }
      return { statusCode: 403, body: "Verification failed" };
    }

    // ---- Process incoming POST ----
    const payload = JSON.parse(event.body || "{}");
    const message = extractIncomingMessage(payload);

    if (!message || !message.text) return { statusCode: 200, body: "ok" };

    const { from, text } = message;

    // ---- Deduplicate messages ----
    const messageId = payload.entry?.[0]?.id;
    if (messageId && (await isMessageProcessed(messageId))) {
      console.log(`[DUPLICATE] Ignored message from ${from}: ${text}`);
      return { statusCode: 200, body: "Duplicate message ignored" };
    }
    if (messageId) await markMessageProcessed(messageId);

    // ---- Load or initialize session ----
    let session = (await getUserSession(from)) || {
      currentFlow: "WELCOME",
      answers: {},
    };

    // ---- Global menu handling ----
    if (MENU_KEYWORDS.includes(text.trim().toLowerCase())) {
      session = { currentFlow: "WELCOME", answers: {} };
      await saveUserSession(from, session);
      await sendWhatsAppMessage(
        from,
        "🔹 Menu reset.\n\n" + session.currentFlow,
        config,
      );
      return { statusCode: 200, body: "ok" };
    }

    // ---- Parse user message ----
    const { replyText, session: updatedSession } = parseUserMessage(
      text,
      session,
    );

    // ---- Save updated session ----
    await saveUserSession(from, updatedSession);

    // ---- Send reply ----
    await sendWhatsAppMessage(from, replyText, config);

    return { statusCode: 200, body: "ok" };
  } catch (err) {
    console.error("❌ Webhook handler error:", {
      error: err.message,
      stack: err.stack,
      eventBody: event.body,
    });
    return {
      statusCode: 500,
      body: "Internal Server Error",
    };
  }
}

module.exports = { webhookHandler };
