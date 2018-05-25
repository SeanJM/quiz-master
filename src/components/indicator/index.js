import React, { Component } from "react";
import anime from "animejs";

export class Indicator extends Component {
  onSelect() {
    anime({
      targets: this.thumbNode,
      scale: {
        value: [0.3, 1],
      },
      opacity: {
        value: [0, 1],
        duration: 300,
        easing: "easeInQuad",
      },
    });
  }

  onDeselect() {
    anime({
      targets: this.thumbNode,
      scale: [1, .3],
      opacity: [1, 0],
      easing: "easeOutQuad",
    });
  }

  componentDidMount() {
    if (this.props.isSelected) {
      this.onSelect();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isSelected && nextProps.isSelected) {
      this.onSelect();
    } else if (!nextProps.isSelected && this.props.isSelected) {
      this.onDeselect();
    }
  }

  render() {
    return (
      <div className="indicator">
        <div
          ref={(node) => { this.thumbNode = node; }}
          className="indicator_thumb" />
      </div>
    );
  }
}