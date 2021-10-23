import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [productName, setProductName] = useState("");
  const [keywords, setKeywords] = useState("");

  const [review, setReview] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    console.log(productName, keywords);
    const headers = {
      "Content-Type": "application/json",
    };

    const payload = {
      productName: productName,
      keywords: keywords,
    }
    axios.post("/review", payload, {headers: headers}).then(reviewResponse => {
      console.log(reviewResponse.data);
      setReview(reviewResponse.data.choices[0].text)
    })
  };

  const handleProductChange = (e) => {
    setProductName(e.target.value);
  };

  const handleKeywords = (e) => {
    setKeywords(e.target.value);
  };

  return (
    <div>
      <form>
        <input
          type="text"
          name="product_name"
          placeholder="product name"
          value={productName}
          onChange={handleProductChange}
        />

        <input
          type="text"
          name="keywords"
          placeholder="keywords name"
          value={keywords}
          onChange={handleKeywords}
        />
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
      <p>{review}</p>
    </div>
  );
};

export default App;
