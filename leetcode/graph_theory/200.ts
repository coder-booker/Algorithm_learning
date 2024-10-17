function numIslands(grid: string[][]): number {
  // 1. 遍历每个网格
  // 2. 每踏上一个岛就回溯遍历其占领的所有网格，并把这些网格标记为第一步可以跳过的网格
  // 如此，相连的网格不会被识别为岛多次
  const scanOneIsland = (i: number, j: number) => {
      if ( i < 0 || i >= rowNum || j < 0 || j >= colNum || grid[i][j] === '0' ) {
          return;
      }
  
      grid[i][j] = '0';

      // 上右下左
      scanOneIsland(i+1, j);
      scanOneIsland(i, j+1);
      scanOneIsland(i-1, j);
      scanOneIsland(i, j-1);
  }

  let count: number = 0;
  const rowNum: number = grid?.length || 0;
  const colNum: number = grid[0]?.length || 0;
  
  for ( let i: number = 0; i < rowNum; ++i ) {
      for ( let j: number = 0; j < colNum; ++j ) {
          if ( grid[i][j] === '1' ) {
              ++count;
              scanOneIsland(i, j);
          }
      }
  }
  // console.log(visited)
  return count;
};