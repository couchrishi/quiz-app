import React from "react";

export default function Choice(props) {
  // const styles = {
  //   backgroundColor: props.choice.selected ? "#94D7A2" : "white",
  // };

  return (
    <div className="option-section" onClick={props.handleClick}>
      <h2
        className={
          props.choice.status === "selected" ? "answer-option-selected" : props.choice.status === "unselected"? "answer-option": "answer-option-incorrect" 
        }
      >
        {" "}
        {props.choice.value}{" "}
      </h2>
    </div>
  );
}
