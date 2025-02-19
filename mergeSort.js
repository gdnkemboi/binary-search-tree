export default function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  let mid = arr.length / 2;
  let left_half = arr.slice(0, mid);
  let right_half = arr.slice(mid);
  left_half = mergeSort(left_half);
  right_half = mergeSort(right_half);
  return merge(left_half, right_half);
}

function merge(left, right) {
  let result = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  result = result.concat(left.slice(i));
  result = result.concat(right.slice(j));

  return result;
}
