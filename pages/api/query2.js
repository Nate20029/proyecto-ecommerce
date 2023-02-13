import {initMongoose} from "../../lib/mongoose";
import Product from "../../models/Product";

export async function findAllProductsAggregate() {
  return Product.aggregate([
    {
        "$sort": {
           "ratings": -1
        }
    },
    {
        "$limit": 5
    },
    {
        "$project": {
           "_id": 1,
           "model": 1,
        }
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
            "$sort": {
               "ratings": -1
            }
        },
        {
            "$limit": 5
        },
        {
            "$project": {
               "_id": 1,
               "model": 1,
            }
        }
    
      ]).exec()
    );
  } else {
    res.json( await findAllProductsAggregate() );
  }
}

