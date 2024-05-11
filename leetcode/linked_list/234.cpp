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
    bool isPalindrome(ListNode* head) {
        // Method 1: O(n) + O(n)
        vector<int> order;
        ListNode* p = head;
        while ( p != NULL ) {
            order.push_back(p->val);
            p = p->next;
        }
        auto i = order.begin();
        auto j = order.end()-1;
        for ( i, j; i < j; ++i, --j ) {
            if ( *i != *j ) {
                return 0;
            }
        }
        return 1;

        // // Method 2: O(n)+O(1)
        // // quite stupid: 
        // //   1. use fs pointer get to middle
        // //   2. reverse the back half of linked list and compare
        // //   3. re-reverse the back half to maintain the original structure
        // ListNode* i;
        // ListNode* j;
        // i = j = head;
        // int half_len = 0;
        // while ( j && j->next ) {
        //     ++half_len;
        //     i = i->next;
        //     j = j->next->next;
        // }

        // ListNode* middle = i;
        // ListNode* mid_p = i->next;
        // ListNode* mid_np;

        // while ( mid_p ) {
        //     mid_np = mid_p->next;
        //     mid_p->next = middle;
        //     middle = mid_p;
        //     mid_p = mid_np;
        // }
        // bool result = 1;
        // while ( half_len > 0 ) {
        //     if ( middle->val != head->val ) {
        //         result = 0;
        //         middle = middle->next;
        //         head = head->next;
        //         break;
        //     }
        // }

        // mid_p = middle->next;
        // mid_np = mid_p->next;
        // // recover
        // while ( middle != i ) {
        //     cout << mid_p->val << ' ' << middle->val << endl;
        //     mid_p->next = middle;
        //     middle = mid_p;
        //     mid_p = mid_np;
        //     mid_np = mid_np->next;
        // }
        // ListNode* a = head;
        
        // // cout << i->val << endl;

        // return result;
    }
};