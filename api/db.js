require('dotenv').config();
const { MongoClient } = require('mongodb');

let db;

const COUNTERS='counters';
const PRODUCTS='products';
const DELETED_PRODUCTS= 'deleted_products';
const url = process.env.DB_URL
  || 'mongodb+srv://CS648-Assignment4:CS648-Assignment4@cs648assignment4.0myyl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';


async function connectToDb() {
  const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();
  console.log('Connected to MongoDB at', url);
  db = client.db();
}

async function CounteridForDocument(product_name) {
  const result = await db
    .collection(COUNTERS)
    .findOneAndUpdate(
      { _id: product_name },
      { $inc: { Counter_id: 1 } },
      { returnOriginal: false },
    );

  console.log("DATA  :: ", result.value )
  return result.value.Counter_id;
}

function getDb() {
  if (!db) {
    throw new Error('Database not connected, try calling connectToDb method before accessing DB.');
  }
  return db;
}

module.exports = {
  connectToDb,
  CounteridForDocument,
  getDb,
  COUNTERS,
  PRODUCTS,
  DELETED_PRODUCTS
};
