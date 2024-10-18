function orangesRotting(grid: number[][]): number {
  // 从广度优先的角度来说，每个时间中多出来的腐烂橘子都是同一层的
  // 因此执行多源广度优先算法
  // 每单位时间遍历所有同层的腐烂橘子的四周

  const [m, n] = [grid.length, grid[0]?.length || 0];
  let time: number = 0;
  let cntFresh = 0;
  const queue: Array<Array<number[]>> = [];

  // 初始化第一层，并计算新鲜橘子数量
  const firstLayer: Array<number[]> = [];
  for ( let i = 0; i < m; ++i ) {
      for ( let j = 0; j < n; ++j ) {
          switch (grid[i][j]) {
              case 2:
                  firstLayer.push([i, j]);
                  break;
              case 1:
                  ++cntFresh;
                  break;
              case 0: 
              default:
          }
      }
  }
  if ( cntFresh === 0 ) {
      return 0;
  }
  queue.push(firstLayer);

  
  while ( queue.length > 0 ) {
      
      const nextLayer: Array<number[]> = [];
      
      // 开始腐蚀
      const layer: Array<number[]> = queue.shift();
      while ( layer.length > 0 ) {
          const [i, j] = layer.shift();
          // 腐蚀上下左右
          [[i+1, j], [i, j+1], [i-1, j], [i, j-1]].forEach((coor) => {
              switch (grid[coor[0]] && grid[coor[0]][coor[1]] || 0) {
                  // case 0: // 岛屿边界/图边界
                  // case 2: // 遇到了腐蚀说明是已经被加入queue或者处理过的，不用理会
                  //     break;
                  case 1: // 腐蚀并加入下一层
                      nextLayer.push(coor);
                      grid[coor[0]][coor[1]] = 2;
                      --cntFresh;
                      break;
                  default:
              }
          })
      }
      if ( nextLayer.length > 0 ) {
          queue.push(nextLayer);
          ++time; // 因为我的逻辑是下一层没有东西才停，而这会在全图都是烂橘子是额外花一个loop，因此++time包在这里
      }
  }

  if ( cntFresh > 0 ) {
      return -1;
  }
  return time;
};