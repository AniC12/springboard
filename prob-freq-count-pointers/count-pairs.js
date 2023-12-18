// add whatever parameters you deem necessary

/*### **countPairs**

Given an array of integers, and a number, find the number of pairs of integers

in the array whose sum is equal to the second parameter. You can assume that there will be 

no duplicate values in the array. */

function countPairs(array, num) {
    array.sort(function(a, b){return a - b});

    let left = 0;
    let right = array.length - 1;
    let count = 0;

    while (left < right) {
        if (array[left] + array[right] > num) {
            right--;
        } else if (array[left] + array[right] < num) {
            left++;
        } else {
            right--;
            left++;
            count++;
        }
    }

    return count;
}

