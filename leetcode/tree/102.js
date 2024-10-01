/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
  if ( !root ) return [];

  const queue = [root];
  const result = [];

  while ( queue.length ) {
      // 加入当前层
      result.splice(result.length, 0, queue.map(node => node.val));
      
      const layer_node_count = queue.length;
      for ( let i = 0; i < layer_node_count; ++i ) {
          const node = queue.shift();
          if ( node.left ) queue.push(node.left);
          if ( node.right ) queue.push(node.right);
      }
  };

  return result;
};