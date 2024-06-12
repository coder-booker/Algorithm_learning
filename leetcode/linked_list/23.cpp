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
    ListNode* mergeKLists(vector<ListNode*>& lists) {
        if ( lists.empty() ) return NULL;

        priority_queue<ListNode*, vector<ListNode*>, function<bool(ListNode*, ListNode*)>> pq(
            [] (ListNode* a, ListNode* b) { return a->val > b->val; }); // 最小堆
        
        for ( auto& head : lists ) {
            if ( head != nullptr ) {
                pq.push(head);
            }
        }

        ListNode *dummy_head = new ListNode(0);
        ListNode *p = dummy_head;
        while ( !pq.empty() ) {
            ListNode *temp = pq.top();  // 必须复制一份，因为pop()是直接清空pq中的地址
            pq.pop();
            p->next = temp;
            if ( temp->next ) {         // push the next node of the poped node
                pq.push(temp->next);
            }
            p = p->next;
        }
        // 无需手动assign一个结束nullptr，因为原链表就有
        return dummy_head->next;
    }
private:
    
};