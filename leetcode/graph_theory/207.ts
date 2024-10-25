// // DFS
// function canFinish(numCourses: number, prerequisites: number[][]): boolean {
//   // 用一个队列做回溯？差不多，就是递归遍历回溯，但需要预处理
//   // 预处理：建立成一个类似n叉树的结构
//   // visited记录？yes，用来避免冗余计算超时

//   // 建立 index为root，gaphTree[index]为所有子node的gaphTree
//   const graphTree: Array<number[]> = Array.from({length: numCourses}, () => []);
//   prerequisites.forEach((a_dep: number[]) => {
//       const [to, from] = a_dep;
//       graphTree[from].push(to);
//   })
//   console.log(graphTree);

//   // 记录递归堆栈路径，用数组idx哈希表方便查询
//   const onPath: boolean[] = Array.from({length: numCourses}, () => false);

//   // vistied
//   const visited: boolean[] = Array.from({length: numCourses}, () => false);

//   let hasCycle: boolean = false;

//   // 递归遍历子node
//   const traverse = ( rootIdx: number ): void => {
//       // 先判断有无环
//       if ( !hasCycle && onPath[rootIdx] ) {
//           hasCycle = true;
//           return;
//       }
//       // 然后再判断visited，不然所有环都会因为visited而无法被检测到
//       if ( hasCycle || visited[rootIdx] ) {
//           return;
//       }

//       visited[rootIdx] = true;
//       onPath[rootIdx] = true;
      
//       // 前序位置
//       graphTree[rootIdx].forEach((childIdx) => {
//           // 中序位置
//           traverse(childIdx);
//       })
//       // 后序位置

//       // 从path中剔除
//       onPath[rootIdx] = false;
//   }

//   for ( let i = 0; i < numCourses; ++i ) {
//       traverse(i);
//   }

//   return !hasCycle;
// };


// BFS
function canFinish(numCourses: number, prerequisites: number[][]): boolean {
    // 构建graphTree和inDegree
    const graphTree: Array<number[]> = Array.from({length: numCourses}, () => []);
    const inDegree: number[] = Array.from({length: numCourses}, () => 0);
    prerequisites.forEach((a_dep: number[]) => {
        const [to, from] = a_dep;

        graphTree[from].push(to);
        ++inDegree[to];
    })

    const q: number[] = []; // 存着下一个节点的index，也可以说是节点本身
    let count: number = inDegree.length;

    inDegree.forEach((indegree, i) => {
        if ( indegree === 0 ) q.push(i);
    })
    
    // BFS遍历
    while ( q.length > 0 ) {
        const size = q.length;
        for ( let i = 0; i < size; ++i ) {
            const nodeIdx = q.shift();
            graphTree[nodeIdx].forEach((next_node) => {
                // 每次都更新所有子节点的inDegree
                --inDegree[next_node];
                if ( inDegree[next_node] === 0 ) {
                    q.push(next_node);
                }
            })
        }
        count -= size;
        // 维护多一个表用来储存indegree为0的节点？维护一个count就行
        if ( count === 0 ) {
            return true;
        }
    }
    return false;
};
