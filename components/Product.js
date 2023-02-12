import { model } from "mongoose";
import {useContext} from "react";
import {ProductsContext} from "./ProductsContext";

export default function Product({_id,brand,model,latest_price,picture}) {
  const {setSelectedProducts} = useContext(ProductsContext);
  function addProduct() {
    setSelectedProducts(prev => [...prev,_id]);
  }
  return (
    <div className="w-52">
      <div className="bg-blue-100 p-5 rounded-xl">
        <img src={picture} alt=""/>
      </div>
      <div className="mt-2">
        <h3 className="font-bold text-lg">{brand}</h3>
      </div>
      <p className="text-sm mt-1 leading-4 text-gray-500">{model}</p>
      <div className="flex mt-1">
        <div className="text-2xl font-bold grow">${latest_price}</div>
        <button onClick={addProduct} className="bg-emerald-400 text-white py-1 px-3 rounded-xl">+</button>
      </div>
    </div>
  );
}
