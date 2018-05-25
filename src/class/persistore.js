import { merge, debounce } from "lodash";
import getPaths from "@/scripts/get-paths";
import { Store } from "./store";
import { set } from "lodash";

const validFirstCharacter = {
  "\"": true,
  "[": true,
  "{": true,
};

export class PersiStore {
  constructor(initialState, settings) {
    const storeValue = {};
    settings = settings || {};

    for (const k in localStorage) {
      if (validFirstCharacter[localStorage[k][0]] && localStorage.hasOwnProperty(k)) {
        set(storeValue, k, JSON.parse(localStorage[k]));
      }
    }

    this.store = new Store(merge({}, initialState, storeValue));
    this.value = this.store.value;
    this.ignore = settings.ignore || [];
    this.saveLocalStorageDebounced = debounce(() => this.saveLocalStorage(), 500);

    this.store.onSet((value) => {
      this.value = value;
      this.saveLocalStorageDebounced();
    });
  }

  isIgnored(setPath) {
    let i = -1;
    let n = this.ignore.length;

    while (++i < n) {
      if (this.ignore[i].test(setPath)) {
        return true;
      }
    }

    return false;
  }

  saveLocalStorage() {
    const paths = getPaths(this.value);
    let i = -1;
    let n = paths.length;

    while (++i < n) {
      let setPath = paths[i].slice(0, -1).join(".");
      if (!this.isIgnored(setPath)) {
        localStorage.setItem(
          setPath,
          JSON.stringify(paths[i].slice(-1)[0])
        );
      }
    }

    return this;
  }

  set(value) {
    this.store.set(value);
    return this;
  }

  onChange(callback, mapState, component) {
    this.store.onChange(callback, mapState, component);
    return this;
  }

  offChange(callback) {
    this.store.offChange(callback);
    return this;
  }
}