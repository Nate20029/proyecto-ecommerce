import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Link from "next/link";

function App() {
  const [productsInfo, setProductsInfo] = useState([]);
  const [productsInfo2, setProductsInfo2] = useState([]);
  const [productsInfo3, setProductsInfo3] = useState([]);
  const [productsInfo4, setProductsInfo4] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  
  const handleOptionSelect = async (option) => {
    setSelectedOption(option);
  }

  useEffect(() => {
    fetch("/api/query1")
      .then(response => response.json())
      .then(json => setProductsInfo(json));
  }, []);

  useEffect(() => {
    fetch("/api/query2")
      .then(response => response.json())
      .then(json => setProductsInfo2(json));
  }, []);

  useEffect(() => {
    fetch("/api/query3")
      .then(response => response.json())
      .then(json => setProductsInfo3(json));
  }, []);
  
  useEffect(() => {
    fetch("/api/query4")
      .then(response => response.json())
      .then(json => setProductsInfo4(json));
  }, []);

  const brandName = [...new Set(productsInfo)];
  const brandName2 = [...new Set(productsInfo2)];
  const brandName3 = [...new Set(productsInfo3)];
  const brandName4 = [...new Set(productsInfo4)];

  console.log({ brandName });
  return (
    <div style={{ display: "flex" }}>
       <div style={{ width: "20%", height: "100vh", background: "lightgray" }}>
          <Link href={"/crear"}>
            <button>Agregar</button>
          </Link>
          <br />
       </div>
       <div style={{ width: "80%", height: "100vh", padding: "16px" }}>
         <h2>Reposteria:</h2>
         <ul>
           <li onClick={() => handleOptionSelect("Option A")}>¿Cual es la marca que hay mas en stock?</li>
           <li onClick={() => handleOptionSelect("Option B")}>¿Que productos tienen mejor Rating?</li>
           <li onClick={() => handleOptionSelect("Option C")}>¿Que productos son los mas comprados?</li>
           <li onClick={() => handleOptionSelect("Option D")}>Historial de Ordenes</li>
         </ul>
         <br />
         <div
           style={{
             background: "lightgray",
             padding: "16px",
             borderRadius: "4px",
           }}
         >
           {selectedOption === "Option A" ? (
              <div>
              {brandName.map(brandN => (
                <div key={brandN._id}>
                  <h6 className="text-2xl capitalize">{brandN._id + ": " + brandN.count}</h6>
                </div>
              ))}
              </div>
           ) : selectedOption === "Option B" ? (
              <div>
              {brandName2.map(brandN => (
                <div key={brandN._id}>
                  <h6 className="text-2xl capitalize">{"Id/Model :" + brandN._id + "/ " + brandN.model}</h6>
                </div>
              ))}
            </div>
           ) : selectedOption === "Option C" ? (
            <div>
            {brandName3.map(brandN => (
              <div key={brandN._id}>
                <h6 className="text-2xl capitalize">{"Id/No. :" + brandN._id + "/ " + brandN.count}</h6>
              </div>
            ))}
          </div>
           ) : selectedOption === "Option D" ? (
            <div>
            {brandName4.map(brandN => (
              <div key={brandN._id}>
                <h6 className="text-2xl capitalize">{"-" + brandN._id + "/ " + "/ " + brandN.name + "/ " + brandN.createdAt}</h6>
              </div>
            ))}
            </div>
          ) : null}
         </div>
         <div>
         <iframe style={{background:" #F1F5F4;border: none;border-radius: 2px;box-shadow: 0 2px 10px 0 rgba(70, 76, 79, .2);width: 100vw;height: 100vh;" }}  src="https://charts.mongodb.com/charts-project-0-qaebz/embed/dashboards?id=63ea74c8-7e11-4b38-8a81-487cfd4399e3&theme=light&autoRefresh=true&maxDataAge=3600&showTitleAndDesc=false&scalingWidth=fixed&scalingHeight=fixed"></iframe>
         </div>
       </div>
       <Footer></Footer>
     </div>
  );

}
export default App;
/*
    <div>
      {brandName.map(brandN => (
        <div key={brandN._id}>
          <h6 className="text-2xl capitalize">{brandN._id + ": " + brandN.count}</h6>
        </div>
      ))}
    </div>

{brandName.map(brandN => (
        <div key={brandN}>
          <h4 className="text-2xl capitalize">{brandN}</h4>
        </div>
      ))}

import React, { useState } from "react";
import mongoose from "mongoose";
import { initMongoose } from "../lib/mongoose";
import Footer from "../components/Footer";
import Link from "next/link";
import {useRouter} from "next/router";

const queries = {
   "Option A": [
     {
       $group: {
         _id: "$brand",
         count: { $sum: 1 },
       },
     },
     {
       $sort: { count: -1 },
     },
   ],
   "Option B": [
     {
       $group: {
         _id: "$brand",
         count: { $sum: 1 },
       },
     },
     {
       $sort: { count: -1 },
     },
     {
       $limit: 5,
     },
   ],

 };

 function App() {
   const router = useRouter();
   const path = router.pathname;
   const [selectedOption, setSelectedOption] = useState("");
   const [queryResult, setQueryResult] = useState([]);

   const handleOptionSelect = async (option) => {
     setSelectedOption(option);
     const query = queries[option]
     if (query) {
       try {
         await initMongoose();
         const db = mongoose.connection.db;
         const collection = db.collection("products");
         const result = await collection.aggregate(query).toArray();
         setQueryResult(result);
       } catch (error) {
         console.error(error);
       }
     }
   };

   return (
     <div style={{ display: "flex" }}>
       <div style={{ width: "20%", height: "100vh", background: "lightgray" }}>
          <Link href={"/crear"}>
            <button>Agregar</button>
          </Link>
          <br />
          <Link href="/modificar">
            <button>Modificar</button>
          </Link>
          <br />
          <Link href="/eliminar">
            <button>Eliminar</button>
          </Link>
       </div>
       <div style={{ width: "80%", height: "100vh", padding: "16px" }}>
         <h2>Reposteria:</h2>
         <ul>
           <li onClick={() => handleOptionSelect("Option A")}>¿Cual es la marca que hay mas en stock?</li>
           <li onClick={() => handleOptionSelect("Option B")}>¿Cual es la marca que hay mas en stock?</li>
         </ul>
         <br />
         <div
           style={{
             background: "lightgray",
             padding: "16px",
             borderRadius: "4px",
           }}
         >
           {selectedOption === "Option A" ? (
             <pre>{JSON.stringify(queryResult, null, 2)}</pre>
           ) : selectedOption === "Option B" ? (
             <pre>{JSON.stringify(queryResult, null, 2)}</pre>
           ) : null}
         </div>
       </div>
       <Footer></Footer>
     </div>
   );
 }

export default App;

*/

// import React, { useState, useEffect } from "react";
// import mongoose from "mongoose";
// import { initMongoose } from "../lib/mongoose";

// function App() {
//   const [brands, setBrands] = useState([]);

//   useEffect(() => {
//     initMongoose().then(() => {
//       if (mongoose.connection.readyState === 1) {
//         const Product = mongoose.model("Product", new mongoose.Schema({ brand: String }));
//         Product.aggregate([
//           {
//             "$group": {
//               "_id": "$brand",
//               "count": { "$sum": 1 }
//             }
//           },
//           {
//             "$sort": { "count": -1 }
//           },
//           {
//             "$limit": 5
//           }
//         ]).exec((err, brands) => {
//           setBrands(brands);
//         });
//       }
//     });
//   }, []);

//   return (
//     <div>
//       <table>
//         <thead>
//           <tr>
//             <th>Brand</th>
//             <th>Count</th>
//           </tr>
//         </thead>
//         <tbody>
//           {brands.map(brand => (
//             <tr key={brand._id}>
//               <td>{brand._id}</td>
//               <td>{brand.count}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default App;