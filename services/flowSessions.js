const {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
  DeleteItemCommand,
} = require("@aws-sdk/client-dynamodb");

const dynamoClient = new DynamoDBClient({
  region: process.env.AWS_REGION,
});

const SESSION_TABLE = process.env.SESSION_TABLE || "UserFlowSessions";

// helper: remove undefined/null values
function cleanObject(obj = {}) {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v !== undefined && v !== null)
  );
}

async function getUserSession(userId) {
  try {
    const res = await dynamoClient.send(
      new GetItemCommand({
        TableName: SESSION_TABLE,
        Key: { userId: { S: userId } },
      })
    );

    if (!res.Item) return null;

    return {
      currentFlow: res.Item.currentFlow?.S || "WELCOME",
      answers: res.Item.answers?.S ? JSON.parse(res.Item.answers.S) : {},
      listings: res.Item.listings?.S
        ? JSON.parse(res.Item.listings.S)
        : undefined,
    };
  } catch (error) {
    console.error("Error getting user session:", error);
    return null;
  }
}

async function saveUserSession(userId, session) {
  try {
    if (!session) {
      await dynamoClient.send(
        new DeleteItemCommand({
          TableName: SESSION_TABLE,
          Key: { userId: { S: userId } },
        })
      );
      return;
    }

    const cleanAnswers = cleanObject(session.answers || {});

    const item = {
      userId: { S: userId },
      currentFlow: { S: session.currentFlow || "WELCOME" },
      answers: { S: JSON.stringify(cleanAnswers) },
      timestamp: { S: new Date().toISOString() },
      ttl: {
        N: String(Math.floor(Date.now() / 1000) + 86400), // 24h
      },
    };

    if (
      session.listings &&
      Array.isArray(session.listings) &&
      session.listings.length > 0
    ) {
      item.listings = { S: JSON.stringify(session.listings) };
    }

    await dynamoClient.send(
      new PutItemCommand({
        TableName: SESSION_TABLE,
        Item: item,
      })
    );
  } catch (error) {
    console.error("Error saving user session:", error);
    throw error;
  }
}

module.exports = {
  getUserSession,
  saveUserSession,
};
