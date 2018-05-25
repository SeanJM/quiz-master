function getKeyValues(paths, path, value) {
  if (!Array.isArray(value) && typeof value === "object" && value) {
    for (var k in value) {
      if (value.hasOwnProperty(k)) {
        getKeyValues(paths, path.concat(k), value[k]);
      }
    }
  } else {
    path.push(value);
    paths.push(path);
  }
}

export default function getPaths(object) {
  const paths = [];
  getKeyValues(paths, [], object);
  return paths;
}