import {model, models, Schema} from "mongoose";

const NuevosSchema = new Schema({
  brand: String,
  model: String,
  latest_price: Number,

}, {timestamps: true});

const Nuevos = models?.Nuevos || model('Nuevos', NuevosSchema);

export default Nuevos;