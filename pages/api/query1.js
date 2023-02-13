import {initMongoose} from "../../lib/mongoose";
import Product from "../../models/Product";

export async function findAllProductsAggregate() {
  return Product.aggregate([
    {
      "$group": {
        "_id": "$brand",
        "count": { "$sum": 1 }
      }
    },
    {
      "$sort": { "count": -1 }
    }
  ]).exec();
}

export default async function handle(req, res) {
  await initMongoose();
  const {ids} = req.query;
  if (ids) {
    const idsArray = ids.split(',');
    res.json(
      await Product.aggregate([
        {
          "$match": {
            "_id": { "$in": idsArray.map(id => mongoose.Types.ObjectId(id)) }
          }
        },
        {
          "$group": {
              "_id": "$brand",
              "count": { "$sum": 1 }
          }
        },
        {
          "$sort": { "count": -1 }
        }
      ]).exec()
    );
  } else {
    res.json( await findAllProductsAggregate() );
  }
}


/*

import {initMongoose} from "../../lib/mongoose";
import Product from "../../models/Product";

export async function findAllProductsCount() {
  return Product.countDocuments().exec();
}

export default async function handle(req, res) {
  await initMongoose();
  const {ids} = req.query;
  if (ids) {
    const idsArray = ids.split(',');
    res.json({
      count: await Product.aggregate([{
        "$group": {
            "_id":"$brand",
            "count":{"$sum": 1}
        }
      }]).exec()
    });
  } else {
    res.json({
      count: await findAllProductsCount()
    });
  }
}

*/