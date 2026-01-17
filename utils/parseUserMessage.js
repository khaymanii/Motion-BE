const FLOW = require("./flow");

/**
 * Parse the user message and update the session
 */
function parseUserMessage(userMessage, session) {
  // Initialize session safely
  const newSession = {
    currentFlow: session?.currentFlow || "WELCOME",
    answers: session?.answers || {},
  };

  const currentFlow = FLOW[newSession.currentFlow];

  if (!currentFlow) {
    return resetToWelcome(newSession);
  }

  const rawText = userMessage.trim();
  const normalized = rawText.toLowerCase();

  // ---- Global commands ----
  if (normalized === "menu") {
    return resetToWelcome(newSession);
  }

  // ---- Numbered menu handling ----
  if (currentFlow.numbered) {
    if (!/^\d+$/.test(normalized)) {
      return reprompt(currentFlow, newSession);
    }

    const option = Number(normalized);
    const nextFlowId = currentFlow.next?.[option];

    if (!nextFlowId || !FLOW[nextFlowId]) {
      return reprompt(currentFlow, newSession);
    }

    if (currentFlow.storeKey) {
      newSession.answers[currentFlow.storeKey] =
        currentFlow.valueMap?.[option] ?? option;
    }

    newSession.currentFlow = nextFlowId;

    return {
      replyText: resolveText(FLOW[nextFlowId], newSession),
      nextFlowId,
      session: newSession,
    };
  }

  // ---- Free text input ----
  if (currentFlow.inputType === "text" && currentFlow.storeKey) {
    newSession.answers[currentFlow.storeKey] = rawText;

    const nextFlowId = currentFlow.next;
    if (!FLOW[nextFlowId]) {
      return resetToWelcome(newSession);
    }

    newSession.currentFlow = nextFlowId;

    return {
      replyText: resolveText(FLOW[nextFlowId], newSession),
      nextFlowId,
      session: newSession,
    };
  }

  // ---- Final fallback ----
  return reprompt(currentFlow, newSession);
}

/* ---------------- helpers ---------------- */

function resolveText(flow, session) {
  return typeof flow.text === "function"
    ? flow.text(session.answers)
    : flow.text;
}

function reprompt(flow, session) {
  return {
    replyText: "❌ Invalid response.\n\n" + resolveText(flow, session),
    nextFlowId: session.currentFlow,
    session,
  };
}

function resetToWelcome(session) {
  return {
    replyText: FLOW.WELCOME.text,
    nextFlowId: "WELCOME",
    session: {
      currentFlow: "WELCOME",
      answers: {},
    },
  };
}

module.exports = parseUserMessage;
