import {model, models, Schema} from "mongoose";

const ProductSchema = new Schema({
  brand: String,
  model: String,
  processor_brand: String,
  processor_name: String,
  processor_gnrtn: String,
  ram_gb: String,
  ram_type: String,
  ssd: String,
  hdd: String,
  os: String,
  os_bit: String,
  graphic_card_gb: String,
  weight: String,
  display_size: String,
  warranty: String,
  Touchscreen: String,
  msoffice: String,
  latest_price: Number,
  old_price: Number,
  discount: Number,
  star_rating: String,
  ratings: Number,
  reviews: Number,

});

const Product = models?.Product || model('Product', ProductSchema);

export default Product;