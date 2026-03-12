function lengthOfLIS(nums: number[]): number {
  // 单调栈没办法，因为是‘最长’子序列

  const n = nums.length;
  // dp，i 位置结尾的最长子序列的长度
  const dp: number[] = Array(n).fill(1);
  let result = 1;

  for (let i = 0; i < n; ++i) {
    for (let j = 0; j < i; ++j) {
      // 1. j 位置的 > i 位置的，i 位置的 dp 值+1
      if (nums[j] < nums[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
        result = Math.max(dp[i], result);
      }
    }
  }

  return result;
};