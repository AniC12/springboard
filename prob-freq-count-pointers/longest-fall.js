// add whatever parameters you deem necessary

/**
 ### **longestFall**

Write a function called ***longestFall***, which accepts an array of integers, 

and returns the length of the longest consecutive decrease of integers.
 */
function longestFall(nums) {
    let counter = 1;
    let maxCounter = 0;

    if (nums.length === 0) {
        return 0;
    }

    for (let i = 1; i < nums.length; i++) {
        if (nums[i] < nums[i - 1]) {
            counter++;
            maxCounter = Math.max(counter, maxCounter);
        } else {
            counter = 1;
        }
    }

    return maxCounter || 1;
}
