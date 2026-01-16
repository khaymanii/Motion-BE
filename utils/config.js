function getConfig() {
  return {
    whatsappPhoneId: process.env.WHATSAPP_PHONE_ID,
    whatsappAccountId: process.env.WHATSAPP_ACCOUNT_ID,
    whatsappToken: process.env.WHATSAPP_TOKEN,
    verifyToken: process.env.VERIFY_TOKEN || "my_token",
    region: process.env.AWS_REGION,
  };
}

module.exports = {
  getConfig,
};
