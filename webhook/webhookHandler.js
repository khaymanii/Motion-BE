const { extractIncomingMessage } = require("../utils/extractIncomingMessage");
const parseUserMessage = require("../utils/parseUserMessage");
const { getUserSession, saveUserSession } = require("../services/flowSessions");
const { sendWhatsAppMessage } = require("../services/whatsappService");
const {
  isMessageProcessed,
  markMessageProcessed,
} = require("../services/dynamoService");
const FLOW = require("../services/flow");

const MENU_KEYWORDS = ["menu", "start", "restart", "home"];

async function webhookHandler(event, config) {
  try {
    /* ---------------- VERIFY WEBHOOK ---------------- */
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

    /* ---------------- HANDLE POST ---------------- */
    if (!event.body) {
      return { statusCode: 200, body: "No body" };
    }

    const payload = JSON.parse(event.body);

    const message = extractIncomingMessage(payload);
    if (!message || !message.text) {
      return { statusCode: 200, body: "Ignored non-text" };
    }

    const { from, text } = message;

    /* ---------------- FIXED MESSAGE ID ---------------- */
    const messageId =
      payload.entry?.[0]?.changes?.[0]?.value?.messages?.[0]?.id;

    if (messageId) {
      const alreadyProcessed = await isMessageProcessed(messageId);
      if (alreadyProcessed) {
        console.log("🔁 Duplicate message ignored:", messageId);
        return { statusCode: 200, body: "Duplicate ignored" };
      }
      await markMessageProcessed(messageId);
    }

    /* ---------------- LOAD SESSION ---------------- */
    let session = (await getUserSession(from)) || {
      currentFlow: "WELCOME",
      answers: {},
    };

    /* ---------------- GLOBAL MENU ---------------- */
    if (MENU_KEYWORDS.includes(text.trim().toLowerCase())) {
      const newSession = { currentFlow: "WELCOME", answers: {} };
      await saveUserSession(from, newSession);

      await sendWhatsAppMessage(from, FLOW.WELCOME.text, config);

      return { statusCode: 200, body: "Menu reset" };
    }

    /* ---------------- FLOW HANDLING ---------------- */
    const { replyText, session: updatedSession } = parseUserMessage(
      text,
      session,
    );

    await saveUserSession(from, updatedSession);
    await sendWhatsAppMessage(from, replyText, config);

    return { statusCode: 200, body: "ok" };
  } catch (err) {
    console.error("❌ Webhook Error:", err);
    return {
      statusCode: 500,
      body: "Internal Server Error",
    };
  }
}

module.exports = { webhookHandler };
