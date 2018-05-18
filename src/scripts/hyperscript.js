// Hypertext is a common format for JavaScript applications
// applications like React, VueJS and Angular use a similar
// format
export function h(tagName, props, children) {
  const childrenCopy = children ? [].concat(children) : []; // Copying prevents side effects to 'children'
  
  if (typeof tagName === "function") {
    return new tagName(props, childrenCopy);
  }

  return createElement(tagName, props, childrenCopy);
}

export function createElement(tagName, props, children) {
  let element = document.createElement(tagName);
  
  for (var attribute in props) {
    if (props.hasOwnProperty(attribute)) {
      // On a prefix for event listeners, similar to JQuery
      if (attribute.substring(0, 2) === "on") {
        element.addEventListener(attribute.substring(2).toLowerCase(), props[attribute], false);
      } else {
        element.setAttribute(attribute, props[attribute]);
      }
    }
  }
  
  for (var i = 0, n = children.length; i < n; i++) {
    if (typeof children[i] === "string") {
      children[i] = new Text(children[i]);
    } else if (children[i].element) {
      // Support for our custom elements that we create
      children[i] = children[i].element;
    }
    element.appendChild(children[i]);
  }
  return element;
}