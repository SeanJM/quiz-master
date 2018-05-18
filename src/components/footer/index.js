import { h } from "@h";
import { Indicator } from "@components/indicator";
import { store } from "@store";

function mapState(state) {
  const selectedByID = [];

  state.list.forEach(item => {
    if (item.isSelected) {
      selectedByID.push(item.id);
    }
  });

  return {
    selectedByID,
  };
}

export class Footer {
  constructor() {
    const { list } = store.value;
    let i = -1;
    const n = list.length;

    this.indicators = [];

    this.element = h("div", { class: "footer" }, [
      this.text = h("div", { class: "footer_text" }),
    ]);

    while (++i < n) {
      let indicator = h(Indicator, list[i]);
      this.indicators.push(
        indicator
      );
      this.element.appendChild(indicator.element);
    }

    store.onChange((value) => this.update(value), mapState);
  }

  update({ selectedByID }) {
    let i = -1;
    let n = this.indicators.length;
    while (++i < n) {
      if (selectedByID.indexOf(this.indicators[i].props.id) === -1) {
        this.indicators[i].clear();
      } else {
        this.indicators[i].select();
      }
    }
  }
}