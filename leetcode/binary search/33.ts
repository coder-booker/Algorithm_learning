function search(nums: number[], target: number): number {
    // // Method 1: 用一个特殊的二分查找找到最大的数，然后就可以用二分查找+轮转数组找到target
    // const n = nums.length
    // let maxIdx = 0;
    // let left = 0;
    // let right = n - 1;
    // while ( left <= right ) {
    //     let mid = left + Math.floor((right - left)/2);
    //     if ( nums[mid+1] < nums[mid] || mid === n-1) {
    //         maxIdx = mid;
    //         break;
    //     } else if ( nums[mid] >= nums[left] ) { // >=是因为floor
    //         left = mid + 1;
    //     } else if ( nums[mid] < nums[left] ) {
    //         right = mid - 1;
    //     }
    // }
    // // console.log("maxFound");
    // left = 0;
    // right = n - 1;
    // let result = -1;
    // while ( left <= right ) {
    //     let mid = left + Math.floor((right - left)/2);
    //     let actualMid = (mid+maxIdx+1)%n;
    //     if ( nums[actualMid] === target ) {
    //         result = actualMid;
    //         break;
    //     } else if ( nums[actualMid] > target ) {
    //         right = mid - 1;
    //     } else if ( nums[actualMid] < target ) {
    //         left = mid + 1;
    //     }
    // }
    // return result;

    // Method 2: 直接融合进一个二分，因为现在是找target而非边界，一切简单了不少
    // 不是对比mid和target来分case，而是判断哪边有序，然后判断target在不在有序之间来作为选择下一层的条件
    const n = nums.length
    let left = 0;
    let right = n - 1;
    let result = -1;
    while ( left <= right ) {
        let mid = left + Math.floor((right - left)/2);
        if ( nums[mid] === target ) {
            result = mid;
            break;
        } else {
            if ( nums[left] <= nums[mid] ) { // 左侧有序
                if ( target < nums[mid] && target >= nums[left] ) { // 在左侧
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
            } else if ( nums[right] > nums[mid] ) { // 右侧有序
                if ( target > nums[mid] && target <= nums[right] ) { // 在右侧
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }
        }
    }

    return result;
};