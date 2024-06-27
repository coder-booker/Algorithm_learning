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
 * @return {TreeNode}
 */
var invertTree = function(root) {
  // // Method 1: preorder
  // const traverse = (root) => {
  //     const temp = root.left;
  //     root.left = root.right;
  //     root.right = temp;
  //     if ( root.left !== null ) {
  //         traverse(root.left);
  //     }
  //     if ( root.right !== null ) {
  //         traverse(root.right);
  //     }
  //     return;
  // };
  // if ( root !== null ) {
  //     traverse(root);
  // }
  // return root;
  
  // Method 2: sub-problem
  const traverse = (root) => {
      if ( root === null ) {
          return null;
      }
      let left = traverse(root.left);
      let right = traverse(root.right);
      root.left = right;
      root.right = left;
      return root;
  };
  // if ( root !== null ) {
  //     traverse(root);
  // }
  return traverse(root);
};