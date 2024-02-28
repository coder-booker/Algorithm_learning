
// Definition for singly-linked list.
struct ListNode {
    int val;
    ListNode *next;

    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
    ListNode(int x, ListNode *next) : val(x), next(next) {}
};
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
    ListNode* partition(ListNode* head, int x) {
        if ( !head ) {
            return nullptr;
        }

        ListNode* p1 = new ListNode();
        ListNode* p2 = new ListNode();
        ListNode* p1_head = p1;
        ListNode* p2_head = p2;

        // 可以把节点复制出来，也可以直接接上原节点，但后者需要留意环链表问题
        // 不断开的版本，即在最后再断开
        while (head) {
            if ( head->val < x ) {
                p1->next = head;
                p1 = p1->next;
                
            } else {
                p2->next = head;
                p2 = p2->next;
            }
            head = head->next;
        }
        p1->next = p2_head->next;
        p2->next = nullptr;

        return p1_head->next;
    }
};