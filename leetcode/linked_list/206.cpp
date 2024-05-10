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
    ListNode* dummy_p = new ListNode();

    ListNode* reverseList(ListNode* head) {
        // // Method 1: iteration
        // if ( head == NULL ) return NULL;

        // ListNode* a = head;
        // ListNode* b = a == NULL ? NULL : a->next;
        // ListNode* c = b == NULL ? NULL : b->next;

        // a->next = NULL;
        // while ( b != NULL ) {
        //     b->next = a;
        //     a = b;
        //     b = c;
        //     if ( c != NULL ) {
        //         c = c->next;
        //     }
        // }
        // return a;
        

        // // Method 2: recursion
        // if ( head == NULL || head->next == NULL ) {
        //     return head;
        // }
        // ListNode* last = reverseList(head->next);
        // head->next->next = head;
        // head->next = NULL;
        // return last;

        // // Method 3: my own recursion
        // if ( head == NULL ) return NULL;
        // ListNode* bruh = recur_reverse(head);
        // bruh->next = NULL;
        // return this->dummy_p->next;
    }

    // For Method 3
    ListNode* recur_reverse(ListNode* head) {
        if ( head->next == NULL ) {
            this->dummy_p->next = head;
            return head;
        }
        ListNode* rev_next = recur_reverse(head->next);
        rev_next->next = head;
        head->next = NULL;
        return head;
    }
};