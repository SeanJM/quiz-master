import { h } from "@h";
import { deepCopy } from "@deep";
import anime from "animejs";

export class Choice {
  constructor(props) {
    this.props = deepCopy(props);
    this.props.isSelected = false;
    this.element = h("div", {
      class: "choice",
      onClick: () => {
        props.onSelect({
          target: this,
          ...this.props
        });
      }
    }, [
        h("div", { class: "choice_text" }, [props.value]),
        this.selected = h("div", { class: "choice_selected" })
      ]);
  }

  clear() {
    if (this.props.isSelected === true) {
      this.props.isSelected = false;
      anime({
        targets: this.selected,
        scale: [1, 0.3],
        opacity: [1, 0],
        easing: "easeOutQuad",
        duration: 300,
        complete: () => {
          const classes = this.element.className.split(" ");
          this.element.className = classes
            .filter(className => className !== "choice--selected")
            .join(" ");
        }
      });
    }
  }

  select() {
    if (!this.props.isSelected) {
      this.props.isSelected = true;
      anime({
        targets: this.selected,
        scale: [0.3, 1],
        opacity: [0, 1],
        easing: "easeOutQuad",
        duration: 300,
        complete: () => {
          this.element.className += " choice--selected";
        }
      });
    }
  }
}