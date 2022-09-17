export function floorFraction(value, shift) {
  const arr = value.toString().split(".");
  arr[1] = arr[1].slice(0, shift);
  const newValue = arr.join(".");
  return parseFloat(newValue);
}
