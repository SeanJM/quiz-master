import { h } from "@h";
import anime from "animejs";
import { deepMerge } from "@deep";

export class Indicator {
  constructor(props) {
    this.props = deepMerge(props);

    this.element = h("div", { class: "indicator" }, [
      this.thumb = h("div", { class: "indicator_thumb" })
    ]);

    this.props.isSelected = false;
  }

  select() {
    if (!this.props.isSelected) {
      this.element.className += " indicator--select";
      this.props.isSelected = true;
      anime({
        targets: this.thumb,
        scale: {
          value: [0.3, 1],
        },
        opacity: {
          value: [0, 1],
          duration: 300,
          easing: "easeInQuad"
        }
      });
    }
  }

  clear() {
    if (this.props.isSelected) {
      this.props.isSelected = false;
      this.element.className = (
        this.element.className
          .split(" ")
          .filter(a => a !== "indicator--select")
          .join(" ")
      );
      anime({
        targets: this.thumb,
        scale: [1, .3],
        opacity: [1, 0],
        easing: "easeOutQuad",
      });
    }
  }
}