// flows/parcelFlow.js

const PARCEL_FLOW = {
  PARCEL_WELCOME: {
    id: "PARCEL_WELCOME",
    text:
      "*📦 Send a Parcel*\n\n" +
      "I’ll help you deliver a package.\n\n" +
      "Reply with a number:",
    options: ["1. Send Parcel", "2. Back to Main Menu"],
    numbered: true,
    next: {
      1: "PARCEL_PICKUP",
      2: "WELCOME",
    },
  },

  PARCEL_PICKUP: {
    id: "PARCEL_PICKUP",
    text: "*📍 Pickup location*\n\n(Type pickup location)",
    inputType: "text",
    storeKey: "parcel_pickup",
    next: "PARCEL_DROPOFF",
  },

  PARCEL_DROPOFF: {
    id: "PARCEL_DROPOFF",
    text: "*📍 Drop-off location*\n\n(Type drop-off location)",
    inputType: "text",
    storeKey: "parcel_dropoff",
    next: "PARCEL_REVIEW",
  },

  PARCEL_REVIEW: {
    id: "PARCEL_REVIEW",
    text: (answers) =>
      `*📋 Review Parcel Delivery*\n\n` +
      `📍 Pickup: ${answers.parcel_pickup}\n` +
      `📍 Drop-off: ${answers.parcel_dropoff}\n\n` +
      `Reply with a number:`,
    options: ["1. Confirm Delivery", "2. Modify", "3. Cancel"],
    numbered: true,
    next: {
      1: "PARCEL_CONFIRMED",
      2: "PARCEL_PICKUP",
      3: "WELCOME",
    },
  },

  PARCEL_CONFIRMED: {
    id: "PARCEL_CONFIRMED",
    text:
      "*✅ Parcel Request Sent!*\n\n" + "A courier will be assigned shortly.",
    options: ["1. Send Another Parcel", "2. Main Menu"],
    numbered: true,
    next: {
      1: "PARCEL_PICKUP",
      2: "WELCOME",
    },
  },
};

module.exports = PARCEL_FLOW;
