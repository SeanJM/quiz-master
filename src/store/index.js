import { Singleton } from "@/class/singleton";
export * from "./with-store";

const DEFAULT_ANSWERS = [
  {
    id: 0,
    value: "Strongy agree",
    score: 0,
  }, {
    id: 1,
    value: "Agree",
    score: 1,
  }, {
    id: 2,
    value: "Somewhat agree",
    score: 2,
  }, {
    id: 3,
    value: "Somewhat disagree",
    score: 3,
  }, {
    id: 4,
    value: "Disagree",
    score: 4,
  }, {
    id: 5,
    value: "Strongly disagree",
    score: 5,
  },
];

const BEER_ANSWERS = [
  {
    id: 0,
    value: "300ml",
    score: 0,
  }, {
    id: 1,
    value: "500ml",
    score: 1,
  }, {
    id: 2,
    value: "1L",
    score: 2,
  },
];

export const store = new Singleton({
  list: [{
    id: 0, // IDs are used to identify the question in the list
    question: "Fish are tasty",
    answers: DEFAULT_ANSWERS,
    isSelected: false,
  }, {
    id: 1,
    question: "I would rather drink a Coke than a Pepsi",
    answers: DEFAULT_ANSWERS,
    isSelected: false,
  }, {
    id: 2,
    question: "The best size for a beer is",
    answers: BEER_ANSWERS,
    isSelected: false,
  }],
});