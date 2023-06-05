function findRotationCount(array) {
    let leftIdx = 0;
    let rightIdx = array.length - 1;
    let midIdx = Math.floor((leftIdx + rightIdx) / 2);

    if (array[leftIdx] < array[rightIdx]) {
        return 0;
    }

    while (leftIdx < rightIdx) {
        midIdx = Math.floor((leftIdx + rightIdx) / 2);
        if (array[midIdx] > array[leftIdx]) {
            leftIdx = midIdx + 1;
        } else {
            rightIdx = midIdx;
        }
    }
    
    if (midIdx === 0 || array[midIdx] > array[midIdx - 1]) {
        return midIdx + 1;
    }
    return midIdx;
}

console.log(findRotationCount([15, 18, 2, 3, 6, 12]));
console.log(findRotationCount([7, 9, 11, 12, 5]));
console.log(findRotationCount([7, 9, 11, 12, 15]));
console.log(findRotationCount([18, 2, 3, 6, 12]));


//module.exports = findRotationCount