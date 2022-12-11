import React, { useState, useEffect } from "react";
import Article from "./component/Article";
import "./App.css";

function App() {
  const [articles, setArticles] = useState([]);
  const [subreddit, setsubreddit] = useState("webdev");
  useEffect(() => {
    fetch("https://www.reddit.com/r/" + subreddit + ".json").then((res) => {
      if (res.status != 200) {
        console.log("ErrorError");
        return;
      }
      res.json().then((data) => {
        if (data != null) console.log(data);
        setArticles(data.data.children);
      });
    });
  }, [subreddit]);
  return (
    <div className="App">
      <header className="App-header">
        <input
          type="text"
          className="subreddit_input"
          value={subreddit}
          onChange={(e) => setsubreddit(e.target.value)}
        />
      </header>
      <div className="articles">
        {articles != null
          ? articles.map((article, index) => (
              <Article key={index} article={article.data} />
            ))
          : ""}
      </div>
    </div>
  );
}

export default App;
