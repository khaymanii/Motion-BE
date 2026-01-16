// dynamoService.js
const {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
  QueryCommand,
} = require("@aws-sdk/client-dynamodb");

const dynamoClient = new DynamoDBClient({
  region: process.env.AWS_REGION || "eu-west-1",
});

/* ================================
   MESSAGE DEDUPLICATION
================================ */

async function isMessageProcessed(messageId) {
  try {
    const res = await dynamoClient.send(
      new GetItemCommand({
        TableName: process.env.PROCESSED_MESSAGES_TABLE || "ProcessedMessages",
        Key: { messageId: { S: messageId } },
      })
    );
    return !!res.Item;
  } catch (err) {
    console.error("Error checking message:", err);
    return false;
  }
}

async function markMessageProcessed(messageId) {
  try {
    await dynamoClient.send(
      new PutItemCommand({
        TableName: process.env.PROCESSED_MESSAGES_TABLE || "ProcessedMessages",
        Item: {
          messageId: { S: messageId },
          timestamp: { S: new Date().toISOString() },
          ttl: { N: String(Math.floor(Date.now() / 1000) + 86400) }, // 24h expiry
        },
      })
    );
  } catch (err) {
    console.error("Error marking message processed:", err);
  }
}

/* ================================
   USER SEARCH HISTORY
================================ */

async function saveSearch(userId, params) {
  try {
    await dynamoClient.send(
      new PutItemCommand({
        TableName: process.env.SEARCH_HISTORY_TABLE || "UserSearchHistory",
        Item: {
          userId: { S: userId },
          timestamp: { S: new Date().toISOString() },
          query: { S: JSON.stringify(params) },
        },
      })
    );
  } catch (err) {
    console.error("Error saving search:", err);
  }
}

async function getLastSearch(userId) {
  try {
    const res = await dynamoClient.send(
      new QueryCommand({
        TableName: process.env.SEARCH_HISTORY_TABLE || "UserSearchHistory",
        KeyConditionExpression: "userId = :u",
        ExpressionAttributeValues: {
          ":u": { S: userId },
        },
        ScanIndexForward: false,
        Limit: 1,
      })
    );

    if (!res.Items || res.Items.length === 0) return null;

    const item = res.Items[0];
    return {
      timestamp: item.timestamp.S,
      query: JSON.parse(item.query.S),
    };
  } catch (err) {
    console.error("Error getting last search:", err);
    return null;
  }
}

/* ================================
   MOTION SERVICES
   (Ride, Food, Parcel, Grocery)
   PK = city, SK = serviceId
================================ */

async function getServicesFromDB(searchParams) {
  const { city, service_type, min_price, max_price } = searchParams;

  if (!city) return [];

  try {
    const res = await dynamoClient.send(
      new QueryCommand({
        TableName: process.env.MOTION_SERVICES_TABLE || "MotionServices",
        KeyConditionExpression: "#city = :city",
        ExpressionAttributeNames: { "#city": "city" },
        ExpressionAttributeValues: { ":city": { S: city } },
      })
    );

    let services = (res.Items || []).map((item) => ({
      serviceId: item.serviceId.S,
      service_type: item.service_type.S,
      city: item.city.S,
      name: item.name.S,
      price: item.price ? Number(item.price.N) : 0,
      eta: item.eta?.S || null,
      vehicleTypes: item.vehicleTypes?.SS || null,
      menu: item.menu?.SS || null,
      items: item.items?.SS || null,
      parcelSizes: item.parcelSizes?.SS || null,
      deliverySpeeds: item.deliverySpeeds?.SS || null,
      metadata: item.metadata?.S ? JSON.parse(item.metadata.S) : {},
    }));

    // Filter in JS for service_type and price
    if (service_type)
      services = services.filter((s) => s.service_type === service_type);
    if (min_price) services = services.filter((s) => s.price >= min_price);
    if (max_price) services = services.filter((s) => s.price <= max_price);

    return services;
  } catch (err) {
    console.error("Error fetching services:", err);
    return [];
  }
}

/* ================================
   MOTION BOOKINGS
================================ */

async function saveBooking(bookingData) {
  try {
    await dynamoClient.send(
      new PutItemCommand({
        TableName: process.env.MOTION_BOOKINGS_TABLE || "MotionBookings",
        Item: {
          userId: { S: bookingData.userId },
          bookingId: { S: `${bookingData.userId}-${Date.now()}` },
          serviceId: { S: bookingData.serviceId },
          service_type: { S: bookingData.service_type },
          city: { S: bookingData.city },
          details: { S: JSON.stringify(bookingData.details || {}) },
          timestamp: { S: new Date().toISOString() },
          status: { S: "pending" },
        },
      })
    );
    return { success: true };
  } catch (err) {
    console.error("Error saving booking:", err);
    return { success: false, error: err };
  }
}

module.exports = {
  isMessageProcessed,
  markMessageProcessed,
  saveSearch,
  getLastSearch,
  getServicesFromDB,
  saveBooking,
};
