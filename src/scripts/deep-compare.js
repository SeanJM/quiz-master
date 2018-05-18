export function compareArray(a, b) {
  const aLength = a.length;
  const bLength = b.length;
  let i = -1;
  let n = Math.max(aLength, bLength);
  if (aLength === bLength) {
    while (++i < n) {
      if (a[i] !== b[i]) {
        // Recusrively compare
        if (!deepCompare(a[i], b[i]))
          return false;
      }
    }
    return true;
  }
  return false;
}

export function compareObject(a, b) {
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  // Compare the keys to ensure they are the same
  if (compareArray(aKeys, bKeys)) {
    let i = -1;
    let n = aKeys.length;
    while (++i < n) {
      if (!deepCompare(a[aKeys[i]], b[bKeys[i]])) {
        return false;
      }
    }
    return true;
  }
  return false;
}

export function deepCompare(a, b) {
  if (Array.isArray(a) && Array.isArray(b)) {
    return compareArray(a, b);
  } else if (
    // This is to get around a quirk where 'null' is an object
    a && b && typeof a === "object" && typeof b === "object") {
    return compareObject(a, b);
  }
  return a === b;
}