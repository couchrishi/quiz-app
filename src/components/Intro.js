import React from "react";

export default function Intro(props) {
    
  return (
    <div className="intro-page">
      <header>
        <div className="header-right"></div>
      </header>
      <main>
        <h1 className="main-title"> Quizzical </h1>
        <p className="main-desc"> Let's rack that brain of yours! </p>
        <div class="main-btn-wrapper">
          <button className="main-btn" onClick={props.callback}>
            {" "}
            Start Quiz{" "}
          </button>
        </div>
      </main>
      <footer>
        <div className="footer-left"></div>
      </footer>
    </div>
  );
}
