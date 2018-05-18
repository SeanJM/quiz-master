import { App } from "@app";
import { h } from "@h";
import "./index.scss";

const app = h(App, {
  onSubmit: (e) => {
    // This is the object you send to the server
    console.log(e);
  }
});

document.getElementById("app").appendChild(app.element);