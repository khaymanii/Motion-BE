// parseUserMessage.js
const FLOW = require("./flow");

/**
 * Parse the user message and update the session
 * @param {string} userMessage - The raw text message from user
 * @param {object} session - The user's session object
 * @returns {object} - { replyText, nextFlowId, session }
 */
function parseUserMessage(userMessage, session) {
  if (!session.currentFlow) {
    session.currentFlow = "WELCOME";
    session.answers = {};
  }

  const currentFlow = FLOW[session.currentFlow];
  let replyText = "";
  let nextFlowId = null;

  // Normalize user message
  const msg = userMessage.trim().toLowerCase();

  // Handle special commands
  if (msg === "menu") {
    session.currentFlow = "WELCOME";
    session.answers = {};
    return {
      replyText: FLOW.WELCOME.text,
      nextFlowId: "WELCOME",
      session,
    };
  }

  // Numbered option handling
  if (currentFlow.numbered && /^\d+$/.test(msg)) {
    const optionKey = Number(msg);

    if (currentFlow.valueMap) {
      // Map the number to a value for storing
      session.answers[currentFlow.storeKey] = currentFlow.valueMap[optionKey];
    } else if (currentFlow.storeKey) {
      session.answers[currentFlow.storeKey] = optionKey;
    }

    nextFlowId = currentFlow.next[optionKey];
    replyText =
      typeof FLOW[nextFlowId].text === "function"
        ? FLOW[nextFlowId].text(session.answers)
        : FLOW[nextFlowId].text;

    session.currentFlow = nextFlowId;
    return { replyText, nextFlowId, session };
  }

  // Free text input handling
  if (currentFlow.inputType === "text" && currentFlow.storeKey) {
    session.answers[currentFlow.storeKey] = msg;

    // Move to next flow
    nextFlowId = currentFlow.next;
    replyText =
      typeof FLOW[nextFlowId].text === "function"
        ? FLOW[nextFlowId].text(session.answers)
        : FLOW[nextFlowId].text;

    session.currentFlow = nextFlowId;
    return { replyText, nextFlowId, session };
  }

  // Fallback if message can't be parsed
  replyText =
    "Sorry, I didn't understand that. Please select an option from the menu:\n\n" +
    FLOW.WELCOME.text;
  session.currentFlow = "WELCOME";
  session.answers = {};
  nextFlowId = "WELCOME";

  return { replyText, nextFlowId, session };
}

module.exports = parseUserMessage;
