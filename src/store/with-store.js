import React, { Component } from "react";
import { store } from "./";

export function withStore(C, mapStateToProps) {
  class WithStore extends Component {
    constructor(props) {
      super(props);
      this.handleUpdate = () => {
        this.forceUpdate();
      };
    }

    componentDidMount() {
      store.onChange(
        this.handleUpdate,
        mapStateToProps,
        this
      );
    }

    componentWillUnmount() {
      store.offChange(this.handleUpdate);
    }

    render() {
      return (
        <C {...mapStateToProps(store.value, this.props)} />
      );
    }
  }

  // Return a function to accept other components (HOC - Higher order components)
  // Like a router
  return function () {
    let n = arguments.length;
    let wrapped = WithStore;
    // We go from the last to first
    while (--n > 1) {
      wrapped = arguments[n](wrapped);
    }
    return wrapped;
  };
}