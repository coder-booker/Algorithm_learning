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
    ListNode* removeNthFromEnd(ListNode* head, int n) {
        ListNode *dummy_head = new ListNode(), *k = head;
        dummy_head->next = head;
        ListNode *j = dummy_head;
        while ( n > 0 ) {
            k = k->next;
            n--;
        }
        while ( k ) {
            j = j->next;
            k = k->next;
        }
        j->next = j->next->next;
        return dummy_head->next;
    }
};