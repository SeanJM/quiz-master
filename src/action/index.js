import { Action } from "@/class/action";
import { quiz } from "./quiz";

const action = new Action();

if (process.env.NODE_ENV === "development") {
  action.debug();
}

export function dispatch(eventName, value) {
  action.dispatch(eventName, value);
}

export function subscribe(eventName, callback) {
  action.subscribe(eventName, callback);
}

quiz(subscribe);