import { initMongoose } from "../../lib/mongoose";
import Product from "../../models/Product";

export default async function handler(req, res) {
    await initMongoose();

    if (req.method !== 'POST') {
        res.json('should a post but its not!');
        return;
    }

    const { brand, model, latest_price } = req.body;


    const nuevos = await Product.create({
        brand,
        model,
        latest_price,
    });


}