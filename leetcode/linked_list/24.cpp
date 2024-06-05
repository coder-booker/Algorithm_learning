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
    ListNode* swapPairs(ListNode* head) {
        // // Method 1: single loop
        // if ( !(head) || !(head->next) ) {
        //     return head;
        // }
        // ListNode *dummy_head = new ListNode(0, head);
        // ListNode *i = dummy_head, *j = head, *k = head->next;
        // while ( 1 ) {
        //     j->next = k->next;
        //     k->next = j;
        //     i->next = k;
        //     if ( j->next && j->next->next ) {
        //         i = i->next->next;
        //         j = j->next;
        //         k = j->next;
        //     } else {
        //         break;
        //     }
        // }
        // return dummy_head->next;

        // Method 2: recursion
        if ( !head || !(head->next) ) {
            return head;
        }
        ListNode *i = head;
        ListNode *j = head->next;
        ListNode *k = head->next->next;
        j->next = i;
        i->next = swapPairs(k);
        return j;
    }
};