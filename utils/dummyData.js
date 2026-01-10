const DUMMY_DATA = {
  ride: {
    providers: ["Uber", "Bolt", "inDrive"],
    locations: ["Ikoyi", "Lekki", "Victoria Island", "Yaba", "Surulere"],
    vehicleTypes: ["Sedan", "SUV", "Motorbike", "Van"],
  },

  food: {
    restaurants: [
      "Domino's",
      "KFC",
      "Tastee Fried Chicken",
      "Mr Biggs",
      "Pizza Hut",
    ],
    menu: {
      "Domino's": ["Pizza", "Pasta", "Wings"],
      KFC: ["Bucket", "Zinger Burger", "Fries"],
      "Tastee Fried Chicken": ["Chicken Sandwich", "Spicy Wings", "Coleslaw"],
      "Mr Biggs": ["Burger", "Rice & Chicken", "Yam Chips"],
      "Pizza Hut": ["Margherita Pizza", "Pepperoni Pizza", "Garlic Bread"],
    },
  },

  parcel: {
    couriers: ["DHL", "FedEx", "GIG Logistics", "Jumia Express", "UPS"],
    parcelSizes: ["Small", "Medium", "Large", "Extra Large"],
    deliverySpeeds: ["Standard", "Express", "Same Day"],
  },

  grocery: {
    categories: [
      "Fruits & Vegetables",
      "Staples",
      "Snacks",
      "Beverages",
      "Household Items",
    ],
    items: {
      "Fruits & Vegetables": [
        "Apples",
        "Tomatoes",
        "Bananas",
        "Carrots",
        "Onions",
      ],
      Staples: ["Rice", "Beans", "Yam", "Spaghetti", "Cooking Oil"],
      Snacks: ["Chips", "Biscuits", "Chocolate", "Nuts", "Popcorn"],
      Beverages: ["Coke", "Pepsi", "Fanta", "Water", "Juice"],
      "Household Items": [
        "Soap",
        "Toilet Paper",
        "Detergent",
        "Toothpaste",
        "Cleaning Spray",
      ],
    },
  },
};

module.exports = DUMMY_DATA;
