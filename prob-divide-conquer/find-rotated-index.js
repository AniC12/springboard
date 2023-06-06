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

module.exports = findRotatedIndex