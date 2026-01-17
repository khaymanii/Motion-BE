function extractIncomingMessage(payload) {
  const value = payload?.entry?.[0]?.changes?.[0]?.value;

  // Ignore delivery/read statuses
  if (value?.statuses) return null;

  const message = value?.messages?.[0];

  if (!message) return null;

  // Only allow text for now
  if (message.type !== "text") {
    return {
      from: message.from,
      type: message.type,
      text: null,
    };
  }

  return {
    from: message.from,
    type: "text",
    text: message.text.body,
  };
}

module.exports = { extractIncomingMessage };
