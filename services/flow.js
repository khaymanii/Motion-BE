module.exports = {
  WELCOME: {
    id: "WELCOME",
    text: "Welcome to Motion 🚀\nWhat do you need today?",
    options: [
      "1. 🚗 Ride booking",
      "2. 🍔 Food ordering",
      "3. 📦 Parcel delivery",
      "4. 🛒 Grocery ordering",
    ],
    numbered: true,
    next: {
      1: "RIDE_START",
      2: "FOOD_START",
      3: "PARCEL_START",
      4: "GROCERY_START",
    },
  },

  // --------------------
  // RIDE FLOW
  // --------------------
  RIDE_START: {
    id: "RIDE_START",
    text: "🚗 Ride booking\nWhere are you going from?",
    inputType: "text",
    storeKey: "pickup_location",
    next: "RIDE_DESTINATION",
  },

  RIDE_DESTINATION: {
    id: "RIDE_DESTINATION",
    text: "Where are you going to?",
    inputType: "text",
    storeKey: "dropoff_location",
    next: "RIDE_VEHICLE",
  },

  RIDE_VEHICLE: {
    id: "RIDE_VEHICLE",
    text: "Select a vehicle type:",
    options: ["1. Sedan", "2. SUV", "3. Motorbike", "4. Van"],
    numbered: true,
    storeKey: "vehicle_type",
    valueMap: {
      1: "Sedan",
      2: "SUV",
      3: "Motorbike",
      4: "Van",
    },
    next: {
      1: "RIDE_CONFIRM",
      2: "RIDE_CONFIRM",
      3: "RIDE_CONFIRM",
      4: "RIDE_CONFIRM",
    },
  },

  RIDE_CONFIRM: {
    id: "RIDE_CONFIRM",
    text: (answers) =>
      `🚗 Ride Summary\n` +
      `From: ${answers.pickup_location}\n` +
      `To: ${answers.dropoff_location}\n` +
      `Vehicle: ${answers.vehicle_type}\n\n` +
      `Confirm booking?\n\n1. Confirm\n2. Cancel`,
    numbered: true,
    next: {
      1: "RIDE_CONFIRMED",
      2: "WELCOME",
    },
  },

  RIDE_CONFIRMED: {
    id: "RIDE_CONFIRMED",
    text:
      "✅ Ride request received!\nA driver will contact you shortly.\n\n" +
      "Type *menu* to start again.",
  },

  // --------------------
  // FOOD FLOW
  // --------------------
  FOOD_START: {
    id: "FOOD_START",
    text: "🍔 Food ordering\nWhat restaurant would you like?",
    inputType: "text",
    storeKey: "restaurant",
    next: "FOOD_ITEM",
  },

  FOOD_ITEM: {
    id: "FOOD_ITEM",
    text: "What would you like to order?",
    inputType: "text",
    storeKey: "food_item",
    next: "FOOD_CONFIRM",
  },

  FOOD_CONFIRM: {
    id: "FOOD_CONFIRM",
    text: (answers) =>
      `🍔 Order Summary\n` +
      `Restaurant: ${answers.restaurant}\n` +
      `Item: ${answers.food_item}\n\n` +
      `Confirm order?\n\n1. Confirm\n2. Cancel`,
    numbered: true,
    next: {
      1: "FOOD_CONFIRMED",
      2: "WELCOME",
    },
  },

  FOOD_CONFIRMED: {
    id: "FOOD_CONFIRMED",
    text:
      "✅ Order placed successfully!\nYour food is being prepared.\n\n" +
      "Type *menu* to start again.",
  },

  // --------------------
  // PARCEL FLOW
  // --------------------
  PARCEL_START: {
    id: "PARCEL_START",
    text: "📦 Parcel delivery\nWhat is the pickup location?",
    inputType: "text",
    storeKey: "parcel_pickup",
    next: "PARCEL_DROP",
  },

  PARCEL_DROP: {
    id: "PARCEL_DROP",
    text: "What is the delivery location?",
    inputType: "text",
    storeKey: "parcel_dropoff",
    next: "PARCEL_CONFIRM",
  },

  PARCEL_CONFIRM: {
    id: "PARCEL_CONFIRM",
    text: (answers) =>
      `📦 Parcel Summary\n` +
      `From: ${answers.parcel_pickup}\n` +
      `To: ${answers.parcel_dropoff}\n\n` +
      `Confirm delivery?\n\n1. Confirm\n2. Cancel`,
    numbered: true,
    next: {
      1: "PARCEL_CONFIRMED",
      2: "WELCOME",
    },
  },

  PARCEL_CONFIRMED: {
    id: "PARCEL_CONFIRMED",
    text:
      "✅ Parcel delivery scheduled!\nA courier will contact you.\n\n" +
      "Type *menu* to start again.",
  },

  // --------------------
  // GROCERY FLOW
  // --------------------
  GROCERY_START: {
    id: "GROCERY_START",
    text: "🛒 Grocery ordering\nWhat items do you need?",
    inputType: "text",
    storeKey: "grocery_items",
    next: "GROCERY_CONFIRM",
  },

  GROCERY_CONFIRM: {
    id: "GROCERY_CONFIRM",
    text: (answers) =>
      `🛒 Grocery Summary\n` +
      `Items: ${answers.grocery_items}\n\n` +
      `Confirm order?\n\n1. Confirm\n2. Cancel`,
    numbered: true,
    next: {
      1: "GROCERY_CONFIRMED",
      2: "WELCOME",
    },
  },

  GROCERY_CONFIRMED: {
    id: "GROCERY_CONFIRMED",
    text:
      "✅ Grocery order placed!\nYour items will be delivered soon.\n\n" +
      "Type *menu* to start again.",
  },
};
