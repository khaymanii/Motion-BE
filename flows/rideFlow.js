// flows/rideFlow.js

const RIDE_FLOW = {
  RIDE_WELCOME: {
    id: "RIDE_WELCOME",
    text:
      "*🚗 Book a Ride*\n\n" +
      "I’ll help you book a ride quickly.\n\n" +
      "Reply with a number:",
    options: ["1. Book a Ride", "2. Back to Main Menu"],
    numbered: true,
    next: {
      1: "RIDE_PICKUP",
      2: "WELCOME",
    },
  },

  RIDE_PICKUP: {
    id: "RIDE_PICKUP",
    text: "*📍 Where are you being picked up from?*\n\n(Type your pickup location)",
    inputType: "text",
    storeKey: "pickup_location",
    next: "RIDE_DROPOFF",
  },

  RIDE_DROPOFF: {
    id: "RIDE_DROPOFF",
    text: "*📍 Where are you going to?*\n\n(Type your drop-off location)",
    inputType: "text",
    storeKey: "dropoff_location",
    next: "RIDE_PROVIDER",
  },

  RIDE_PROVIDER: {
    id: "RIDE_PROVIDER",
    text: "*🚘 Choose a ride provider*\n\n" + "Reply with a number:",
    options: ["1. Fastest option", "2. Cheapest option", "3. Choose provider"],
    numbered: true,
    storeKey: "ride_preference",
    next: {
      1: "RIDE_REVIEW",
      2: "RIDE_REVIEW",
      3: "RIDE_PROVIDER_SELECT",
    },
    valueMap: {
      1: "fastest",
      2: "cheapest",
      3: "manual",
    },
  },

  RIDE_PROVIDER_SELECT: {
    id: "RIDE_PROVIDER_SELECT",
    text: "*🏷️ Select provider*\n\n" + "Reply with a number:",
    options: ["1. Uber", "2. Bolt", "3. inDrive"],
    numbered: true,
    storeKey: "ride_provider",
    next: {
      1: "RIDE_REVIEW",
      2: "RIDE_REVIEW",
      3: "RIDE_REVIEW",
    },
    valueMap: {
      1: "Uber",
      2: "Bolt",
      3: "inDrive",
    },
  },

  RIDE_REVIEW: {
    id: "RIDE_REVIEW",
    text: (answers) =>
      `*📋 Review Your Ride*\n\n` +
      `📍 Pickup: ${answers.pickup_location}\n` +
      `📍 Drop-off: ${answers.dropoff_location}\n` +
      `🚘 Preference: ${answers.ride_preference || answers.ride_provider}\n\n` +
      `Reply with a number:`,
    options: ["1. Confirm Ride", "2. Modify", "3. Cancel"],
    numbered: true,
    next: {
      1: "RIDE_CONFIRMED",
      2: "RIDE_PICKUP",
      3: "WELCOME",
    },
  },

  RIDE_CONFIRMED: {
    id: "RIDE_CONFIRMED",
    text:
      "*✅ Ride Requested!*\n\n" +
      "We’re finding the best available driver for you.\n\n" +
      "You’ll receive updates shortly 🚀",
    options: ["1. Book Another Ride", "2. Main Menu"],
    numbered: true,
    next: {
      1: "RIDE_PICKUP",
      2: "WELCOME",
    },
  },
};

module.exports = RIDE_FLOW;
