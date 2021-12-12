import React from "react";
import Choice from "./Choice";

export default function Questions(props) {
  return (
    <div className="quiz-question-section">
      <h1 className="quiz-ind-question"> {props.question} </h1>
    </div>
    // <button className="check-answers-btn">Check Answers</button>
  );
}
