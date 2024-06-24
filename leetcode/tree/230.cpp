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
    int result;
    int count = 0;
    int kthSmallest(TreeNode* root, int k) {
        count = k;
        traverse(root);
        return result;
    }
    void traverse(TreeNode* root) {
        if ( root == nullptr ) {
            return;
        }
        traverse(root->left);
        --count;
        if ( count == 0 ) {
            result = root->val;
            return;
        }
        traverse(root->right);
    }
};