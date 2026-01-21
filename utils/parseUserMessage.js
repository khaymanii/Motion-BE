const FLOW = require("../services/flow");

function parseUserMessage(userMessage, session = {}) {
  const newSession = {
    currentFlow: session.currentFlow || "WELCOME",
    answers: session.answers || {},
  };

  const flow = FLOW[newSession.currentFlow];
  if (!flow) return reset();

  const text = userMessage.trim();
  const normalized = text.toLowerCase();

  // ---- Global menu ----
  if (normalized === "menu" || normalized === "start") {
    return reset();
  }

  // ---- Numbered flow ----
  if (flow.numbered) {
    if (!/^\d+$/.test(normalized)) {
      if (flow.allowFreeText) {
        return { replyText: resolve(flow, newSession), session: newSession };
      }
      return invalid(flow, newSession);
    }

    const choice = Number(normalized);
    const next = flow.next?.[choice];
    if (!next || !FLOW[next]) return invalid(flow, newSession);

    if (flow.storeKey) {
      newSession.answers[flow.storeKey] = flow.valueMap?.[choice] ?? choice;
    }

    newSession.currentFlow = next;
    return { replyText: resolve(FLOW[next], newSession), session: newSession };
  }

  // ---- Text input ----
  if (flow.inputType === "text" && flow.storeKey) {
    newSession.answers[flow.storeKey] = text;
    newSession.currentFlow = flow.next;
    return {
      replyText: resolve(FLOW[flow.next], newSession),
      session: newSession,
    };
  }

  return invalid(flow, newSession);
}

/* helpers */

const resolve = (flow, session) =>
  typeof flow.text === "function" ? flow.text(session.answers) : flow.text;

const invalid = (flow, session) => ({
  replyText: "❌ Invalid response.\n\n" + resolve(flow, session),
  session,
});

const reset = () => ({
  replyText: FLOW.WELCOME.text,
  session: { currentFlow: "WELCOME", answers: {} },
});

module.exports = parseUserMessage;
