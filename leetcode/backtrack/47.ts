function permuteUnique(nums: number[]): number[][] {
  nums.sort((a, b) => a-b);
  const N = nums.length;
  
  const result: number[][] = [];

  const track: number[] = [];
  const visited: boolean[] = Array(N).fill(false);
  function backtrack(depth: number) {
      if ( depth === N ) {
          result.push(track.slice());
          return;
      }
      
      for ( let i = 0; i < N; ++i ) {
          if ( visited[i] ) continue; // 回溯往下走的剪枝
          if ( i > 0 && nums[i-1] === nums[i] && !visited[i-1] ) { // 和前一个相同+前一个还没访问过+隐性条件i>0
              continue; 
          }
          track.push(nums[i]);
          visited[i] = true;
          backtrack(depth+1);
          visited[i] = false;
          track.pop();
      }
  }
  backtrack(0);

  return result;
}
