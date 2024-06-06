/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* reverseKGroup(ListNode* head, int k) {
        // // Method 1: iteration
        // if ( k <= 1 || !head || !(head->next) ) {
        //     return head;
        // }
        // ListNode *traverse_ptr = new ListNode(0, head);         // for proper reverse logic (see the loop below)
        // ListNode *rev_head, *rev_head_prev;
        // int rev_progress = 0;
        // ListNode *dummy_head = new ListNode(0, traverse_ptr);   // for return value

        // while ( traverse_ptr ) {
        //     if ( rev_progress == 0 ) {      // record a ptr for later reverse when k elements are traversed
        //         rev_head_prev = traverse_ptr;
        //     }
        //     if ( rev_progress == k ) {
        //         traverse_ptr = partialReverse(rev_head_prev, k); // return the head of reversed partial linked list
        //         rev_progress = 0;
        //     } else {
        //         traverse_ptr = traverse_ptr->next;
        //         ++rev_progress;
        //     }
        // }
        // return dummy_head->next->next;


        // Method 2: recursion
        if ( k <= 1 || !head || !(head->next) ) {
            return head;
        }
        return recurReverse(head, k);
    }

    // // For Method 1
    // ListNode* partialReverse(ListNode* head, int n) {
    //     ListNode *i = head->next, *j = head->next->next;
    //     ListNode *k = j->next;
    //     ListNode *tail = i;
    //     for ( int p = 0; p < n-1; ++p ) {
    //         j->next = i;
    //         i = j;
    //         j = k;
    //         if ( k ) {
    //             k = k->next;
    //         }
    //     }
    //     head->next = i;   // concatenate the rev_head back to previous ptr
    //     tail->next = j;   // concatenate the tail to next ptr;
    //     return tail;
    // }

    // For Method 2
    ListNode* recurReverse(ListNode* head, int k) {
        ListNode* p = head;
        for ( int i = 0; i < k; ++i ) {
            if ( !p ) {
                return head;
            }
            p = p->next;
        }
        ListNode* tail;
        ListNode* hair = new ListNode(0, head);
        pair<ListNode*, ListNode*> result = subRecurReverse(head, k);
        head = result.first;
        tail = result.second;
        tail->next = recurReverse(p, k);
        return head;
    }
    pair<ListNode*, ListNode*> subRecurReverse(ListNode* head, int n) {
        if ( n == 1 ) {
            return {head, head};
        }
        pair<ListNode*, ListNode*> result = subRecurReverse(head->next, n-1);
        ListNode *last = result.first;
        head->next->next = head;
        head->next = NULL;
        return {last, head};
    }
};