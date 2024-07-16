/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder) {
  if ( preorder.length === 0 ) {
      return new TreeNode(null);
  }
  if ( preorder.length === 1 ) {
      return new TreeNode(preorder[0]);
  }
  const map = new Map();
  inorder.forEach((element, index) => {
      map.set(element, index);
  });
  function recurBuild(preS, preE, inS, inE) {
      // console.log(preS, preE, inS, inE);
      if ( preS > preE ) {
          return null;
      }

      let root = new TreeNode(preorder[preS]);
      const inRoot = map.get(root.val);
      const leftTreeSize = inRoot - inS;
      // const rightTreeSize = inE - inRoot;

      root.left = recurBuild(preS+1, preS+leftTreeSize, inS, inRoot-1);
      root.right = recurBuild(preS+leftTreeSize+1, preE, inRoot+1, inE);

      return root;
  }
  return recurBuild(0, preorder.length-1, 0, inorder.length-1);
};