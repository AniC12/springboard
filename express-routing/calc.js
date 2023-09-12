// 1. mean (average)
function findMean(nums) {
    if (nums.length === 0) return 0;
    const mean = nums.reduce((acc, num) => acc + num, 0) / nums.length;

    return mean;
}

// 2. median (midpoint)
function findMedian(nums) {
    nums.sort((a, b) => a - b);

    let middleIndex = Math.floor(nums.length / 2);
    let median;

    if (nums.length % 2 === 0) {
        median = (nums[middleIndex] + nums[middleIndex - 1]) / 2;
    } else {
        median = nums[middleIndex];
    }

    return median;
}

// 3. mode (most frequent)
function findMode(nums) {
    let numCounts = {};
    let mode;
    let maxCount = 0;

    nums.forEach(num => {
        numCounts[num] = (numCounts[num] || 0) + 1;
    });

    for (let num in numCounts) {
        if (numCounts[num] > maxCount) {
            mode = num;
            maxCount = numCounts[num];
        }
    }

    return mode;
}

module.exports = {
    findMean,
    findMedian,
    findMode
};