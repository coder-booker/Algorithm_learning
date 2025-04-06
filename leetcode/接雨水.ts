function trap(height: number[]): number {
  const N = height.length;

  // 方法一：单调栈
  const monoStack: number[] = [];
  for ( let i = N-1; i >= 0; --i ) {
      if ( height[monoStack.at(-1)] > height[i] ) {
          continue;
      }
      monoStack.push(i);
  }
  let result: number = 0;
  let leftMaxIdx = 0;
  for ( let i = 0; i < N; ++i ) {
      let currentH = height[i];
      let rightMaxIdx = monoStack.at(-1);

      // 计算leftMax和rightMax最低那个得出高度，而每次循环的宽度都是1，由此得出面积
      let currentRainMax = Math.min(height[leftMaxIdx], height[rightMaxIdx]);
      result += Math.max(0, currentRainMax - currentH);

      // 判断更新leftMaxIdx
      leftMaxIdx = currentH > height[leftMaxIdx] ? i : leftMaxIdx;
      // 判断更新rightMaxIdx
      if ( currentH === height[rightMaxIdx] ) {
          monoStack.pop();
      }
  }
  return result;

  // 方法二：预计算
  // 方法三：双指针
};