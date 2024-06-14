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
    vector<int> inorderTraversal(TreeNode* root) {
        // // Method 1: recursion
        // if ( !root ) {
        //     vector<int> left;
        //     return left;
        // }
        // vector<int> left = inorderTraversal(root->left);
        // vector<int> right = inorderTraversal(root->right);
        // left.push_back(root->val);
        // left.insert(left.end(), right.begin(), right.end());
        // return left;

        // Method 2: iteration
        vector<int> result;
        stack<TreeNode*> s;
        TreeNode *p = root;
        while ( p != nullptr || !s.empty() ) {
            while ( p != nullptr ) {
                s.push(p);
                p = p->left;
            }
            cout << 1 << endl;
            p = s.top();
            s.pop();
            result.push_back(p->val);
            if ( p->right ) {
                p = p->right;
            } else {
                p = NULL;
            }
        }
        return result;
        
    }
};