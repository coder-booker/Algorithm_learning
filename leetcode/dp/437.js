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
 * @param {number} targetSum
 * @return {number}
 */
var pathSum = function(root, targetSum) {
  // Method 1: recursion
  let count = 0;
  function recurSum(root, targetSum){
      if ( root === null ) {
          return;
      }

      if ( targetSum-root.val === 0 ) {
          count += 1;
      }

      let leftRes = recurSum(root.left, targetSum-root.val);
      let rightRes = recurSum(root.right, targetSum-root.val);
  }
  function traversal(root) {
      if ( root === null ) {
          return null;
      }
      recurSum(root, targetSum);

      traversal(root.left);
      traversal(root.right);
  }
  traversal(root)
  return count;

  // // Method 2: i dont understand
  // const prefix = new Map();
  // prefix.set(0, 1);
  
  // const dfs = (root, prefix, curr, targetSum) => {
  //     if (root == null) {
  //         return 0;
  //     }

  //     let ret = 0;    // 当前节点为根时的目标路径数量
  //     curr += root.val;   // 从根节点到当前节点的前缀和

  //     ret = prefix.get(curr - targetSum) || 0;
  //     prefix.set(curr, (prefix.get(curr) || 0) + 1);

  //     ret += dfs(root.left, prefix, curr, targetSum);
  //     ret += dfs(root.right, prefix, curr, targetSum);
      
  //     prefix.set(curr, (prefix.get(curr) || 0) - 1);

  //     return ret;
  // }
  // return dfs(root, prefix, 0, targetSum);
};
