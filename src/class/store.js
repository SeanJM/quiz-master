import { merge } from "lodash";
import { deepCompare } from "@/scripts/deep-compare";

function defaultMapState(state) {
  return state;
}

export class Store {
  constructor(state) {
    this.value = state || {};
    this.onchangeListeners = [];
    this.onsetListeners = [];
  }

  set(value) {
    const prev = this.value;
    let i = -1;
    let n = this.onsetListeners.length;
    this.value = merge({}, this.value, value);

    while (++i < n) {
      this.onsetListeners[i](this.value);
    }

    i = -1;
    n = this.onchangeListeners.length;
    while (++i < n) {
      let callback = this.onchangeListeners[i].callback;
      let mapState = this.onchangeListeners[i].mapState;
      // I'm protecting the reference to 'props' from being lost
      let { props } = this.onchangeListeners[i].component;
      let mapStateCache = mapState(this.value, props);
      // Do a deep comparison because redrawing the DOM is expensive
      // when the previous states are different, trigger the callback
      if (!deepCompare(mapState(prev, props), mapStateCache)) {
        // This is a ternian expression, it's a shorthand if/else
        callback(mapStateCache);
      }
    }
  }

  onSet(callback) {
    this.onsetListeners.push(callback);
    return this;
  }

  onChange(callback, mapState, component) {
    mapState = mapState || defaultMapState;
    // We take a map to give our components nicer objects to work with
    this.onchangeListeners.push({
      callback,
      mapState,
      component,
    });
  }

  offChange(callback) {
    this.onchangeListeners = this.onchangeListeners.filter((a) => a.callback !== callback);
    return this;
  }
}