They are so smart. 
What I can do is to drop some fixed practices for certain algorithms. 

Complexity: 
    1. only nested loop makes more complexity. multiple separate loops are still in O(n)
general: 
    1. try to do it manually once
    2. 可能有用的关键字：相邻/连续、最大最小、以此开头/结尾
    3. 留意题目要求的输出，有时候某些信息不一定需要在算法中被保留（eg 求最大子数组和不需要子数组索引）
    4. 贪心（visited数组之类的）
    5. % 可以用来 range control (189.cpp 轮转数组)
    6. 随机链表拷贝（138.cpp）
    7. 以反向的方式计算答案，最后反过来输出，可能会比正向算答案更有机会成功。（详见210）
    i++ or ++i: 
        i++: return i, then i = i + 1
        ++i: i = i + 1, then return i
sort: 
    c++ normally consumes nlogn
in-place algorithm: 
    1. use the original/part of array to store the result. then O(1) space complexity
    2. use a single extra variable to store the result. then O(1) space complexity

dp: 
    1. how to define dp[i]?
    2. how to update dp[i+1] from dp[i]?
    3. how to get the result from dp?
    some abstract mindset: 
        how to keep transfering the state? (states can be +ve or -ve states that benefit or harm the result respectively)
    4. 自底向上（递推），自顶向下（暴力递归+备忘录＋剪枝）
    常见方法：
        前缀和
        暴力递归
        递归
        备忘录
moving windows:
    1. when to move left and right?
    2. when to stop moving left and right?
    3. how to update the result?
    4. 关键不在于怎么停在最优的left和right，而在于怎么遍历所有有利可能性
    there are two types of moving windows: 
        1. left = right = begin;
        2. left = begin, right = end;
linked list: 
    1. typical questions: 
        nth node from the end.
        half from the end. 
        dummy list
        intersection (linked list concatentation) (可以理解为对齐一定相同的尾部)
    2. dummy node can be used as the head node of modified linked list (so even if it is the original first node that changed, the dummy node is still the head)
    3. delete ==> 2 ptrs(被删除的那个，接上的前一个). swap ==> 3 ptrs(被swap的俩，接上的前一个)
    4. recursion is useful but costly. iteration is space saving but harder to implement.
tree: 
    前序是进入，后序是退出，中序是前序切换后序
    遍历思路：前序；分解问题思路：后序
    前序能利用参数，后序能利用参数和返回值；对于需要递归检查某种约束，前序和后序都有可取之处：前序可以传递参数，后序可以获得子最优解 （*************递归与递推的异同****************）
    如果要储存所有叶子节点，空间复杂度是O(n)（O(2^(round_down(log(n)) + 1)) = O(n+1) = O(n)
    BFS: 用queue，DFS: 用stack
    BST
        二叉查找/搜索/排序树
        中序遍历是升序的数组
        有序数组构建二叉搜索树会变成链表
    平衡二叉树
        ＝平衡的二叉搜索树
        每个节点的左右子树高度差不超过1
        有序数组不会有链表的情况出现
        AVL树，红黑树都是平衡二叉搜索树
graph theory:
    本质上就是交叉的树，可以用标记来模拟成每个节点最多四个子节点的树
    DFS和BFS在这里很重要
        DFS本质上就是递归
        BFS本质上就是队列
    构建一个邻接表就可以用tree的方式遍历，详看207
    邻接表的后序排列昭示着依赖的排序
    环检测：
        BFS：没有环的图必然会有一个节点的入度为0，一个节点的出度为0；有环的话则必然会出现某串节点都没有0入度或出度
        DFS：或者用onPath栈也能检测环，但要记得出栈
queue: 
    FIFO
    .push(), .pop(), .front(), .back(), .empty()
    priority queue: 
        implemented by heap, therefore have priority. 
    注意，BFS的时候，queue如果用的两层，不可以只判断外层的长度，因为内存必定会有一个array实例，哪怕是空的
stack:
    s.top(); s.pop(); s.push();
    ****单调栈****
        和单调队列一样，重点是在优先队列之外提供一个复杂度更低的解法。
        但单调栈或者队列会抛弃部分节点，而优先队列会保留全部节点
vector:
    v.insert(v.end(), v2.begin(), v2.end());

Recursion
- base case: 除了null，还可以看看a是否＞b（在a或b会被绝对数值增减的情况下，例如+1 -1）

to_learn:
    1. 前序中序后序遍历的迭代实现和Morris遍历
    2. 为什么这个优先队列可以插入NULL?????：
        priority_queue<ListNode*, vector<ListNode*>, function<bool(ListNode*, ListNode*)>> pq(
            [] (ListNode* a, ListNode* b) { return a->val > b->val; });
    4. 二叉树、红黑树、avl树
    5. 1382.cpp的原地算法
    6. 105索引问题还没想明白

other: 
    148 skipped
    437 skipped



to do：
    - dp 找一道做一做
    - mv window 雨水和任意一道
    - tree 层序遍历，各种遍历方法




# General
- 两大类数据结构
    - 线性
        - 一坨数据都有且只有零或一个前驱(前一个元素)和一个后继(后一个元素)
        - e.g. 数组(顺序储存)、链表(链式储存)、栈堆、队列
    - 非线性
        - 多对多的结构
        - e.g. 树、图