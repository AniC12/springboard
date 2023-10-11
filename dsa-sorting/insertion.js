function insertionSort(array) {
    for (let i = 0; i < array.length; i++) {
        let currentValue = array[i];

        for (let j = i - 1; j > -1 && array[j] > currentValue; j--) {
            array[j + 1] = array[j];
        }

        array[i + 1] = currentValue;
    }

    return array;
}

module.exports = insertionSort;