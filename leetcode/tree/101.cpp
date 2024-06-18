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

// for Method 2
template <typename T>
class MyQueue : public queue<T> {
public:
    void push(const T& value1, const T& value2) {
        queue<T>::push(value1);
        queue<T>::push(value2);
    }
};
class Solution {
public:
    // // Method 1: recursion
    // bool isSymmetric(TreeNode* root) {
    //     return isSame(root->left, root->right);
    // }
    // bool isSame(TreeNode* a, TreeNode* b) {
    //     if ( a == nullptr || b == nullptr ) {
    //         return a == b;
    //     }
    //     if ( a->val != b->val ) {
    //         return false;
    //     }
    //     return isSame(a->left, b->right) && isSame(a->right, b->left);
    // }

    // Method 2: iteration
    bool isSymmetric(TreeNode* root) {
        TreeNode *a, *b;
        MyQueue<TreeNode *> q;
        q.push(root->left, root->right);
        while ( !q.empty() ) {
            a = q.front();
            q.pop();
            b = q.front();
            q.pop();
            if ( a == nullptr && b == nullptr ) {
                continue;
            }
            if ( (a == nullptr || b == nullptr) || a->val != b->val ) {
                return false;
            }

            q.push(a->left, b->right);
            q.push(a->right, b->left);
        }

        return true;
    }
    
    // // My Method 3: clone left and right trees in reverse order and compare
    // vector<int> left;
    // vector<int> right;
    // void preorder_traverse(TreeNode* root) {
    //     if ( root == nullptr ) {
    //         left.push_back(101);
    //         return;
    //     }
    //     left.push_back(root->val);
    //     preorder_traverse(root->left);
    //     preorder_traverse(root->right);
    //     return;
    // }
    // void anti_preorder_traverse(TreeNode* root) {
    //     if ( root == nullptr ) {
    //         right.push_back(101);
    //         return;
    //     }
    //     right.push_back(root->val);
    //     anti_preorder_traverse(root->right);
    //     anti_preorder_traverse(root->left);
    //     return;
    // }
};