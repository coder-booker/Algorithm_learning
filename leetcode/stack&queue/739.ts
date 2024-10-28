function dailyTemperatures(temperatures: number[]): number[] {
  // 用单调栈存元素idx
  const n: number = temperatures.length;
  const monoStackIdx: number[] = [];
  const result: number[] = new Array(n);

  // 构建单调栈很重要的一点就是倒过来遍历原数组
  for ( let i = n-1; i >= 0; --i ) {
      const num = temperatures[i];
      while ( monoStackIdx.length > 0 && num >= temperatures[monoStackIdx[monoStackIdx.length-1]] ) {
          monoStackIdx.pop();
      }
      result[i] = monoStackIdx.length > 0 ? monoStackIdx[monoStackIdx.length-1]-i : 0;
      monoStackIdx.push(i);
  }
  return result;
};