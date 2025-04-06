function maxSubArray(nums: number[]): number {
  let prefix = 0;
  let maxSum = -Infinity; // 持续判断最大值
  let leftMin = 0;        // 从index=0开始的最小的子数组和，不会超过0，用来处理prefix < 0的情况
  for ( let i = 0; i < nums.length; ++i ) {
      prefix += nums[i];
      maxSum = Math.max(maxSum, prefix, prefix-leftMin);  // 对比prefix、prefix-leftMin来更新maxSum
      leftMin = Math.min(leftMin, prefix);
  }
  return maxSum;
};