import React, { useState } from "react";
import mongoose from "mongoose";
import { initMongoose } from "../lib/mongoose";
import Footer from "../components/Footer";

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
        <button onClick={() => handleOptionSelect("Option 1")}>Agregar</button>
        <br />
        <button onClick={() => handleOptionSelect("Option 2")}>Eliminar</button>
        <br />
        <button onClick={() => handleOptionSelect("Option 3")}>Modificar</button>
      </div>
      <div style={{ width: "80%", height: "100vh", padding: "16px" }}>
        <h2>Reposteria:</h2>
        <ul>
          <li onClick={() => handleOptionSelect("Option A")}>¿Cual es la marca que hay mas en stock?</li>
          <li onClick={() => handleOptionSelect("Option B")}>Option B</li>
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
