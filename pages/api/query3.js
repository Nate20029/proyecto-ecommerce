import {initMongoose} from "../../lib/mongoose";
import Product from "../../models/Product";

export async function findAllProductsAggregate() {
  return Product.aggregate([
    {
        "$group": {
           "_id": "$_id",
           "count": {
              "$sum": 1
           }
        }
     },
     {
        "$sort": {
           "count": -1
        }
     },
     {
        "$limit": 5
     },
     {
        "$lookup": {
           "from": "orders",
           "localField": "_id",
           "foreignField": "id",
           "as": "product_details"
        }
     },
     {
        "$project": {
           "_id": 1,
           "count": 1,
           "model": "$product_details.model"
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
            "$group": {
               "_id": "$_id",
               "count": {
                  "$sum": 1
               }
            }
         },
         {
            "$sort": {
               "count": -1
            }
         },
         {
            "$limit": 5
         },
         {
            "$lookup": {
               "from": "orders",
               "localField": "_id",
               "foreignField": "id",
               "as": "product_details"
            }
         },
         {
            "$project": {
               "_id": 1,
               "count": 1,
               "model": "$product_details.model"
            }
         }
    
      ]).exec()
    );
  } else {
    res.json( await findAllProductsAggregate() );
  }
}

