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
 * @return {void} Do not return anything, modify root in-place instead.
 */
var flatten = function(root) {
  // // Method 1: recursion
  // if (root === null ) {
  //     return [];
  // }
  // var traverse = (root) => {
  //     if ( root === null ) {
  //         return null;
  //     }
  //     let left = traverse(root.left);
  //     let right = traverse(root.right);
  //     if ( left !== null && right !== null ) {
  //         let left_leaf = left;
  //         while ( left_leaf.right !== null ) {    // 递归返回后，left和right只会是题目指的链条了
  //             left_leaf = left_leaf.right;
  //         }
  //         left_leaf.right = right;
  //         root.right = left;
  //     } else if ( left !== null && right === null ) {    // redundant conditions for more clear demonstration
  //             root.right = left;
  //         }
  //     }
  //     root.left = null;
  //     return root;
  // };
  // return traverse(root);

  // Method 2: iteration
  let p = root;
  while ( p !== null ) {
      if ( p.left !== null ) {
          let left = p.left;
          let right = p.right;
          let left_leaf = left;
          while ( left_leaf.right !== null ) {
              left_leaf = left_leaf.right;
          }
          left_leaf.right = p.right;
          p.right = left;
          p.left = null;
      }
      p = p.right;
  }
  return root;
};