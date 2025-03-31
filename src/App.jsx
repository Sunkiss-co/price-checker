import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

function App() {
  const [data, setData] = useState([]);
  const [selectedModel, setSelectedModel] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    fetch(
      "https://docs.google.com/spreadsheets/d/1GW7PzQwOhOczElnZD00jFwLXPToymYY2MnxpW2Wsw2M/gviz/tq?tqx=out:json"
    )
      .then((res) => res.text())
      .then((text) => {
        const json = JSON.parse(text.substr(47).slice(0, -2));
        const rows = json.table.rows.map((row) => ({
          maker: row.c[0].v,
          category: row.c[1].v,
          model: row.c[2].v,
          capacity: row.c[3].v,
          price: row.c[4].v,
        }));
        setData(rows);
      });
  }, []);

  const handleModelChange = (e) => {
    const model = e.target.value;
    setSelectedModel(model);
    const selected = data.find((d) => d.model === model);
    setPrice(selected ? selected.price.toLocaleString() : "");
  };

  return (
    <div className="p-4 max-w-md mx-auto space-y-4">
      <motion.h1
        className="text-2xl font-bold text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        仕入価格チェッカー
      </motion.h1>
      <div className="border p-4 rounded-lg shadow">
        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-sm">メーカー</label>
            <select disabled className="w-full border rounded p-2">
              <option value="長州産業">長州産業</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 text-sm">型番</label>
            <select
              value={selectedModel}
              onChange={handleModelChange}
              className="w-full border rounded p-2"
            >
              <option value="">選択してください</option>
              {data.map((item, index) => (
                <option key={index} value={item.model}>
                  {item.model}
                </option>
              ))}
            </select>
          </div>
          {price && (
            <motion.div
              className="text-center text-lg font-semibold mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              仕入価格：¥{price}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
