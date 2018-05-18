function copyArray(a) {
  const b = [];
  let i = -1;
  const n = a.length;
  while (++i < n) {
    b[i] = deepCopy(a[i]);
  }
  return b;
}

function copyObject(a) {
  const b = {};
  for (var k in a) {
    if (a.hasOwnProperty(k)) {
      b[k] = deepCopy(a[k]);
    }
  }
  return b;
}

export function deepCopy(a) {
  if (Array.isArray(a)) {
    return copyArray(a);
  } else if (typeof a === "object") {
    return copyObject(a);
  }
  return a;
}