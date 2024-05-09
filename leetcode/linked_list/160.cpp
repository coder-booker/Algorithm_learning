/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
class Solution {
public:
    ListNode *getIntersectionNode(ListNode *headA, ListNode *headB) {
        int len_A, len_B;
        len_A = len_B = 0;

        ListNode* A = headA;
        ListNode* B = headB;
        while ( A != NULL ) {
            A = A->next;
            ++len_A;
        }
        while ( B != NULL ) {
            B = B->next;
            ++len_B;
        }
        // cout << len_A << len_B << endl;
        A = headA;
        B = headB;
        if ( A == B ) {
            return A;
        }
        for ( int i = 0; i < len_A + len_B - 1; ++i ) {
            A = A->next;
            B = B->next;
            if ( A == NULL ) {
                A = headB;
            }
            if ( B == NULL ) {
                B = headA;
            }
            if ( A == B ) {
                return A;
            }
            // cout << A->val << ' ' << B->val << endl;
        }
        return NULL;
    }
};