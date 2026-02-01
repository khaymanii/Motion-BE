module.exports = {
  /* -------------------- WELCOME -------------------- */

  WELCOME: {
    id: "WELCOME",
    text:
      "Welcome to Motion 🚀\nWhat do you need today?\n\n" +
      "1. 🚗 Ride booking\n" +
      "2. 🍔 Food ordering\n" +
      "3. 📦 Parcel delivery\n" +
      "4. 🛒 Grocery shopping",
    numbered: true,
    allowFreeText: true,
    next: {
      1: "RIDE_PLATFORM",
      2: "FOOD_PLATFORM",
      3: "PARCEL_PLATFORM",
      4: "GROCERY_STORE",
    },
  },

  /* ==================== RIDE ==================== */

  RIDE_PLATFORM: {
    id: "RIDE_PLATFORM",
    text: "🚗 Choose a ride service:\n\n" + "1. Uber\n2. Bolt\n3. inDrive",
    numbered: true,
    storeKey: "ride_platform",
    valueMap: { 1: "Uber", 2: "Bolt", 3: "inDrive" },
    next: {
      1: "RIDE_PICKUP",
      2: "RIDE_PICKUP",
      3: "RIDE_PICKUP",
    },
  },

  RIDE_PICKUP: {
    id: "RIDE_PICKUP",
    text: "📍 Where are you being picked up from?",
    inputType: "text",
    storeKey: "pickup_location",
    next: "RIDE_DESTINATION",
  },

  RIDE_DESTINATION: {
    id: "RIDE_DESTINATION",
    text: "📍 Where are you going to?",
    inputType: "text",
    storeKey: "dropoff_location",
    next: "RIDE_ESTIMATE",
  },

  RIDE_ESTIMATE: {
    id: "RIDE_ESTIMATE",
    text: (a) =>
      `💰 Estimated fare on ${a.ride_platform}: ₦2,500 – ₦3,200\n\n` +
      `1. Continue\n2. Cancel`,
    numbered: true,
    next: { 1: "RIDE_CONFIRM", 2: "WELCOME" },
  },

  RIDE_CONFIRM: {
    id: "RIDE_CONFIRM",
    text: (a) =>
      `🚗 Ride Summary\n` +
      `Service: ${a.ride_platform}\n` +
      `From: ${a.pickup_location}\n` +
      `To: ${a.dropoff_location}\n\n` +
      `1. Confirm\n2. Edit pickup\n3. Edit destination\n4. Cancel`,
    numbered: true,
    next: {
      1: "RIDE_CONFIRMED",
      2: "RIDE_PICKUP",
      3: "RIDE_DESTINATION",
      4: "WELCOME",
    },
  },

  RIDE_CONFIRMED: {
    id: "RIDE_CONFIRMED",
    text:
      "✅ Ride request received!\n" +
      "A driver will contact you shortly.\n\n" +
      "Type ´menu´ to start again.",
  },

  /* ==================== FOOD ==================== */

  FOOD_PLATFORM: {
    id: "FOOD_PLATFORM",
    text: "🍔 Choose a delivery service:\n\n1. Glovo\n2. Chowdeck\n3. Bolt Food\n4. Jumia Food",
    numbered: true,
    storeKey: "food_platform",
    valueMap: {
      1: "Glovo",
      2: "Chowdeck",
      3: "Bolt Food",
      4: "Jumia Food",
    },
    next: {
      1: "FOOD_RESTAURANT",
      2: "FOOD_RESTAURANT",
      3: "FOOD_RESTAURANT",
      4: "FOOD_RESTAURANT",
    },
  },

  FOOD_RESTAURANT: {
    id: "FOOD_RESTAURANT",
    text:
      "🍽️ Select a restaurant:\n\n" +
      "1. Chicken Republic\n2. The Place\n3. Genesis\n4. The Promise",
    numbered: true,
    storeKey: "restaurant",
    valueMap: {
      1: "Chicken Republic",
      2: "The Place",
      3: "Genesis",
      4: "The Promise",
    },
    next: {
      1: "FOOD_ITEM",
      2: "FOOD_ITEM",
      3: "FOOD_ITEM",
      4: "FOOD_ITEM",
    },
  },

  FOOD_ITEM: {
    id: "FOOD_ITEM",
    text: "What would you like to order?",
    inputType: "text",
    storeKey: "food_item",
    next: "DELIVERY_ADDRESS",
  },

  DELIVERY_ADDRESS: {
    id: "DELIVERY_ADDRESS",
    text: "📍 Where should we deliver your order?",
    inputType: "text",
    storeKey: "delivery_address",
    next: "FOOD_CONFIRM",
  },

  FOOD_CONFIRM: {
    id: "FOOD_CONFIRM",
    text: (a) =>
      `🍔 Order Summary\n` +
      `Service: ${a.food_platform}\n` +
      `Restaurant: ${a.restaurant}\n` +
      `Item: ${a.food_item}\n` +
      `Address: ${a.delivery_address}\n\n` +
      `1. Confirm\n2. Edit item\n3. Edit address\n4. Cancel`,
    numbered: true,
    next: {
      1: "FOOD_CONFIRMED",
      2: "FOOD_ITEM",
      3: "DELIVERY_ADDRESS",
      4: "WELCOME",
    },
  },

  FOOD_CONFIRMED: {
    id: "FOOD_CONFIRMED",
    text:
      "✅ Order placed successfully!\n" +
      "Your food is on the way.\n\n" +
      "Type ´menu´ to start again.",
  },

  /* ==================== PARCEL ==================== */

  PARCEL_PLATFORM: {
    id: "PARCEL_PLATFORM",
    text: "📦 Choose a courier service:\n\n1. DHL\n2. FedEx\n3. UPS",
    numbered: true,
    storeKey: "parcel_service",
    valueMap: { 1: "DHL", 2: "FedEx", 3: "UPS" },
    next: {
      1: "PARCEL_PICKUP",
      2: "PARCEL_PICKUP",
      3: "PARCEL_PICKUP",
    },
  },

  PARCEL_PICKUP: {
    id: "PARCEL_PICKUP",
    text: "📍 Enter pickup location:",
    inputType: "text",
    storeKey: "parcel_pickup",
    next: "PARCEL_DROP",
  },

  PARCEL_DROP: {
    id: "PARCEL_DROP",
    text: "📍 Enter delivery location:",
    inputType: "text",
    storeKey: "parcel_dropoff",
    next: "PARCEL_CONFIRM",
  },

  PARCEL_CONFIRM: {
    id: "PARCEL_CONFIRM",
    text: (a) =>
      `📦 Parcel Summary\n` +
      `Courier: ${a.parcel_service}\n` +
      `From: ${a.parcel_pickup}\n` +
      `To: ${a.parcel_dropoff}\n\n` +
      `1. Confirm\n2. Edit pickup\n3. Edit destination\n4. Cancel`,
    numbered: true,
    next: {
      1: "PARCEL_CONFIRMED",
      2: "PARCEL_PICKUP",
      3: "PARCEL_DROP",
      4: "WELCOME",
    },
  },

  PARCEL_CONFIRMED: {
    id: "PARCEL_CONFIRMED",
    text:
      "✅ Parcel scheduled successfully!\n" +
      "A courier will contact you shortly.\n\n" +
      "Type ´menu´ to start again.",
  },

  /* ==================== GROCERY ==================== */

  GROCERY_STORE: {
    id: "GROCERY_STORE",
    text:
      "🛒 Choose a supermarket:\n\n" +
      "1. Walmart\n2. Market Square\n3. Everyday Supermarket\n4. Hypercity",
    numbered: true,
    storeKey: "grocery_store",
    valueMap: {
      1: "Walmart",
      2: "Market Square",
      3: "Everyday Supermarket",
      4: "Hypercity",
    },
    next: {
      1: "GROCERY_ITEMS",
      2: "GROCERY_ITEMS",
      3: "GROCERY_ITEMS",
      4: "GROCERY_ITEMS",
    },
  },

  GROCERY_ITEMS: {
    id: "GROCERY_ITEMS",
    text: "📝 What items do you need?",
    inputType: "text",
    storeKey: "grocery_items",
    next: "GROCERY_DELIVERY_ADDRESS", // <- separate node
  },

  GROCERY_DELIVERY_ADDRESS: {
    id: "GROCERY_DELIVERY_ADDRESS",
    text: "📍 Where should we deliver your grocery order?",
    inputType: "text",
    storeKey: "grocery_delivery_address", // <- separate storeKey
    next: "GROCERY_CONFIRM",
  },

  GROCERY_CONFIRM: {
    id: "GROCERY_CONFIRM",
    text: (a) =>
      `🛒 Grocery Summary\n` +
      `Store: ${a.grocery_store}\n` +
      `Items: ${a.grocery_items}\n` +
      `Address: ${a.grocery_delivery_address}\n\n` +
      `1. Confirm\n2. Edit items\n3. Edit address\n4. Cancel`,
    numbered: true,
    next: {
      1: "GROCERY_CONFIRMED",
      2: "GROCERY_ITEMS",
      3: "GROCERY_DELIVERY_ADDRESS",
      4: "WELCOME",
    },
  },

  GROCERY_CONFIRMED: {
    id: "GROCERY_CONFIRMED",
    text:
      "✅ Grocery order placed!\n" +
      "Your items will be delivered soon.\n\n" +
      "Type ´menu´ to start again.",
  },
};
