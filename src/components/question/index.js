import React from "react";

export function Question(props) {
  return (
    <div className="question">
      <h5>Question</h5>
      {props.question}
    </div>
  );
}