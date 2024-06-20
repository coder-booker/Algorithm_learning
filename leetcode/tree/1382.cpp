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
    vector<int> inorder_array;
    TreeNode* balanceBST(TreeNode* root) {
        inorder(root);
        return balancing(0, inorder_array.size());
    }
    void inorder(TreeNode* root) {
        if ( root == nullptr ) {
            return;
        }
        inorder(root->left);
        inorder_array.push_back(root->val);
        inorder(root->right);
    }
    TreeNode* balancing(int left, int right) {
        if ( left == right ) {
            return nullptr;
        }
        int mid = (right - left)/2 + left;      // avoid int overflow
        TreeNode* root = new TreeNode(inorder_array[mid]);
        root->left = balancing(left, mid);
        root->right = balancing(mid+1, right);
        
        return root;
    }
};