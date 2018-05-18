import { h } from "@h";
import { store } from "@store";
import { Footer } from "@components/footer";
import { Answers } from "@components/answers";
import { Question } from "@components/question";

export class App {
  constructor(props) {
    this.footer = h(Footer);

    this.element = h("div", {
      class: "questions"
    }, [
        this.questionsContainer = h("div")
      ]);

    this.element.appendChild(
      h("div", {
        class: "submit-button",
        onClick: () => this.onSubmit()
      }, "Done")
    );

    this.element.appendChild(
      this.footer.element
    );

    store.value.list.forEach(quizItemOptions => {
      const quizItem = h("div", { class: "quiz-item" }, [
        h(Question, {
          question: quizItemOptions.question,
          id: quizItemOptions.id
        }),
        h(Answers, {
          answers: quizItemOptions.answers,
          id: quizItemOptions.id
        })
      ]);

      this.questionsContainer.appendChild(quizItem);
    });

    this.props = props;
  }

  onSelect() {
    this.update();
  }

  onSubmit() {
    const onSubmit = this.props.onSubmit;
    const results = {};
    this.quizItems.forEach(quizItem => {
      const question = quizItem.question.value;
      const answer = quizItem.answers.choices[quizItem.answers.selectedIndex].value;
      results[question] = answer;
    });
    onSubmit(
      results
    );
  }
}