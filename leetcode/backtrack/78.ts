function subsets(nums: number[]): number[][] {  // 以nums[0]为leadingChar，剩下的用来遍历
  let result: number[][] = [];
  const n = nums.length;

  function backtrack(recurVar: number, track: number[]): void {
      // recurVar为i的起始，因此不需要其他终止模块

      // 数据获取模块
      result.push([...track]);

      // 获得分支，向下继续递归
      for ( let i = recurVar; i < n; ++i ) {
          // 添加选择
          track.push(nums[i]);
          // 分支
          backtrack(i+1, track);
          // 撤销选择
          track.pop();
      }
  }

  let track = []
  backtrack(0, track);

  return result;
};
