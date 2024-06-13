struct DListNode {
    int val, key;
    DListNode* prev;
    DListNode* next;
    DListNode(): key(-1), val(0), prev(nullptr), next(nullptr) {}
};

class LRUCache {
public:
    int cap;
    int cap_left;
    unordered_map<int, DListNode*> h;
    // dummy head and tail
    DListNode* head;
    DListNode* tail;

    LRUCache(int capacity) {
        cap = capacity;
        cap_left = capacity;
        head = new DListNode();
        tail = new DListNode();
        head->next = tail;
        tail->prev = head;
    }
    
    int get(int key) {
        cout << "get" << key << '\n';
        // 获取hash对应的链表节点
        if ( h.count(key) ) {
            DListNode *temp = h[key];
            // 把对应节点换到尾部
            // 1. 断开存在的节点
            remove_node(temp);
            // 2. 接到尾部
            add_to_tail(temp);

            return temp->val;
        } else {
            return -1;
        }
    }
    
    void put(int key, int value) {
        // cout << "put" << key << '\n';
        if ( h.count(key) ) {   // 如有记录，断开原本，换到尾部
            DListNode *temp = h[key];
            temp->val = value;
            // 1. 断开存在的节点
            remove_node(temp);
            // 2. 接到尾部
            add_to_tail(temp);
        } else {                // 如无记录，添加新的节点
            DListNode *new_node = new DListNode();
            new_node->val = value;
            new_node->key = key;
            // 决定要不要替换现有的节点
            if ( cap_left > 0 ) {    // 如果还有空位，直接尾部添加
                add_to_tail(new_node);
                // 更新哈希
                h[key] = new_node;
                --cap_left;
            } else {                        // 否则，把链表头节点删除，并在尾部添加一个新节点
                DListNode *to_delete = head->next;
                remove_node(to_delete);
                add_to_tail(new_node);
                // h中的条目也删除更新
                h.erase(to_delete->key);
                h[key] = new_node;
            }
        }
    }

    // remove the node from the double linked list
    void remove_node(DListNode* node) {
        node->prev->next = node->next;
        node->next->prev = node->prev;
    }

    void add_to_tail(DListNode* node) {
        tail->prev->next = node;
        node->prev = tail->prev;
        node->next = tail;
        tail->prev = node;
    }
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * LRUCache* obj = new LRUCache(capacity);
 * int param_1 = obj->get(key);
 * obj->put(key,value);
 */