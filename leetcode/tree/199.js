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
 * @return {number[]}
 */
var rightSideView = function(root) {
  // Method 1: BFS 层序遍历
  if ( root === null ) {
      return [];
  }
  const result = [];
  const q = [root];
  while ( q.length > 0 ) {
      result.push(q[q.length-1].val);
      const temp = [...q];
      temp.forEach((element) => {    // 会无限循环吗？A: watch notes
          if ( element.left !== null ) {
              q.push(element.left);
          }
          if ( element.right !== null ) {
              q.push(element.right);
          }
          q.shift();
      });
  }
  return result;
};