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


module.exports = findFloor