// add whatever parameters you deem necessary
/*Write a function called sameFrequency. Given two positive integers, 

find out if the two numbers have the same frequency of digits. */

function sameFrequency(int1, int2) {

    let frequency1 = new Map();
    let frequency2 = new Map();

    while (int1 > 0) {
        let digit = int1 % 10;
        int1 = Math.trunc(int1 / 10);

        let digitCount = frequency1.get(digit) || 0;
        frequency1.set(digit, digitCount + 1);
    }

    while (int2 > 0) {
        let digit = int2 % 10;
        int2 = Math.trunc(int2 / 10);

        let digitCount = frequency2.get(digit) || 0;
        frequency2.set(digit, digitCount + 1);
    }

    for (const key of frequency1.keys()) {
        if (!frequency2.has(key) || (frequency1.get(key) !== frequency2.get(key))) {
            return false;
        }
    }

    return true;
}
