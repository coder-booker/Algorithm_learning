/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
  // 1. 设置左右的最高
  // 2. 左右哪个比较低就优先移动哪个，因为水量是被左右的最低点限制的
  // 3. 持续监控水量，更新最大水量
  let [left, right] = [0, height.length-1];
  let volume = (right-left) * Math.min(height[left], height[right]);
  while ( left < right ) {
      if ( height[left] <= height[right] ) {
          ++left;
      } else {
          --right;
      }
      volume = Math.max(volume, (right-left) * Math.min(height[left], height[right]));
  }
  return volume;
};