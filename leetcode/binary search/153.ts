function findMin(nums: number[]): number {
  let left = 0; 
  let right = nums.length - 1;
  let result = Infinity;
  while ( left <= right ) {
      let mid = left + Math.floor((right - left)/2);
      if ( nums[mid] < result ) result = nums[mid];

      if ( Math.min(nums[left], nums[mid]) < Math.min(nums[mid+1], nums[right]) ) {
          right = mid - 1;
      } else {
          left = mid + 1;
      }
  }
  return result;
};