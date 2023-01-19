import { MongoClient } from "mongodb";

export async function connectDB() {
  const client = await MongoClient.connect(
    `mongodb+srv://lyvandat:${process.env.MONGODB_PASSWORD}@cluster0.lsg2quf.mongodb.net/${process.env.MONGODB_DB}?retryWrites=true&w=majority`
  );
  return client;
}
