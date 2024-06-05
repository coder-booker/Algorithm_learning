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
    ListNode *detectCycle(ListNode *head) {
        // // Method 1: double pointer
        // ListNode *i = head, *j = head;
        // bool has_ring = false;
        // while ( j && j->next ) {
        //     i = i->next;
        //     j = j->next->next;
        //     if ( i == j ) {
        //         has_ring = true;
        //         break;
        //     }
        // }
        // ListNode *k = head;
        // while ( has_ring ) {
        //     if ( k == i ) {
        //         return k;
        //     }
        //     k = k->next;
        //     i = i->next;
        // }
        // return NULL;

        // Method 2: hashing
        unordered_set<ListNode *> h;
        while ( head && head->next ) {
            if ( h.count(head) ) {
                return head;
            }
            h.insert(head);
            head = head->next;
        }
        return NULL;
    }
};