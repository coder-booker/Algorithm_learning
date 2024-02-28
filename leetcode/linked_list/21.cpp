struct ListNode {
    int val;
    ListNode *next;

    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
    ListNode(int x, ListNode *next) : val(x), next(next) {}
};
class Solution {
public:
    ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {

        if (!l1) { return l2; };
        if (!l2) { return l1; };

        ListNode* i = l1;
        ListNode* j = l2;
        ListNode* head = new ListNode();
        ListNode* p = head;
        while (i && j) {  // 可以while 1
            if (i->val <= j->val) {
                p->next = i;
                i = i->next;
                if (!i) {
                    p->next->next = j;
                    break;
                }
            } else {
                p->next = j;
                j = j->next;
                if (!j) {
                    p->next->next = i;
                    break;
                }
            }
            p = p->next;
        }
        return head->next;
    };
};