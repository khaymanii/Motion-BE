module.exports = {
  WELCOME: {
    id: "WELCOME",
    text:
      "Welcome to Motion 🚀\nWhat do you need today?\n\n" +
      "1. 🚗 Ride booking\n" +
      "2. 🍔 Food ordering\n" +
      "3. 📦 Parcel delivery\n" +
      "4. 🛒 Grocery ordering",
    numbered: true,
    allowFreeText: true,
    next: {
      1: "RIDE_START",
      2: "FOOD_START",
      3: "PARCEL_START",
      4: "GROCERY_START",
    },
  },

  /* -------------------- RIDE -------------------- */

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
    text:
      "Select a vehicle type:\n\n" + "1. Sedan\n2. SUV\n3. Motorbike\n4. Van",
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
    text: (a) =>
      `🚗 Ride Summary\n` +
      `From: ${a.pickup_location}\n` +
      `To: ${a.dropoff_location}\n` +
      `Vehicle: ${a.vehicle_type}\n\n` +
      `1. Confirm\n2. Cancel`,
    numbered: true,
    next: { 1: "RIDE_CONFIRMED", 2: "WELCOME" },
  },

  RIDE_CONFIRMED: {
    id: "RIDE_CONFIRMED",
    text:
      "✅ Ride request received!\n" +
      "A driver will contact you shortly.\n\n" +
      "Type *menu* to start again.",
  },

  /* -------------------- FOOD -------------------- */

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
    text: (a) =>
      `🍔 Order Summary\n` +
      `Restaurant: ${a.restaurant}\n` +
      `Item: ${a.food_item}\n\n` +
      `1. Confirm\n2. Cancel`,
    numbered: true,
    next: { 1: "FOOD_CONFIRMED", 2: "WELCOME" },
  },

  FOOD_CONFIRMED: {
    id: "FOOD_CONFIRMED",
    text:
      "✅ Order placed successfully!\n" +
      "Your food is being prepared.\n\n" +
      "Type *menu* to start again.",
  },

  /* -------------------- PARCEL -------------------- */

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
    text: (a) =>
      `📦 Parcel Summary\n` +
      `From: ${a.parcel_pickup}\n` +
      `To: ${a.parcel_dropoff}\n\n` +
      `1. Confirm\n2. Cancel`,
    numbered: true,
    next: { 1: "PARCEL_CONFIRMED", 2: "WELCOME" },
  },

  PARCEL_CONFIRMED: {
    id: "PARCEL_CONFIRMED",
    text:
      "✅ Parcel delivery scheduled!\n" +
      "A courier will contact you.\n\n" +
      "Type *menu* to start again.",
  },

  /* -------------------- GROCERY -------------------- */

  GROCERY_START: {
    id: "GROCERY_START",
    text: "🛒 Grocery ordering\nWhat items do you need?",
    inputType: "text",
    storeKey: "grocery_items",
    next: "GROCERY_CONFIRM",
  },

  GROCERY_CONFIRM: {
    id: "GROCERY_CONFIRM",
    text: (a) =>
      `🛒 Grocery Summary\n` +
      `Items: ${a.grocery_items}\n\n` +
      `1. Confirm\n2. Cancel`,
    numbered: true,
    next: { 1: "GROCERY_CONFIRMED", 2: "WELCOME" },
  },

  GROCERY_CONFIRMED: {
    id: "GROCERY_CONFIRMED",
    text:
      "✅ Grocery order placed!\n" +
      "Your items will be delivered soon.\n\n" +
      "Type *menu* to start again.",
  },
};
