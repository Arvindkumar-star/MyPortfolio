import fs from "fs";
import { MongoClient } from "mongodb";

function getMongoUri(): string | null {
  if (fs.existsSync(".env.local")) {
    const lines = fs.readFileSync(".env.local", "utf8").split("\n");
    for (const line of lines) {
      if (line.startsWith("MONGODB_URI=")) {
        return line.replace("MONGODB_URI=", "").trim();
      }
    }
  }
  return null;
}

async function main() {
  const uri = getMongoUri();
  if (!uri) {
    console.error("MONGODB_URI not found in .env.local");
    return;
  }

  console.log("Connecting to MongoDB Atlas at:", uri.replace(/:([^@]+)@/, ":****@"));
  const client = new MongoClient(uri, { serverSelectionTimeoutMS: 8000 });

  try {
    await client.connect();
    console.log("✓ Successfully connected to MongoDB Atlas!");
    const dbs = await client.db().admin().listDatabases();
    console.log("✓ Available databases:", dbs.databases.map((d) => d.name).join(", "));
  } catch (err: any) {
    console.error("✗ Connection error:", err.message);
  } finally {
    await client.close();
  }
}

main().catch(console.error);
