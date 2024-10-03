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

function lowestCommonAncestor(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {
  if ( !root ) return null;

  // 1. 如果left和right有node返回值，那必然是找到了p和q。这里返回的node除了是一个标识符外还会在后序找到了公共祖先后用来返回这个祖先到一开始
  // 2. 如果后序递归到了左和右都有node的一步，那就返回本node
  let leftRes = lowestCommonAncestor(root.left, p, q);
  let rightRes = lowestCommonAncestor(root.right, p, q);
  let selfRes = root.val === p.val || root.val === q.val;
  if ( selfRes && (leftRes || rightRes) || (leftRes && rightRes) || selfRes) {
      // 找到公共祖先或者找到了p和q，因此返回
      return root;
  };
  // 没找到，因此返回
  return leftRes ? leftRes : rightRes;
};