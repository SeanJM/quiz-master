import { h } from "@h";

export class Question {
  constructor(props) {
    this.element = h("div", { class: "question" }, [ 
      h("h5", {}, "Question"),
      props.question
    ]);
    this.value = props.question;
  }
}