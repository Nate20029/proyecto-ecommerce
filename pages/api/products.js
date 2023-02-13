import { initMongoose } from "../../lib/mongoose";
import Product from "../../models/Product";

export async function findAllProducts() {
  return Product.find().limit(20).exec();
}

export default async function handle(req, res) {
  await initMongoose();
  const { ids } = req.query;
  if (ids) {
    const idsArray = ids.split(',');
    res.json(
      await Product.find({
        '_id': { $in: idsArray }
      }).limit(20).exec()
    );
  } else {
    res.json(
      await Product.find().limit(20).exec()
    );
  }
}