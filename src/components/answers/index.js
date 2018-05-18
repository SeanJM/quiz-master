import { h } from "@h";
import { Choice } from "@components/choice";
import { store } from "@store";
import { deepCopy } from "@scripts/deep-copy";

function mapState(value, props) {
  const element = value.list.find((element) => element.id === props.id);
  const selectedAnswer = element.answers.find(a => a.isSelected)
  return {
    selectedAnswer,
    selectedAnswerID: selectedAnswer ? selectedAnswer.id : null
  };
}

export class Answers {
  constructor(props) {
    this.props = deepCopy(props);

    this.choices = props.answers.map(answer => {
      return h(Choice, {
        ...answer,
        onSelect: (e) => this.onSelect(e)
      });
    });

    this.element = h("div", {
      class: "answer"
    }, [
        h("h5", {}, ["Answer"]),
        h("div", { class: "answer_choices" }, this.choices)
      ]);

    store.onChange((value) => this.update(value), (state) => mapState(state, props));
  }

  onSelect(e) {
    const list = deepCopy(store.value.list);

    list[this.props.id].isSelected = true;

    list[this.props.id].answers.forEach(a => {
      if (a.id === e.id) {
        a.isSelected = true;
      } else {
        a.isSelected = false;
      }
    });

    store.set({
      list: list
    });
  }

  update(value) {
    this.choices.forEach(choiceElement => {
      if (choiceElement.props.id === value.selectedAnswerID) {
        choiceElement.select();
      } else {
        choiceElement.clear();
      }
    });
  }
}