import React, { Component } from "react";
import anime from "animejs";

export class Option extends Component {
  onSelect() {
    anime({
      targets: this.selectedNode,
      scale: [0.2, 1],
      opacity: [0, 1],
      duration: 200,
      easing: "easeOutQuad",
    });
  }

  onDeselect() {
    anime({
      targets: this.selectedNode,
      scale: [1, 0.2],
      opacity: [1, 0],
      duration: 200,
      easing: "easeOutQuad",
    });
  }

  // This is a "lifecycle" method, which is triggered any time that the value
  // of 'this.props' is about to change.
  componentWillReceiveProps(nextProps) {
    if (nextProps.isSelected && !this.props.isSelected) {
      this.onSelect();
    } else if (this.props.isSelected && !nextProps.isSelected) {
      this.onDeselect();
    }
  }

  render() {
    const className = ["select_option"];

    if (this.props.isSelected) {
      className.push("select_option--selected");
    }

    return (
      <div
        onClick={() => this.props.onClick()}
        className={className.join(" ")}
      >
        {/* 
          A "ref" is a function wich returns the DOM node when a compoenent 
          mounts 
        */}
        <div className="select_option_label">{this.props.children}</div>
        <div ref={(node) => { this.selectedNode = node; }} className="select_option_selected" />
      </div>
    );
  }
}

export class Select extends Component {
  render() {
    return (
      <div
        className="select"
      >
        {this.props.children}
      </div>
    );
  }
}