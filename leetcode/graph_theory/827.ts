function largestIsland(grid: number[][]): number {
  // 用原地的算法，以2为起始标记岛屿，避免维护visited数组

  const scanOneIsland = (i: number, j: number): number => {
      if ( i < 0 || i >= rowNum || j < 0 || j >= colNum || grid[i][j] !== 1 ) {
          return 0;
      }
  
      grid[i][j] = islandIndex;

      // 上右下左
      return 1 + 
          scanOneIsland(i+1, j) +
          scanOneIsland(i, j+1) +
          scanOneIsland(i-1, j) +
          scanOneIsland(i, j-1);
  }

  const rowNum = grid.length;
  const colNum = grid[0]?.length || 0;
  let islandIndex = 2;
  const islandsArea: number[] = [0, 0]; // 用来弥补0和1的岛屿索引的缺失

  for ( let i: number = 0; i < rowNum; ++i ) {
      for ( let j: number = 0; j < colNum; ++j ) {
          if ( grid[i][j] === 1 ) {
              islandsArea.push(scanOneIsland(i, j));
              ++islandIndex;
          }
      }
  }
  let maxArea = islandsArea[2] || 0;

  // 遍历海水获得最有价值的格子
  for ( let i: number = 0; i < rowNum; ++i ) {
      for ( let j: number = 0; j < colNum; ++j ) {
          if ( grid[i][j] === 0 ) {
              // 相同岛屿去重
              const adjacentIsland = new Set([
                  i+1 < rowNum ? grid[i+1][j] : 0, 
                  j+1 < colNum ? grid[i][j+1] : 0, 
                  i-1 >= 0 ? grid[i-1][j] : 0, 
                  j-1 >= 0 ? grid[i][j-1] : 0, 
              ])
              // 四周岛屿面积相加
              let adjacentArea = 0;
              adjacentIsland.forEach((islandIdx) => {
                  adjacentArea += islandsArea[islandIdx];
              })
              // 判断maxArea
              maxArea = Math.max(maxArea, 1 + adjacentArea);
          }
      }
  }
  return maxArea;

};