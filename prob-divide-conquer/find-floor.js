function findFloor(array, val) {
    let leftIdx = 0;
    let rightIdx = array.length - 1;
    let midIdx = Math.floor((leftIdx + rightIdx) / 2);

    while (leftIdx < rightIdx) {
        if (array[midIdx] === val) {
            return array[midIdx];
        } else if (array[midIdx] > val) {
            rightIdx = midIdx - 1;
            midIdx = Math.floor((leftIdx + rightIdx) / 2);
        } else {
            leftIdx = midIdx + 1
            midIdx = Math.floor((leftIdx + rightIdx) / 2);
        }
    }

    if ((array[midIdx] <= val))  {
        return array[midIdx];
    } else {
        return -1;
    }

   
}

console.log(findFloor([1, 2, 8, 10, 10, 12, 19], 9))
console.log(findFloor([1, 2, 8, 10, 10, 12, 19], 20))
console.log(findFloor([1, 2, 8, 10, 10, 12, 19], 0))
console.log(findFloor([1, 2, 8, 10, 10, 12], 4))




//module.exports = findFloor