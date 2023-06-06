function countZeroes(array) {
    let leftIdx = 0;
    let rightIdx = array.length - 1;
    let midIdx = Math.floor((leftIdx + rightIdx) / 2);

    while (leftIdx < rightIdx) {
        if (array[midIdx] === 0) {
            rightIdx = midIdx - 1;
            midIdx = Math.floor((leftIdx + rightIdx) / 2);
        } else {
            leftIdx = midIdx + 1;
            midIdx = Math.floor((leftIdx + rightIdx) / 2);
        }
    }

    if (array[midIdx] === 0) {
        return array.length - midIdx;
    }

    return array.length - midIdx - 1;

}


module.exports = countZeroes