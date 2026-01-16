// dummyServices.js
const DUMMY_SERVICES = [
  // ---- Ride Services ----
  {
    city: "Lagos",
    service_type: "ride",
    serviceId: "uber",
    name: "Uber",
    vehicleTypes: ["Sedan", "SUV", "Motorbike", "Van"],
  },
  {
    city: "Lagos",
    service_type: "ride",
    serviceId: "bolt",
    name: "Bolt",
    vehicleTypes: ["Sedan", "SUV", "Motorbike"],
  },
  {
    city: "Lagos",
    service_type: "ride",
    serviceId: "indrive",
    name: "inDrive",
    vehicleTypes: ["Sedan", "Motorbike"],
  },

  // ---- Food Services ----
  {
    city: "Lagos",
    service_type: "food",
    serviceId: "dominos",
    name: "Domino's",
    menu: ["Pizza", "Pasta", "Wings"],
  },
  {
    city: "Lagos",
    service_type: "food",
    serviceId: "kfc",
    name: "KFC",
    menu: ["Bucket", "Zinger Burger", "Fries"],
  },
  {
    city: "Lagos",
    service_type: "food",
    serviceId: "tastee",
    name: "Tastee Fried Chicken",
    menu: ["Chicken Sandwich", "Spicy Wings", "Coleslaw"],
  },
  {
    city: "Lagos",
    service_type: "food",
    serviceId: "mrbiggs",
    name: "Mr Biggs",
    menu: ["Burger", "Rice & Chicken", "Yam Chips"],
  },
  {
    city: "Lagos",
    service_type: "food",
    serviceId: "pizzahut",
    name: "Pizza Hut",
    menu: ["Margherita Pizza", "Pepperoni Pizza", "Garlic Bread"],
  },

  // ---- Parcel Services ----
  {
    city: "Lagos",
    service_type: "parcel",
    serviceId: "dhl",
    name: "DHL",
    parcelSizes: ["Small", "Medium", "Large", "Extra Large"],
    deliverySpeeds: ["Standard", "Express", "Same Day"],
  },
  {
    city: "Lagos",
    service_type: "parcel",
    serviceId: "fedex",
    name: "FedEx",
    parcelSizes: ["Small", "Medium", "Large"],
    deliverySpeeds: ["Standard", "Express"],
  },
  {
    city: "Lagos",
    service_type: "parcel",
    serviceId: "gig",
    name: "GIG Logistics",
    parcelSizes: ["Small", "Medium", "Large"],
    deliverySpeeds: ["Standard", "Express", "Same Day"],
  },

  // ---- Grocery Services ----
  {
    city: "Lagos",
    service_type: "grocery",
    serviceId: "fruits-vegetables",
    name: "Fruits & Vegetables",
    items: ["Apples", "Tomatoes", "Bananas", "Carrots", "Onions"],
  },
  {
    city: "Lagos",
    service_type: "grocery",
    serviceId: "staples",
    name: "Staples",
    items: ["Rice", "Beans", "Yam", "Spaghetti", "Cooking Oil"],
  },
  {
    city: "Lagos",
    service_type: "grocery",
    serviceId: "snacks",
    name: "Snacks",
    items: ["Chips", "Biscuits", "Chocolate", "Nuts", "Popcorn"],
  },
  {
    city: "Lagos",
    service_type: "grocery",
    serviceId: "beverages",
    name: "Beverages",
    items: ["Coke", "Pepsi", "Fanta", "Water", "Juice"],
  },
  {
    city: "Lagos",
    service_type: "grocery",
    serviceId: "household",
    name: "Household Items",
    items: [
      "Soap",
      "Toilet Paper",
      "Detergent",
      "Toothpaste",
      "Cleaning Spray",
    ],
  },
];

module.exports = DUMMY_SERVICES;
