// flows/groceryFlow.js

const GROCERY_FLOW = {
  GROCERY_WELCOME: {
    id: "GROCERY_WELCOME",
    text:
      "*🛒 Grocery Shopping*\n\n" +
      "Order groceries to your doorstep.\n\n" +
      "Reply with a number:",
    options: ["1. Shop Groceries", "2. Back to Main Menu"],
    numbered: true,
    next: {
      1: "GROCERY_LOCATION",
      2: "WELCOME",
    },
  },

  GROCERY_LOCATION: {
    id: "GROCERY_LOCATION",
    text: "*📍 Delivery location*\n\n(Type delivery address)",
    inputType: "text",
    storeKey: "grocery_location",
    next: "GROCERY_CATEGORY",
  },

  GROCERY_CATEGORY: {
    id: "GROCERY_CATEGORY",
    text: "*🧺 What do you need?*\n\nReply with a number:",
    options: [
      "1. Fruits & Vegetables",
      "2. Staples",
      "3. Snacks",
      "4. Household Items",
    ],
    numbered: true,
    storeKey: "grocery_category",
    next: {
      1: "GROCERY_REVIEW",
      2: "GROCERY_REVIEW",
      3: "GROCERY_REVIEW",
      4: "GROCERY_REVIEW",
    },
    valueMap: {
      1: "Fruits & Vegetables",
      2: "Staples",
      3: "Snacks",
      4: "Household Items",
    },
  },

  GROCERY_REVIEW: {
    id: "GROCERY_REVIEW",
    text: (answers) =>
      `*📋 Review Grocery Order*\n\n` +
      `📍 Location: ${answers.grocery_location}\n` +
      `🧺 Category: ${answers.grocery_category}\n\n` +
      `Reply with a number:`,
    options: ["1. Place Order", "2. Modify", "3. Cancel"],
    numbered: true,
    next: {
      1: "GROCERY_CONFIRMED",
      2: "GROCERY_LOCATION",
      3: "WELCOME",
    },
  },

  GROCERY_CONFIRMED: {
    id: "GROCERY_CONFIRMED",
    text: "*✅ Grocery Order Placed!*\n\n" + "Your items are being packed 🛍️",
    options: ["1. Shop More", "2. Main Menu"],
    numbered: true,
    next: {
      1: "GROCERY_LOCATION",
      2: "WELCOME",
    },
  },
};

module.exports = GROCERY_FLOW;
