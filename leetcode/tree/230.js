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
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function(root, k) {
  var result;
  var count = 0;
  var bruh = (root) => {
      if ( root === null ) {
          return;
      }
      bruh(root.left);
      
      if ( count <= k ) {
          count++;
      }
      if ( count === k ) {
          result = root.val;
      } else if ( count > k ) {
          return;
      }
      bruh(root.right);
  };
  bruh(root);
  return result;
};