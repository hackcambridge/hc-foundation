import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to your environment variables");
}

const client = new MongoClient(uri, options);
let isConnecting = false;
let isConnected = false;

async function testClient() {
  try {
    // Send a ping to confirm a successful connection
    await client.db("Login").command({ ping: 1 });
    isConnected = true;
  } catch (error) {
    throw error;
  }
}

async function getClient() {
  if (!isConnecting && !isConnected) {
    isConnecting = true;
    await client.connect();
    await testClient();
  }

  return client;
}

export default getClient;
