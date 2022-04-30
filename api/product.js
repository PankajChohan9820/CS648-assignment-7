const { getDb, CounteridForDocument, PRODUCTS, DELETED_PRODUCTS } = require('./db.js');

// const { DELETED_PRODUCTS, PRODUCTS } = COLLECTION;

const get = async (_, { product_id }) => {
  const db = getDb();
  return db.collection(PRODUCTS).findOne({ product_id });
};

const list = async () => {
  const db = getDb();
  return db.collection(PRODUCTS).find({}).toArray();
};

const add = async (_, { product }) => {
  const db = getDb();
  // eslint-disable-next-line no-param-reassign
  product.product_id = await CounteridForDocument(PRODUCTS);
  console.log("PRODUCT :: ",product);
  const result = await db.collection(PRODUCTS).insertOne(product);
  // console.log("RES :: ", result)
  return db
    .collection(PRODUCTS)
    .findOne({ _id: result.insertedId });
};

const update = async (_, { product_id, changes }) => {
  const db = getDb();
  if (changes.product_name || changes.product_category || changes.product_price || changes.product_image) {
    const product = await db.collection(PRODUCTS).findOne({ product_id });
    Object.assign(product, changes);
  }
  await db.collection(PRODUCTS).updateOne({ product_id }, { $set: changes });
  return db.collection(PRODUCTS).findOne({ product_id });
};

const remove = async (_, { product_id }) => {
  const db = getDb();
  const product = await db.collection(PRODUCTS).findOne({ product_id });
  if (!product) return false;

  product.deleted = new Date();
  let result = await db.collection(DELETED_PRODUCTS).insertOne(product);
  if (result.insertedId) {
    result = await db.collection(PRODUCTS).removeOne({ product_id });
    return result.deletedCount === 1;
  }
  return false;
};


const count = async () => {
  let productCount = 0;
  const db = getDb();
  const products = await db.collection('products')
    .aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
        },
      },
    ]).toArray();

  if (products.length > 0) {
    productCount = products[0].total;
  }
  return productCount;
};


module.exports = {
    list, get, add, update, delete: remove, count,
};
