/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function(nums, k) {
  // 连续子数组，长度随机，但我们需要判断arr_sum和k的差
  // 目前的思路是dp，那么dp[i+1]就是以nums[i]结尾的数组的和，以此找任意nums[i]的k-arr_sum
  // 因此需要一个dp记录，一个hash来记录dp[i]等于k-arr_sum的count
  // 是不是都不需要dp? 还是需要一下，来计算sum
  const dp = [0];
  let h = new Map();
  h.set(0, 1) // 为了让所有前缀和直接等于k的数组能够被加上。因此也可以直接用多加一个判断这个情况时的if来手动加1
  let count = 0;

  nums.forEach((num, i) => {
      dp.push(dp[i] + num);

      let diff = dp[i+1]-k;
      count += h.has(diff) ? h.get(diff) : 0;
      
      if ( h.has(dp[i+1]) ) {
          h.set(dp[i+1], h.get(dp[i+1])+1);
      } else {
          h.set(dp[i+1], 1);
      }
  })
  return count;
};