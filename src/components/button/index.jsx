import React from "react";

export function Button(props) {
  const className = ["button"];
  if (props.primary) {
    className.push("button-primary");
  } else if (props.secondary) {
    className.push("button-secondary");
  } else if (props.danger) {
    className.push("button-danger");
  }
  return (
    <div onClick={props.onClick} className={className.join(" ")}>
      <div className="button_face" />
      <div className="button_label">
        {props.children}
      </div>
    </div>
  );
}