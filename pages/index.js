import {useEffect, useState} from "react";
import Product from "../components/Product";
import {initMongoose} from "../lib/mongoose";
import {findAllProducts} from "./api/products";
import Footer from "../components/Footer";
import Layout from "../components/Layout";

export default function Home({products}) {
  const [phrase,setPhrase] = useState('');

  const categoriesNames = [...new Set(products.map(p => p.brand))];

  if (phrase) {
    products = products.filter(p => p.name.toLowerCase().includes(phrase));
  }

  return (
    <Layout>
      <input value={phrase} onChange={e => setPhrase(e.target.value)} type="text" placeholder="Search for products..." className="bg-gray-200 w-full py-2 px-4 rounded-xl"/>
      <div>
        {categoriesNames.map(categoryName => (
          <div key={categoryName}>
            {products.find(p => p.brand === categoryName) && (
              <div>
                <div className="flex flex-wrap -mx-5 overflow-x-scroll snap-x ">
                  {products.map(productInfo => (
                    <div key={productInfo._id} className="px-5 snap-start">
                      <Product {...productInfo} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

    </Layout>
  )
}

export async function getServerSideProps() {
  await initMongoose();
  const products = await findAllProducts();
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
