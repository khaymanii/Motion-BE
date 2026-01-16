async function sendWhatsAppMessage(to, message, config) {
  try {
    const res = await fetch(
      `https://graph.facebook.com/v24.0/${config.whatsappPhoneId}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${config.whatsappToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to,
          type: "text",
          text: { body: message },
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      console.error("WhatsApp API Error:", data);
      throw new Error(data.error?.message || "Failed to send WhatsApp message");
    }

    return data;
  } catch (err) {
    console.error("sendWhatsAppMessage failed:", err);
    throw err;
  }
}

module.exports = {
  sendWhatsAppMessage,
};
