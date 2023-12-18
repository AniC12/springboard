// add whatever parameters you deem necessary

/* ### **averagePair**

Write a function called ***averagePair***. Given a sorted array of integers and a target average, determine if there is a pair of values in the array where the 

average of the pair equals the target average. There may be more than one pair that matches the average target.

**Constraints**:

Time Complexity: O(N) */

function averagePair(sortedArray, target) {

    let left = 0;
    let right = sortedArray.length - 1;

    while (left < right) {
        if ((sortedArray[left] + sortedArray[right]) / 2 === target) {
            return true;
        } else if ((sortedArray[left] + sortedArray[right]) / 2 > target) {
            right--;
        } else {
            left ++;
        }
    }

    return false;
}

