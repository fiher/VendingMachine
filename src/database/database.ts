import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

export const collections: {
  money?: mongoDB.Collection;
  products?: mongoDB.Collection;
} = {};

export async function connectToDatabase() {
  dotenv.config();

  const client = new mongoDB.MongoClient(process.env.DB_CONN_STRING);
  await client.connect();
  const db = client.db(process.env.DB_NAME);
  collections.money = db.collection("Money");
  collections.products = db.collection("Products");

  console.log(`Successfully connected to database: ${db.databaseName}`);
}
