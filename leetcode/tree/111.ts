/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function minDepth(root: TreeNode | null): number {
  if ( !root ) return 0;

  const queue: TreeNode[] = [root];
  let depth = 1;
  // 层级遍历，while每次loop都是新的一层，因此要在里面再套一层loop来进行层内遍历
  while ( queue.length > 0 ) {
      const size = queue.length;
      // 取出一层
      // 读取下面的子节点
      for ( let i = 0; i < size; ++i ) {
          const node: TreeNode = queue.shift();
          // 检测是否结束
          if ( !node.left && !node.right ) return depth;
          if ( node.left ) queue.push(node.left);
          if ( node.right ) queue.push(node.right);
      };
      // depth自增
      ++depth;
  }
  return depth;
};