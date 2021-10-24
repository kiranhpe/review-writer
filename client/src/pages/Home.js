import React, { useState } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
import { Link } from 'react-router-dom'

export const Home = (props) => {
    const [productName, setProductName] = useState("");
  const [keywords, setKeywords] = useState("");

  const [showSpinner, setShowSpinner] = useState(false);
  const [review, setReview] = useState(null);

  const [isMaxLimitReached, setIsMaxLitmitReached] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault();
    if (productName !== "" && keywords !== "") {
      setShowSpinner(true);
      const headers = {
        "Content-Type": "application/json",
      };

      const payload = {
        productName: productName,
        keywords: keywords,
      };
      axios
        .post("/review", payload, { headers: headers })
        .then((reviewResponse) => {
          setReview(reviewResponse.data.choices[0].text);
          navigator.clipboard.writeText("review");
          setShowSpinner(false);
        })
        .catch((reason) => {
          if (reason.response.status === 403) {
            setIsMaxLitmitReached(true);
            setShowSpinner(false);
          }
        });
    } else {
      return;
    }
  };

  const handleProductChange = (e) => {
    setProductName(e.target.value);
  };

  const handleKeywords = (e) => {
    setKeywords(e.target.value);
  };

  return (
    <div className="container">
      {showSpinner && (
        <Loader
          type="Rings"
          color="#00BFFF"
          height={100}
          width={100}
          className="spinner"
        />
      )}
      <form className="form">
        <h2>Write a product review with just few words</h2>
        <input
          type="text"
          name="product_name"
          placeholder="Product name"
          value={productName}
          onChange={handleProductChange}
        />

        <input
          type="text"
          name="keywords"
          placeholder="Keywords seperated by ,"
          value={keywords}
          onChange={handleKeywords}
        />
        <button type="button" onClick={handleLogin}>
          Get Review
        </button>
        <button type="button" onClick={()=> {props.history.push('/admin')}}>
          Login as Admin
        </button>
      </form>

      {(review || isMaxLimitReached ) && <div className="review-contaier">
        {review && <p className="review">{review}</p>}
        {isMaxLimitReached && (
          <p className="review-error">
            Your maximum request limit has been reached
          </p>
        )}
      </div>}
    </div>
  );
}
