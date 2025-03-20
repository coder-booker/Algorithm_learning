function combinationSum(candidates: number[], target: number): number[][] {
  // method1：暴力递归
  const n = candidates.length;
  const result: number[][] = [];
  const track: number[] = [];

  function backtrack(k): void {
      const sum = track.reduce((acc, item) => acc+item, 0);
      if ( sum === target ) {
          result.push([...track]);
          return;
      }
      if ( sum > target ) return;

      for ( let i = k; i < n; ++i ) {
          track.push(candidates[i]);
          backtrack(i);
          track.pop();
      }
  }
  backtrack(0);

  return result;


  // method2：dp
  // 定义dp[i]为组合成i的
};