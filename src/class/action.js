export class Action {
  constructor(props) {
    this.subscribers = {};
    this.isDebug = false;
    for (var k in props) {
      if (props.hasOwnProperty(k)) {
        this.subscribers[k] = props[k];
      }
    }
  }

  debug() {
    this.isDebug = true;
    return this;
  }

  subscribe(eventName, callback) {
    if (this.isDebug) {
      console.log(
        "%c ACTION %c%c SUBSCRIBE %c " + eventName,
        "font-weight: bold; background: #3bba9b; color: #fff;",
        "",
        "font-weight: bold; background: #7b3b98; color: #fff;",
        "color: #2aabba;"
      );
    }

    if (typeof this.subscribers[eventName] === "undefined") {
      this.subscribers[eventName] = [];
    }

    this.subscribers[eventName].push(callback);
    return this;
  }

  off(eventName, callback) {
    const index = this.subscribers[eventName].indexOf(callback);
    if (index > -1) {
      this.subscribers[eventName].splice(index, 1);
    } else {
      delete this.subscribers[eventName];
    }
    return this;
  }

  dispatch(eventName, value) {
    const callbackList = this.subscribers[eventName] || [];
    if (this.isDebug) {
      console.log(
        "%c ACTION %c%c DISPATCH %c %c " + eventName + " (" + callbackList.length + ") ",
        "font-weight: bold; background: #3bba9b; color: #fff;",
        "",
        "font-weight: bold; background: #d5773b; color: #fff;",
        "color: #2aabba;",
        value
      );
    }
    let i = -1;
    let n = callbackList.length;
    while (++i < n) {
      callbackList[i](value);
    }
    return this;
  }
}