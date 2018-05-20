import { store } from "@store";
import { deepCopy } from "@deep";

export function quiz(subscribe) {
  subscribe("QUIZ_SELECT_ANSWER", (value) => {
    const list = deepCopy(store.value.list);
    const question = list.find((element) => element.id === value.questionID);
    const answers = question.answers;

    answers.forEach((answer) => {
      answer.isSelected = answer.id === value.answerID;
    });

    store.set({
      list: list,
    });
  });
}