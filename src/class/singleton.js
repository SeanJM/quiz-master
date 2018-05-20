import { merge } from "lodash";
import { deepCompare } from "@/scripts/deep-compare";

function defaultMapState(state) {
  return state;
}

export class Singleton {
  constructor(state) {
    this.value = state || {};
    this.listeners = [];
  }

  set(value) {
    this.prev = this.value;
    this.value = merge({}, this.value, value);
    this.triggerChange(this.prev);
  }

  onChange(callback, mapState) {
    mapState = mapState || defaultMapState;
    // We take a map to give our components nicer objects to work with
    this.listeners.push({
      callback: callback,
      mapState: mapState,
    });
  }

  offChange(callback) {
    this.listeners = this.listeners.filter((a) => a.callback !== callback);
    return this;
  }

  triggerChange(prev) {
    let i = -1;
    let n = this.listeners.length;
    while (++i < n) {
      let callback = this.listeners[i].callback;
      let mapState = this.listeners[i].mapState;
      // Do a deep comparison because redrawing the DOM is expensive
      // when the previous states are different, trigger the callback
      if (!deepCompare(mapState(prev), mapState(this.value))) {
        // This is a ternian expression, it's a shorthand if/else
        callback(mapState(this.value));
      }
    }
  }
}