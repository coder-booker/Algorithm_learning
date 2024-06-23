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

    bool isValidBST(TreeNode* root) {
        // // Method 1: preorder recursion
        // return bruh(root, nullptr, nullptr)

        // Method 2: inorder recursion
        return traverse(root);
    }
    // For method 1
    bool bruh(TreeNode* root, TreeNode* min_node, TreeNode* max_node) {
        if ( root == nullptr ) {
            return true;
        }
        if ( max_node != nullptr && root->val >= max_node->val ) {
            return false;
        }
        if ( min_node != nullptr && root->val <= min_node->val ) {
            return false;
        }
        return bruh(root->left, min_node, root) && bruh(root->right, root, max_node);
    }

    // For method 2
    long last = -2147483649;
    bool traverse(TreeNode* root) {
        if ( root == nullptr ) {
            return true;
        }
        // bool left = ;
        if ( !traverse(root->left) || root->val <= last ) {
            return false;
        }
        last = root->val;
        return traverse(root->right);
    }
};