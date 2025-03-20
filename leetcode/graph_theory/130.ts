/**
 Do not return anything, modify board in-place instead.
 */
 function solve(board: string[][]): void {
  // method 1: UF
  // class UF {
  //     private count: number;
  //     private parents: number[];
  //     private ranks: number[];

  //     constructor(n: number) {
  //         this.count = n;
          
  //         // 用index作为节点的唯一标识符
  //         this.parents = new Array(n);
  //         this.ranks = new Array(n);
  //         for ( let i = 0; i < n; ++i ) {
  //             this.ranks[i] = 1;
  //             this.parents[i] = i
  //         }
  //     }

  //     public union(p: number, q: number): void {
  //         const rootP = this.find(p);
  //         const rootQ = this.find(q);
  //         if ( rootP === rootQ ) return;

  //         // 小的树接上大的，且更新树高度，注意对比的是树高度而非子节点数量
  //         // 由于union一定会先触发find，而find会自动进行路径压缩，所以树的合并可以简化
  //         if ( this.ranks[rootP] >= this.ranks[rootQ] ) {
  //             this.parents[rootQ] = rootP;
  //             if ( this.ranks[rootP] == this.ranks[rootQ] ) { // 考察树高度的变化逻辑，发现只有两者高度一致时且不为同一颗树时，才会让合并后的树高度+1，否则最多与较高的树高度相同
  //                 this.ranks[rootP]++;
  //             }
  //         } else {
  //             this.parents[rootP] = rootQ;
  //             if ( this.ranks[rootP] == this.ranks[rootQ] ) { // 考察树高度的变化逻辑，发现只有两者高度一致时且不为同一颗树时，才会让合并后的树高度+1，否则最多与较高的树高度相同
  //                 this.ranks[rootQ]++;
  //             }
  //         }

  //         // 更新count
  //         this.count--;
  //     }
      
  //     // 返回根节点的index，或者说唯一标识符就行
  //     public find(p: number): number {
  //         // 路径压缩：将查找路径上的所有节点的父节点都直接指向根节点
  //         // 根节点的值一定是其默认值
  //         const parent = this.parents[p];
  //         if ( parent === p ) {
  //             return parent;
  //         } else {
  //             this.parents[p] = this.find(parent);
  //             return this.parents[p];
  //         }
  //     }

  //     public isConnected(p: number, q: number): boolean {
  //         return this.find(p) === this.find(q);
  //     }

  //     public getCount(): number {
  //         return this.count;
  //     }

  //     public getGroups(): {[key: number]: number[]} {
  //         let groups: {[key: number]: number[]} = {}

  //         // 这里遍历出来就行，union的过程中慢慢建立其实复杂度一样
  //         this.parents.forEach((parent, i) => {
  //         const root = this.find(parent);
  //         if ( !groups.hasOwnProperty(root) ) {
  //             groups[root] = [i]
  //         } else {
  //             groups[root].push(i);
  //         }
  //         })

  //         return groups;
  //     }
  // }

  // // 逆向思维
  // // 用一个不会被访问到的dummy root来保存绝对不会被围绕的联通分量，这样剩下的分量就一定是被围绕的
  // // 所以要优先union这些分量
  // if ( board.length <= 2 ) {
  //     return;
  // }

  // const height = board.length;
  // const width = board[0].length;
  // const size = height * width;

  // // 初始化uf
  // const uf = new UF(size + 1);    // 留一位给dummy
  // const dummyNode = height * width;

  // // 方向数组
  // const d = [
  //     [0, 1],
  //     [1, 0],
  //     [0, -1],
  //     [-1, 0],
  // ]

  // // 遍历边缘，即非围绕区域
  // // 左右
  // for ( let y = 0; y < height; ++y ) {
  //     if ( board[y][0] === "O" ) {
  //         uf.union(dummyNode, y*width); // left
  //     }
  //     if ( board[y][width-1] === "O" ) {
  //         uf.union(dummyNode, y*width + width - 1); // right
  //     }
  // }

  // // 上下
  // for ( let x = 0; x < width; ++x ) {
  //     if ( board[0][x] === "O" ) {
  //         uf.union(dummyNode, x); // top
  //     }
  //     if ( board[height-1][x] === "O" ) {
  //         uf.union(dummyNode, (height-1)*width + x); // bottom
  //     }
  // }


  // // 遍历全图
  // for ( let y = 1; y < height-1; ++y ) {
  //     for ( let x = 1; x < width-1; ++x ) {
  //         if ( board[y][x] === "O" ) {
  //             for ( let k = 0; k < 4; ++k ) {
  //                 const nx = x + d[k][0];
  //                 const ny = y + d[k][1];
                  
  //                 // if ( nx >= width || nx < 0 || ny >= height || ny < 0 ) continue;
  //                 if ( board[ny][nx] === "O" ) {
  //                     uf.union(y*width+x, ny*width+nx);
  //                 }
  //             }
  //         }
  //     }
  // }

  // // 改O为X，即标注是否围绕
  // for ( let y = 1; y < height-1; ++y ) {
  //     for ( let x = 1; x < width-1; ++x ) {
  //         // console.log(uf.isConnected(dummyNode, y*width+x))
  //         if ( !uf.isConnected(dummyNode, y*width+x) ) {
  //             board[y][x] = "X";
  //         }
  //     }
  // }


  // method 2: 从边缘开始遍历
  
  const height = board.length;
  const width = board[0].length;

  // 方向数组
  const d = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
  ]

  // 遍历全图
  function traverse(x: number, y: number): void {
      if ( x >= width || x < 0 || y >= height || y < 0 || board[y][x] === "X" || board[y][x] === "A" ) return;

      board[y][x] = "A";
      
      for ( let k = 0; k < 4; ++k ) {
          traverse(x + d[k][0], y + d[k][1]);
      }
  }

  // 遍历边缘
  // 左右边
  for ( let y = 0; y < height; ++y ) {
      traverse(0, y);
      traverse(width-1, y);
  }
  // 上下边
  for ( let x = 0; x < width; ++x ) {
      traverse(x, 0);
      traverse(x, height-1);
  }

  for ( let y = 0; y < height; ++y ) {
      for ( let x = 0; x < width; ++x ) {
          if ( board[y][x] === "O" ) {
              board[y][x] = "X";
          } else if ( board[y][x] === "A" ) {
              board[y][x] = "O";
          }
      }
  }
};
