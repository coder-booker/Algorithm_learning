class UF {
  private count: number;      // 整张图有多少集合
  private parents: number[];  // 每个节点属于哪个集合
  private ranks: number[];    // 最大集合的深度

  constructor(n: number) {
    this.count = n;
    
    // 用index作为节点的唯一标识符
    this.parents = new Array(n);
    this.ranks = new Array(n);
    for ( let i = 0; i < n; ++i ) {
      this.ranks[i] = 1;
      this.parents[i] = i
    }
  }

  // 把两个节点接起来，注意也代表把两个集合合并。O(1)
  public union(p: number, q: number): void {
    const rootP = this.find(p);
    const rootQ = this.find(q);
    if ( rootP === rootQ ) return;

    // 小的树接上大的，且更新树高度，注意对比的是树高度而非子节点数量
    // 由于union一定会先触发find，而find会自动进行路径压缩，所以树的合并可以简化
    if ( this.ranks[rootP] >= this.ranks[rootQ] ) {
      this.parents[rootQ] = rootP;
      if ( this.ranks[rootP] == this.ranks[rootQ] ) { // 考察树高度的变化逻辑，发现只有两者高度一致时且不为同一颗树时，才会让合并后的树高度+1，否则最多与较高的树高度相同
        this.ranks[rootP]++;
      }
    } else {
      this.parents[rootP] = rootQ;
      if ( this.ranks[rootP] == this.ranks[rootQ] ) { // 考察树高度的变化逻辑，发现只有两者高度一致时且不为同一颗树时，才会让合并后的树高度+1，否则最多与较高的树高度相同
        this.ranks[rootQ]++;
      }
    }

    // 更新count
    this.count--;
  }
  
  // 返回p所在集合的唯一标识符
  public find(p: number): number {
    // 路径压缩：将查找路径上的所有节点的父节点都直接指向根节点
    // 根节点的值一定是其默认值
    const parent = this.parents[p];
    if ( parent === p ) {
      return parent;
    } else {
      this.parents[p] = this.find(parent);
      return this.parents[p];
    }
  }

  public isConnected(p: number, q: number): boolean {
    return this.find(p) === this.find(q);
  }

  public getCount(): number {
    return this.count;
  }

  public getGroups(): {[key: number]: number[]} {
    let groups: {[key: number]: number[]} = {}

    // 这里遍历出来就行，union的过程中慢慢建立其实复杂度一样
    this.parents.forEach((parent, i) => {
      const root = this.find(parent);
      if ( !groups.hasOwnProperty(root) ) {
        groups[root] = [i]
      } else {
        groups[root].push(i);
      }
    })

    return groups;
  }

}

function testUF() {
  console.log("bruh")

  const graph: number[][] = [];
  graph.push([0, 0, 1])
  graph.push([0, 0, 1])
  graph.push([1, 1, 1])

  const height = graph.length
  const width = graph[0].length
  const n = height * width;
  console.log(height, width, n)
  
  // 方向数组
  const d: Array<[number, number]> = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ]; 
  const testUF = new UF(n);

  for ( let y = 0; y < height; ++y ) {
    for ( let x = 0; x < width; ++x ) {
      if ( graph[y][x] === 1 ) {
        for ( let k = 0; k < 4; ++k ) {
          const ny = y+d[k][1];
          const nx = x+d[k][0];
          if ( ny >= height || ny < 0 || nx >= width || nx < 0 ) {
            continue;
          }
  
          // console.log(ny, nx)
          if ( graph[ny][nx] === 1 ) {
            testUF.union(
              y*width + x, 
              (ny)*width + (nx),
            );
          }
        }
      }
    }
  }
  console.log(testUF.getGroups())
}

// 记得在配置好的CodeLearning test里运行
testUF();
