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
    // vector<vector<int>> result;
    vector<vector<int>> levelOrder(TreeNode* root) {
        // // Method 1: two vectors as history
        // if ( root == nullptr ) {
        //     return vector<vector<int>>();
        // }
        // vector<vector<int>> result;

        // vector<int> layer_val;
        // vector<TreeNode*> current_layer;
        // vector<TreeNode*> next_layer;
        
        // current_layer.push_back(root);
        // while ( !current_layer.empty() ) {
        //     for ( int i = 0; i < current_layer.size(); ++i ) {
        //         // cout << i << endl;
        //         layer_val.push_back(current_layer[i]->val);
        //         if ( current_layer[i]->left != nullptr ) {
        //             next_layer.push_back(current_layer[i]->left);
        //         }
        //         if ( current_layer[i]->right != nullptr ) {
        //             next_layer.push_back(current_layer[i]->right);
        //         }
        //     }
        //     result.push_back(layer_val);
        //     current_layer = next_layer;
        //     next_layer.clear();
        //     layer_val.clear();
        // }

        // return result;

        // Method 2: one queue
        if ( root == nullptr ) {
            return vector<vector<int>>();
        }
        vector<vector<int>> result;

        vector<int> layer_val;
        queue<TreeNode*> q;
        TreeNode* traverse_p;
        
        q.push(root);
        while ( !q.empty() ) {
            int temp = q.size();
            for ( int i = 0; i < temp; ++i ) {
                // cout << i << endl;
                traverse_p = q.front();
                q.pop();
                layer_val.push_back(traverse_p->val);
                if ( traverse_p->left != nullptr ) {
                    q.push(traverse_p->left);
                }
                if ( traverse_p->right != nullptr ) {
                    q.push(traverse_p->right);
                }
            }
            result.push_back(layer_val);
            layer_val.clear();
        }

        return result;
    }
};