export default function updateUniqueItems(map) {
  const list = map;
  if (!(list instanceof Map)) throw Error('Cannot process');
  list.forEach((x, y) => {
    if (x === 1) list.set(y, 100);
  });

  return list;
}
