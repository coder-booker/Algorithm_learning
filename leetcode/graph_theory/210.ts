// DFS
function findOrder(numCourses: number, prerequisites: number[][]): number[] {
  const graphTree: Array<number[]> = Array.from({length: numCourses}, () => []);
  prerequisites.forEach((a_dep: number[]) => {
      const [to, from] = a_dep;
      graphTree[from].push(to);
  })
  // console.log(graphTree);

  // 为了检测环
  const onPath: boolean[] = Array.from({length: numCourses}, () => false);

  // 为了减少冗余计算
  const visited: boolean[] = Array.from({length: numCourses}, () => false);

  let hasCycle: boolean = false;

  // 反向最终结果
  const postOrder: number[] = [];

  const traverse = (rootIdx: number): void => {
      if ( !hasCycle && onPath[rootIdx] ) {
          hasCycle = true;
          return;
      }
      if ( visited[rootIdx] || hasCycle ) return;
      onPath[rootIdx] = true;
      visited[rootIdx] = true;

      for ( let childIdx of graphTree[rootIdx] ) {
          traverse(childIdx);
      }
      postOrder.push(rootIdx);
      onPath[rootIdx] = false;
  }

  for ( let i = 0; i < numCourses; ++i ) {
      traverse(i);
  }
  if ( hasCycle ) return [];


  return postOrder.reverse();
  // 为什么postOrder一定是正确的顺序的reverse，或者说一定昭示着正确顺序？
  // 首先我们的graphTree的哈希指向的是子节点，而递归一定会指向最最底的子节点，后序遍历必定是没有子节点的节点优先。
  // 然后对于没有连接的两棵树，他们会分开完成递归，看似混乱且会影响最终正确顺序。实际上他们谁先谁后都成立。
  // 因为正确的顺序不止一种，postOrder其实只是可行的一种，具体是哪一种其实只取决于循环的顺序。
  // 最后用onPath判断环，visited来解决冗余递归，搞定。
};

// BFS
function findOrder(numCourses: number, prerequisites: number[][]): number[] {
    // 构建graphTree和inDegree
    const graphTree: Array<number[]> = Array.from({length: numCourses}, () => []);
    const inDegree: number[] = Array.from({length: numCourses}, () => 0);
    prerequisites.forEach((a_dep: number[]) => {
        const [to, from] = a_dep;

        graphTree[from].push(to);
        ++inDegree[to];
    })

    const q: number[] = []; // 存着下一个节点的index，也可以说是节点本身

    inDegree.forEach((indegree, i) => {
        if ( indegree === 0 ) q.push(i);
    })

    const result: number[] = [];
    
    // BFS遍历
    while ( q.length > 0 ) {
        const size = q.length;
        for ( let i = 0; i < size; ++i ) {
            const nodeIdx = q.shift();
            result.push(nodeIdx);
            graphTree[nodeIdx].forEach((next_node) => {
                // 每次都更新所有子节点的inDegree
                --inDegree[next_node];
                if ( inDegree[next_node] === 0 ) {
                    q.push(next_node);
                }
            })
        }
    }
    if ( result.length !== numCourses ) return [];
    return result;

};