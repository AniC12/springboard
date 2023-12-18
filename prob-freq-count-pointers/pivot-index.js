// add whatever parameters you deem necessary

/**### **pivotIndex**

Write a function called ***pivotIndex*** which accepts an array of integers, 

and returns the pivot index where the sum of the items to the left equal to the sum of 

the items to the right. If there are more than one valid pivot index, return the smallest value. */
function pivotIndex(nums) {
    let rightSum = nums.reduce((a, b) => a + b, 0);
    let leftSum = 0;
    let pivotIdx = -1;
    for (let i = 0; i < nums.length; i++) {
        leftSum += nums[i];
        if (leftSum === rightSum) {
            pivotIdx = i;
            break;
        }
        rightSum -= nums[i];
    }
    return pivotIdx;
}
