import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import { getRandom } from "./utils/getRandom";
import typewriter from "./assets/img/typewriter.jpg";

const QUOTES = "https://type.fit/api/quotes/";

const quoteStyle = {
  fontFamily: "Charmonman",
  backgroundColor: "#3E4B59",
  border: "none",
  fontWeight: 500,
  lineHeight: "2.5",
  borderRadius: 4,
  padding: "16px 0",
  margin: "2em",
};

const imgStyle = {
  width: "35%",
  height: "35%",
  borderRadius: "15px",
  marginTop: "1em",
  opacity: "0.8",
};

const App = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  const getQuote = useCallback(async () => {
    fetch(QUOTES)
      .then((res) => res.json())
      .then((data) => {
        const randomQuote = getRandom(data);
        setQuote(randomQuote.text);
        setAuthor(randomQuote.author);
      })
      .catch((err) => console.log("Error: ", err));
  }, []);

  useEffect(
    () => {
      getQuote();
    },
    [getQuote]
  );

  const handleTweetClick = () => {
    window.open(`https://twitter.com/intent/tweet?text=${quote}`);
  };

  return (
    <div className="App container">
      <h3 className="appauthor">Quote Machine</h3>
      <div className="container">
        <img
          alt="typewriter"
          className="bg-img bounce-in-top"
          src={typewriter}
          style={imgStyle}
        />
        <blockquote style={quoteStyle} className="text-center mx-auto">
          <q>{quote}</q>
          <p>{author}</p>
        </blockquote>
        <div class="row" style={{ display: "flex", justifyContent: "center" }}>
          <div
            className="btn-toolbar"
            role="toolbar"
            aria-label="toolbar with button groups"
          >
            <button type="button" onClick={getQuote} className="btn btn-info">
              New Quote
            </button>
            <button
              type="button"
              onClick={handleTweetClick}
              className="btn btn-info"
            >
              <i className="fa fa-twitter" aria-hidden="true" />
              &nbsp; Tweet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
