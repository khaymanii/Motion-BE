// flows/foodFlow.js

const FOOD_FLOW = {
  FOOD_WELCOME: {
    id: "FOOD_WELCOME",
    text:
      "*🍔 Order Food*\n\n" +
      "Get food delivered fast.\n\n" +
      "Reply with a number:",
    options: ["1. Order Food", "2. Back to Main Menu"],
    numbered: true,
    next: {
      1: "FOOD_LOCATION",
      2: "WELCOME",
    },
  },

  FOOD_LOCATION: {
    id: "FOOD_LOCATION",
    text: "*📍 Where should we deliver to?*\n\n(Type delivery location)",
    inputType: "text",
    storeKey: "food_location",
    next: "FOOD_CATEGORY",
  },

  FOOD_CATEGORY: {
    id: "FOOD_CATEGORY",
    text: "*🍽️ What are you craving?*\n\nReply with a number:",
    options: ["1. Fast Food", "2. Local Meals", "3. Pizza", "4. Drinks"],
    numbered: true,
    storeKey: "food_category",
    next: {
      1: "FOOD_REVIEW",
      2: "FOOD_REVIEW",
      3: "FOOD_REVIEW",
      4: "FOOD_REVIEW",
    },
    valueMap: {
      1: "Fast Food",
      2: "Local Meals",
      3: "Pizza",
      4: "Drinks",
    },
  },

  FOOD_REVIEW: {
    id: "FOOD_REVIEW",
    text: (answers) =>
      `*📋 Review Order*\n\n` +
      `📍 Location: ${answers.food_location}\n` +
      `🍽️ Category: ${answers.food_category}\n\n` +
      `Reply with a number:`,
    options: ["1. Place Order", "2. Modify", "3. Cancel"],
    numbered: true,
    next: {
      1: "FOOD_CONFIRMED",
      2: "FOOD_LOCATION",
      3: "WELCOME",
    },
  },

  FOOD_CONFIRMED: {
    id: "FOOD_CONFIRMED",
    text:
      "*✅ Order Placed!*\n\n" +
      "Your food is being prepared 🍽️\n\n" +
      "Delivery updates coming soon.",
    options: ["1. Order More Food", "2. Main Menu"],
    numbered: true,
    next: {
      1: "FOOD_LOCATION",
      2: "WELCOME",
    },
  },
};

module.exports = FOOD_FLOW;
