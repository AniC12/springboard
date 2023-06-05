function findRotatedIndex(array, num) {
    
    let leftIdx = 0;
    let rightIdx = array.length - 1;
    let midIdx = Math.floor((leftIdx + rightIdx) / 2);

    if (array[0] > num) {
        leftIdx = midIdx + 1;
        midIdx = Math.floor((leftIdx + rightIdx) / 2);
    } else {
        rightIdx = midIdx;
        midIdx = Math.floor((leftIdx + rightIdx) / 2);
    }

    while (leftIdx < rightIdx) {
        if (array[midIdx] === num) {
            return midIdx;
        } else if (array[midIdx] > num) {
            rightIdx = midIdx - 1;
            midIdx = Math.floor((leftIdx + rightIdx) / 2);
        } else {
            leftIdx = midIdx + 1
            midIdx = Math.floor((leftIdx + rightIdx) / 2);
        }
    }

    if (array[midIdx] === num) {
        return midIdx;
    }

    return -1;
}

console.log(findRotatedIndex([3, 4, 1, 2], 4))
console.log(findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 8))
console.log(findRotatedIndex([6, 7, 8, 9, 1, 2, 3], 3))
console.log(findRotatedIndex([37, 44, 66, 102, 10, 22], 14))
console.log(findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 12))
//module.exports = findRotatedIndex