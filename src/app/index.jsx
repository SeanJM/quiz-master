import React, { Component } from "react";
import { store, withStore } from "@store";
import { Select, Option } from "@components/select";
import { Question } from "@components/question";
import { Button } from "@components/button";
import { Indicator } from "@components/indicator";
import { dispatch } from "@action";

function mapStateToProps(state) {
  return state;
}

// Component is required to hook into Preact's lifecycle events
class App extends Component {
  getSelectedAnswer(quizItem) {
    const selected = quizItem.answers.find((a) => a.isSelected);
    return selected || -1;
  }

  onClick({ answerID, questionID }) {
    dispatch("QUIZ_SELECT_ANSWER", {
      answerID,
      questionID,
    });
  }

  onSubmit() {
    const results = {};

    store.value.list.forEach((quizItem) => {
      const question = quizItem.question;
      const answer = this.getSelectedAnswer(quizItem);
      results[question] = answer && answer.value;
    });

    console.log(results);
  }

  render() {
    console.log(this.props);
    return (
      <div className="questions">
        {this.props.list.map((quizItemOptions, i) => (
          <div
            key={i}
            className="quiz-item"
          >
            <Question
              question={quizItemOptions.question}
              id={quizItemOptions.id}
            />
            <Select
              id={quizItemOptions.id}
            >
              {quizItemOptions.answers.map((answer) =>
                <Option
                  isSelected={answer.isSelected}
                  onClick={() => this.onClick({
                    questionID: quizItemOptions.id,
                    answerID: answer.id,
                  })}
                  key={answer.id}>{answer.value}</Option>
              )}
            </Select>
          </div>
        ))}
        <Button
          primary
          className="submit-button"
          onClick={() => this.onSubmit()}
        >
          Done
        </Button>
        <div className="footer">
          {
            this.props.list.map((question) => {
              // Double 'bang' (!) converts anything into a boolean (true/false)
              const isSelected = !!question.answers.find((answer) => answer.isSelected);
              return (
                <Indicator key={question.id} isSelected={isSelected} />
              );
            })
          }
        </div>
      </div>
    );
  }
}

export const AppConnected = withStore(App, mapStateToProps)();