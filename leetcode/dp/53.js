/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
  // // Method 1: double pointer
  // let left = 0; 
  // let right = 0;
  // let win_sum = nums[0];
  // let result = win_sum;
  // while ( right < nums.length ) {
  //     result = Math.max(result, win_sum);
  //     if ( win_sum < 0 && left < right ) {    // if left === right, win_sum 自然=0
  //         win_sum -= nums[left];
  //         ++left;
  //     } else if ( nums[left] < 0 && left < right ) {
  //         win_sum -= nums[left];
  //         ++left;
  //     } else {
  //         ++right;
  //         win_sum += nums[right];
  //     }
  // }

  // return result;
  
  // Method 2: dp
  const dp = [-10001];
  let result = dp[0];
  nums.forEach((element, index) => {
      dp.push(Math.max(element, element+dp[index]));
      result = Math.max(result, dp[index+1]);
  });
  return result;
};