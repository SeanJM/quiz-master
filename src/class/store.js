import { merge } from "lodash";
import { deepCompare } from "@/scripts/deep-compare";

function defaultMapState(state) {
  return state;
}

export class Store {
  constructor(state) {
    this.value = state || {};
    this.listeners = [];
  }

  set(value) {
    const prev = this.value;
    let i = -1;
    let n = this.listeners.length;
    this.value = merge({}, this.value, value);
    while (++i < n) {
      let callback = this.listeners[i].callback;
      let mapState = this.listeners[i].mapState;
      // I'm protecting the reference to 'props' from being lost
      let { props } = this.listeners[i].component;
      // Do a deep comparison because redrawing the DOM is expensive
      // when the previous states are different, trigger the callback
      if (!deepCompare(mapState(prev, props), mapState(this.value, props))) {
        // This is a ternian expression, it's a shorthand if/else
        callback(mapState(this.value, props));
      }
    }
  }

  onChange(callback, mapState, component) {
    mapState = mapState || defaultMapState;
    // We take a map to give our components nicer objects to work with
    this.listeners.push({
      callback,
      mapState,
      component,
    });
  }

  offChange(callback) {
    this.listeners = this.listeners.filter((a) => a.callback !== callback);
    return this;
  }
}