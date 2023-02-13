import Layout from "../components/Layout";
import {useContext, useEffect, useState} from "react";
import {ProductsContext} from "../components/ProductsContext";

export default function CheckoutPage() {

  const [productsInfo, setProductsInfo] = useState([]);
  const [brand,setbrand] = useState('');
  const [model,setmodel] = useState('');
  const [latest_price,setlatest_price] = useState('');


  useEffect(() => {
    fetch("/api/products")
      .then(response => response.json())
      .then(json => setProductsInfo(json));
  }, []);

  return (
    <Layout>
      <form action="/api/products" method="POST">
        <div className="mt-8">
          <input name="brand" value={brand} onChange={e => setbrand(e.target.value)} className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2" type="text" placeholder="Brand"/>
          <input name="model" value={model} onChange={e => setmodel(e.target.value)} className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2" type="text" placeholder="Model"/>
          <input name="latest_price" value={latest_price} onChange={e => setlatest_price(e.target.value)} className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2" type="text" placeholder="Prize"/>
        </div>
        <button type="submit" className="bg-emerald-500 px-5 py-2 rounded-xl font-bold text-white w-full my-4 shadow-emerald-300 shadow-lg">Crear</button>
      </form>
    </Layout>
  );
}
