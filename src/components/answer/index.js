import React, { Component } from "react";
import { dispatch } from "@/action";
import anime from "animejs";

export class Answer extends Component {
  onClick() {
    dispatch("QUIZ_SELECT_ANSWER", {
      id: this.props.id,
      questionID: this.props.questionID,
    });
  }

  clear() {
    if (this.props.isSelected === true) {
      this.props.isSelected = false;
      anime({
        targets: this.selected,
        scale: [1, 0.3],
        opacity: [1, 0],
        easing: "easeOutQuad",
        duration: 300,
        complete: () => {
          const classes = this.element.className.split(" ");
          this.element.className = classes
            .filter((className) => className !== "answer--selected")
            .join(" ");
        },
      });
    }
  }

  select() {
    if (!this.props.isSelected) {
      this.props.isSelected = true;
      anime({
        targets: this.selected,
        scale: [0.3, 1],
        opacity: [0, 1],
        easing: "easeOutQuad",
        duration: 300,
        complete: () => {
          this.element.className += " answer--selected";
        },
      });
    }
  }

  render() {
    return (
      <div
        className="answer"
        onClick={() => this.onClick()}
      >
        <div className="answer_text">{this.props.value}</div>
        <div className="answer_selected" />
      </div>
    );
  }
}