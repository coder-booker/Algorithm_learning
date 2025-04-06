function threeSum(nums: number[]): number[][] {
  nums.sort((a, b) => a-b);
  // console.log(nums);
  const n = nums.length;
  const result: [number, number, number][] = [];
  for (let i = 0; i < n; ++i) {
      let k = n-1;    // k必须在第一层重置，虽然i只会往右移动，但理论上只会更小的只是num[j]+num[k]，而不是num[k]，也就是可能出现前几次numij要求的k小于后几次要求的k，因此k需要重置。
      // i 去重
      // i = 0不去重，之后才开始去重
      if ( i > 0 && i < n && nums[i-1] === nums[i] ) continue;
      for ( let j = i+1; j < n; ++j ) {
          // j 去重
          // j-1 = i不去重，之后才开始去重
          if ( j-1 > i && j < n && nums[j-1] === nums[j] ) continue;
          const num12 = nums[i] + nums[j];
          // 移动右指针。k不需要去重，因为j已经去重了、同一个jk组合只会判断一次，且j有可能遍历到和k一样的元素
          while ( k > j && num12 + nums[k] > 0 ) {
              --k;
          }
          if ( k <= j ) break;
          // 检查k停下的是不是目标
          if ( num12 + nums[k] === 0 ) {
              result.push([nums[i], nums[j], nums[k]]);
          }
      }
  }
  return result;
};