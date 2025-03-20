function searchMatrix(matrix: number[][], target: number): boolean {
  // // Method 1: 模数轮转+二分查找
  // const h = matrix.length;
  // const w = matrix[0].length;
  // const hw = h*w;

  // function bs(): boolean {
  //     let left = 0;
  //     let right = hw - 1;
  //     while ( left <= right ) {
  //         let mid = left + Math.floor((right - left)/2);
  //         let y = Math.floor(mid/w);
  //         let x = mid % w;
  //         if ( matrix[y][x] === target ) {
  //             return true;
  //         } else if ( matrix[y][x] > target ) {
  //             right = mid-1;
  //         } else if ( matrix[y][x] < target ) {
  //             left = mid+1;
  //         }
  //     }
  //     return false;
  // }

  // return bs();

  // Method 2: 两次二分查找，但需要边界查询
  const h = matrix.length;
  const w = matrix[0].length;

  let left = 0;
  let right = h - 1;
  while ( left <= right ) {
      let mid = left + Math.ceil((right - left)/2);
      if ( matrix[mid][0] === target ) {
          left = mid+1;
      } else if ( matrix[mid][0] > target ) {
          right = mid-1;
      } else if ( matrix[mid][0] < target ) {
          left = mid+1;
      }
  }
  if ( right < 0 ) {
    return false;
  }
  let resultY: number = right;

  left = 0;
  right = w - 1;
  while ( left <= right ) {
      let mid = left + Math.floor((right - left)/2);
      if ( matrix[resultY][mid] === target ) {
          return true;
      } else if ( matrix[resultY][mid] > target ) {
          right = mid-1;
      } else if ( matrix[resultY][mid] < target ) {
          left = mid+1;
      }
  }

  return false;
};