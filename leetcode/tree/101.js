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
 * @return {boolean}
 */
var isSymmetric = function(root) {
  if ( root === null ) {
      return false;
  }
  let queue = [root.left, root.right];
  while ( queue.length !== 0 ) {
      if ( queue[0] !== null && queue[1] !== null ) {
          if ( queue[0].val !== queue[1].val ) {
              return false;
          }
          queue.push(queue[0].left);
          queue.push(queue[1].right);
          queue.push(queue[0].right);
          queue.push(queue[1].left);
      } else {
          if ( queue[0] !== null || queue[1] !== null ) {
              return false;
          }
      }
      queue.shift();
      queue.shift();
  }
  return true;
};