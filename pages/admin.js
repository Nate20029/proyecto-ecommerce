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
};

function App() {
  const [selectedOption, setSelectedOption] = useState("");
  const [queryResult, setQueryResult] = useState([]);

  const handleOptionSelect = async (option) => {
    setSelectedOption(option);
    const query = queries[option];
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
        <button onClick={() => handleOptionSelect("Option 1")}>Button 1</button>
        <br />
        <button onClick={() => handleOptionSelect("Option 2")}>Button 2</button>
        <br />
        <button onClick={() => handleOptionSelect("Option 3")}>Button 3</button>
      </div>
      <div style={{ width: "80%", height: "100vh", padding: "16px" }}>
        <h2>Reposteria:</h2>
        <ul>
          <li onClick={() => handleOptionSelect("Option A")}>¿Cual es la marca que hay mas en stock?</li>
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
          ) : null}
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
