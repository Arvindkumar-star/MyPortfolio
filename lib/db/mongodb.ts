import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME || "arvind_portfolio";

export const isMongoConfigured = Boolean(uri && uri.trim().length > 0);

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (isMongoConfigured && uri) {
  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri);
      global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
  } else {
    client = new MongoClient(uri);
    clientPromise = client.connect();
  }
}

export async function getDatabase(): Promise<Db | null> {
  if (!isMongoConfigured || !clientPromise) return null;
  try {
    const connectedClient = await clientPromise;
    return connectedClient.db(dbName);
  } catch (err) {
    console.warn("Could not connect to MongoDB:", err);
    return null;
  }
}

export default clientPromise;
