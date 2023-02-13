import {initMongoose} from "../../lib/mongoose";
import Product from "../../models/Product";
import Order from "../../models/Order";

export async function findAllProductsAggregate() {
  return Order.aggregate([
    {
        "$project": {
           "_id": 1,
           "products": 1,
           "name": 1,
           "email": 1,
           "address": 1,
           "city": 1,
           "paid": 1,
           "createdAt": 1,
           "updatedAt": 1,
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
      await Order.aggregate([
        {
          "$match": {
            "_id": { "$in": idsArray.map(id => mongoose.Types.ObjectId(id)) }
          }
        },
        {
            "$project": {
               "_id": 1,
               "products": 1,
               "name": 1,
               "email": 1,
               "address": 1,
               "city": 1,
               "paid": 1,
               "createdAt": 1,
               "updatedAt": 1,
            }
         }
      ]).exec()
    );
  } else {
    res.json( await findAllProductsAggregate() );
  }
}
