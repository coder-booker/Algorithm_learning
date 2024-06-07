/*
// Definition for a Node.
class Node {
public:
    int val;
    Node* next;
    Node* random;
    
    Node(int _val) {
        val = _val;
        next = NULL;
        random = NULL;
    }
};
*/

class Solution {
public:
    // // For Method 2
    // unordered_map<Node*, Node*> h;

    Node* copyRandomList(Node* head) {
        // Method 1: iteration+hash
        unordered_map<Node*, Node*> h;
        Node* p1 = head;
        Node* dummy_cpy_head = new Node(0);
        Node* p2 = dummy_cpy_head;
        while ( p1 ) {
            p2->next = new Node(p1->val);
            h[p1] = p2->next;
            p1 = p1->next;
            p2 = p2->next;
        }
        p1 = head;
        p2 = dummy_cpy_head->next;
        while ( p1 ) {
            p2->random = h[p1->random];
            p1 = p1->next;
            p2 = p2->next;
        }
        return dummy_cpy_head->next;

        // // Method 2: recursion+hash
        // if ( !head ) {
        //     return nullptr;
        // }
        // if ( h.count(head) ) {
        //     return h[head];
        // }
        // Node* new_head = new Node(head->val);
        // h[head] = new_head;
        // new_head->next = copyRandomList(head->next);
        // new_head->random = copyRandomList(head->random);
        // return new_head;
    }
};