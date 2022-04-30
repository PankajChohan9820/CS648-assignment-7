/*
 * Run using the mongo shell. For remote databases, ensure that the
 * connection string is supplied in the command line. For example:
 * localhost:
 *   mongo myFirstDatabase scripts/init.mongo.js
 * Atlas:
 *   mongosh "mongodb+srv://hmac:cs648@cluster0.uimtv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
 * or open mongo shell navigate to current directory
 *  and run load('scripts/init.mongo.js')
 */

/* global db print */
/* eslint no-restricted-globals: "off" */

db.products.deleteMany({});
const count = db.products.countDocuments();
print('Inserted total of ', count, 'products');

db.counters.deleteOne({ _id: 'products' });
db.counters.insertOne({ _id: 'products', Counter_id: count });

db.products.createIndex({ product_id: 1 }, { unique: true });
db.products.createIndex({ product_name: 1 });
db.products.createIndex({ product_price: 1 });
db.products.createIndex({ product_category: 1 });
