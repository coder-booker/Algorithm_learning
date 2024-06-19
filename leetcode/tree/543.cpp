/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    int max_path = 0;
    int diameterOfBinaryTree(TreeNode* root) {
        getDepth(root);
        return max_path;
    }

    int getDepth(TreeNode* root) {
        if ( root == nullptr ) {
            return 0;
        }
        int left = getDepth(root->left);
        int right = getDepth(root->right);
        max_path = max(max_path, left+right);
        return max(left, right)+1;
    }
};