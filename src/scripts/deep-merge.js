function mergeObject(x, y) {
  for (var k in y) {
    if (x[k] && typeof x[k] === "object") {
      mergeAny(x[k], y[k]);
    } else {
      x[k] = y[k];
    }
  }
  return x;
}

function mergeArray(x, y) {
  let i = -1;
  let n = y.length;
  while (++i < n) {
    if (typeof x[i] === "object") {
      mergeAny(x[i], y[i]);
    } else if (x.indexOf(y[i]) === -1) {
      x.push(y[i]);
    }
  }
  return x;
}

function mergeAny(x, y) {
  if (Array.isArray(x) && Array.isArray(y)) {
    mergeArray(x, y);
  } else {
    mergeObject(x, y);
  }
  return x;
}

export function deepMerge(a) {
  let i = -1;
  let n = arguments.length;

  while (++i < n) {
    // We akways merge into the first argument (a), it is the only one
    // which is mutated (changed)
    mergeAny(a, arguments[i]);
  }

  return a;
}