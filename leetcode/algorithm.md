# General
- 两大类数据结构
    - 线性
        - 一坨数据都有且只有零或一个前驱(前一个元素)和一个后继(后一个元素)
        - e.g. 数组(顺序储存)、链表(链式储存)、栈堆、队列
    - 非线性
        - 多对多的结构
        - e.g. 树、图
- 常用的缓存淘汰策略
    - LRU算法
        - 用双链表维护顺序和保存缓存值，用哈希表快速查询
        - 对于每一个被使用的数据，都移动到双链表的头，表示最近使用，这样尾部就是最少使用的了
        - 哈希表则是用来快速访问缓存值的，这样不用遍历双链表，只是注意这个哈希表没有保存顺序信息的功能
- Complexity: 
    - only nested loop makes more complexity. multiple separate loops are still in O(n)
    - 但也得考虑进入和退出的次数，例如滑动窗口其实是O(2n)=O(n)

# 经验
- Methdology: 
    - 第一眼：初见
        - 枚举所有可能性：很多时候应该从枚举所有可能性开始思考
        - 手做一遍：无论有没有思路，都需要手做一遍验证规律
    - 第二眼：
        - result信息：留意题目要求的输出，有时候某些信息**不一定需要被保留**（eg 求最大子数组和不需要子数组索引），可以反过来思考为什么题目不要求求实际元素
        - 反转主次：从原本的 '从 A 推出 B' 改成 '从 B 推出 A' 可能有助解题（柱状图内的矩阵 就是很好的例子）
        - 转化问题，不要钻牛角尖：把这个问题转化为另一个等价但描述不同的问题，可能可以简化思考过程
        - 关键字：可能有用的关键字：相邻/连续、最大最小、以此开头/结尾
    - 第三眼：开始写
        - 有思路之后思考 metadata：无论这个题你是否很熟悉，预先思考下题目要求与代码的对应，可以先写下注释来理清思路（思考 metadata 的性价比在短时间内是比直接写代码高的）
    - 最后几眼（逻辑已经完备，需要最终优化）：
        - 排序：如果可以预见这道题的复杂度必然很高，**排序**是非常好用的优化方法
        - 剪枝：寻找可以剪枝的地方
        - 预处理：预处理以简化主循环的复杂度
        - 反转主次：从原本的 '从 A 推出 B' 改成 '从 B 推出 A' 可能有助优化（字符串匹配 pattern 和 柱状图内的矩阵 就是很好的例子），或者 targetSum - value 也是一个例子
        - 遍历融合：把原本需要两个遍历的逻辑合到一个遍历内
        - 答案逆转：以**反向**的方式计算答案，最后反过来输出，可能会比正向算答案更有机会成功。（详见210）
        - 算法融合：不同数据结构中也可以共用各种算法
- 通用 template：
    - 简单的 Map 结构可用：
        - `const count = map.get(s) ?? 0; map.set(s, count+1)` 可以很方便地更新频率map
    - set/map to array：`Array.from`
- debug 技巧：
    - debug print
    - 仔细思考你要 print 什么，最好让 print 出来的东西简洁易懂
    - 必须包含前缀
    - base case 别简写，方便塞打印语句
- HackerRank
    - 性能要求极度严格，一点点多余的代码都会导致 case 失败
    - HackerRank 的超时和错误答案的展示方式是一样的
- 一些基础知识
    - 阶乘复杂度

# 数组
- 子串是连续的，子序列/子集不是


# dp
- 定义：
    - 设计概念
        1. how to define dp[i]?
        2. how to update dp[i+1] from dp[i]?
            1. 条件对上了
            2. 条件没对上
        3. how to get the result from dp?
- General 经验：
    - some abstract mindset: 
        - how to keep transfering the state? (states can be +ve or -ve states that benefit or harm the result respectively)
    - 条件对上和条件没对上的状态传递处理器
        - 有些 dp 的更新是相邻的，有些是可以隔好几个的。后者一般和直接枚举目标值有关。（eg 零钱问题，单词拼接问题）
        - 有些 多维 dp 条件对上时会同时递进（为了避免重复计算），条件没对上则对比大小（左和上怎么传递）
    - 太阴了，多维 dp 实在很防不胜防
        - 状态转移在每个点都有两种可能性（从上往下是固定 a 走 b ，从左往右是固定 b 走 a），这会导致我们无法得知哪个可能性（i-1还是j-1），所以需要一个处理器来把状态妥善传递，例如对比大小
- 具体案例经验
    - 常见用法：
        - 前缀和
        - 暴力递归
        - 递归
        - 备忘录
    - 最长递增子序列
    - 路径压缩
    - 背包问题：
        - 定义：
            - 一般问 ‘存不存在一种组合符合某个条件’ 就是背包问题
        - dp[i][w] 的定义：对于前 i 个物品，当前背包的容量为 w，这种情况下可以装的最大价值是 dp[i][w]。
        <!-- - dp[i][j] = 对于有 i 个物品供选择时，存不存在一种能够恰好放进容量为 j 的包中的物品组合 -->
        <!-- - 有两种转移方向
            1. 第 i 个物品装进去：
               - 这时候就得看当前背包大小去除第 i 个物品的大小后，剩余容量能不能被前 i-1 个物品的某种装法填满，也就是 dp[i-1][j - nums[i]]
               - 有点反直觉，因为我们不是一个一个物品慢慢装然后让 j 变小继续判断，而是为了状态转移能够遍历所有可能性从 j 而往回找
            2. 第 i 个物品不装进去：这时候得把上一次的状态传下去，也就是前 i-1 个物品有没有一个合适的装法能够填满 j，如果 i-1 能，那么 i 自然也能。如果不能，对于同样的 j， i 肯定也不能
        - 另一种想法：
            1. 我们要算出对于每种容量有没有可以装的序列，如果对于容量 x 有，自然对于容量 x + nums[i] where x + nums[i] < 总容量 也会有。但怎么判断容量 x 有没有呢？要遍历 0 到 i-1 来找有没有，而每一个遍历的点都可以再判断有没有容量 x 成立，最后收归到 base case x=0 必然为 true。
            2. 对于这种思路，有一个很重要的点就是反过来推 dp，不然就会有同一个物品 nums[i] 把所有大于 nums[i] 的位置全部 set 成 true 的情况 -->
        - 经验：
            - 为什么能够遍历所有可能性？因为遍历时会把每个物品都在每个容量下进行 dp 判断，所以无论哪个物品在什么容量下，都会有对应的结果
                - 每个 dp[i][w] 都是考虑了 nums[i-1] 是否装进来之后的最优解，也就是 dp[i-1][w] 和 dp[i-1][w-nums[i]]，也因此每次往回看结果都是考虑了装或者不装的完整结果。
                - 有时候装了的结果和不装是一样的，有时候又是不同的，这造成了巨量的 dynamic ，也因此能解决问题
                - 同一个位置的值是一样的，但含义包含非常多可能性，比如可以是
                    - 前 i 个物品的结果
                    - 自己装进去的结果
                    - base case 的结果
            - 有好几种类型的背包问题，它们的处理方法相当不同
                - eg 背包最大值问题
                    - 放进去和不放进去的 dynamic 存在于：1. 容量是否够；2. 放进去（找前 [i-1][w-nums[i]] 个的结果合在一起）和不放进去（只取前 [i-1][w] 的结果）哪个最终值更大
                - eg 背包能否塞满问题
                    - 放进去和不放进去的 dynamic 存在于：1. 容量是否够；2. 放进去（找前 [i-1][w-nums[i]] 个的结果合在一起）和不放进去（只取前 [i-1][w] 的结果）哪个结果是 true，或者都为 false
- template
    - eg
        ```ts
        function dp(nums: number[][]) {
            const n = nums.length;
            const m = nums[0]?.length ?? 0;

            // 多维
            const multiDp: number[][] = Array.from({length: n}, _ => Array(m).fill(0));
            for (let i = 0; i < n; ++i) {
                for (let j = 0; j < m; ++j) {
                    if (A[i] === B[j]) {
                        // 条件符合了，怎么传递
                    } else {
                        // 条件不符合了，怎么传递
                    }
                }
            }
        }
        ```

# moving windows & double pointer
- 一些概念
    1. when to move left and right?
    2. when to stop moving left and right?
    3. how to update the result?
- 关键不在于怎么停在最优的left和right，而在于怎么遍历所有有利可能性和怎么维持窗口的某些属性（单调栈之类的）
- 其实移动窗口就是一种双指针
- 一般有两种启动方式
    1. left = right = begin;
    2. left = begin, right = end;
- 经验：
    - 滑动找子数组时，原来 right 每走一步都刚好会增加 len(window) 个子数组组合
    - template
      - eg
            ```ts
            function sliceWindow(s: string) {
                // 1. 窗口内需要持续维护的状态。可能是 map，可能是 number，按题目来就行
                let window = ...;
                // 2. across 每个窗口都需要尝试更新的题目答案
                let result = ...;

                // 3. 循环所需的左右指针，可能是左 0 右 0 也可能是左 0 右 尾，这里先讨论都是 0 的情况
                // 注意默认是左闭右开，方便处理 edge case
                let left = ..., right = ...;
                while (right < s.length) {
                    // 4. 每次循环都有几件事要做
                    //     a. 右指针右移
                    ++right;
                    //     b. 更新 window 状态和 result
                    append element to window;
                    update result;
                    //     c. 判断需不需要左移指针
                    while (needShrink) {
                        //     d. 更新 window 状态和看情况更新 result
                        shift element from window;
                        update result;
                        ++left;
                    }
                    
                }

                return result;
            }
            ```

# linked list
- typical questions: 
    - nth node from the end.
    - half from the end. 
    - dummy list
    - intersection (linked list concatentation) (可以理解为对齐一定相同的尾部)
        - 其实就是因为从交叉点开始两条list会变得一样，因此拼接对齐之后的尾部就正好会是交叉点了
- dummy node can be used as the head node of modified linked list (so even if it is the original first node that changed, the dummy node is still the head)
- 单链表：delete ==> 2 ptrs(被删除的那个，接上的前一个). swap ==> 3 ptrs(被swap的俩，接上的前一个)
- recursion is useful but costly. iteration is space saving but harder to implement.
- template
    - node 定义
        - eg
            ```ts
            interface MyNode {
                val?: number;
                prev?: MyNode; // for dummyhead and tail
                next?: MyNode; // for dummyhead and tail
            }
            ```
    - 插入
        - 双向链表
        ```ts
        function insert(newNode, next) { // 或者第二个参数是 prev 也行
            const prev = next.prev;
            // 把自个儿的引用塞进去
            prev.next = newNode;
            next.prev = newNode;
            // 再塞自个儿对别人的引用
            newNode.prev = prev;
            newNode.next = next;
        }
        ```
    - 删除
        - 双向链表
        ```ts
        function delete(node) {
            const prev = node.prev;
            const next = node.next;
            // 把自个儿的引用移除
            prev.next = next;
            next.prev = prev;
            // 再移除自个儿对别人的引用
            node.prev = undefined;
            node.next = undefined;
        }
        ```
    - 移动
        - 双向链表
        ```ts
        function mode(node, target) {
            const prev = node.prev;
            const next = node.next;
            // 把自个儿的引用移除
            prev.next = next;
            next.prev = prev;
            // 更新 target 的引用
            const targetPrev = target.prev;
            targetPrev.next = node;
            target.prev = node;
            // 再更新自个儿对别人的引用
            node.prev = targetPrev;
            node.next = target;
        }
        ```

# tree
- 定义：
    - 二叉搜索树 Binary Search Tree (BST)
        - 不同名字：二叉查找/搜索/排序树
        - 排序特性：中序遍历是升序的数组
        - 经验：有序数组构建二叉搜索树会变成链表
    - 平衡二叉树 Balanced binary search Tree
        - 定义：每个节点的左右子树高度差不超过 1 的二叉搜索树
        - 经验：
            - 平衡二叉树就是二叉搜索树的平衡版本（定义如此，毕竟如果不搜索，平衡是毫无意义的），平衡二叉树其实就是平衡二叉搜索树的简称
            - 平衡二叉树通常被统称为 AVL 树
            - 中序遍历不会有链表的情况出现
        - 不同种类：
            - AVL 树：用旋转来维护
            - 红黑树：用颜色来维护
    - 满/严格二叉树 full/strictly binary tree
        - 定义：所有节点要么满了（两个子节点），要么空了（没有子节点）
        - 一些公式
            - 出度为 0 的节点数 - 1 = 出度为 2 的节点数
    - 完美二叉树 perfect binary tree
        - 定义：满二叉树且每一层都完全填充
        - 一些公式：
            - 叶子节点数量 * 2 - 1 = 总节点数（满二叉树推导而来）
            - 2 ** (depth) - 1 = 总节点数
    - 完全二叉树 Complete Binary Tree 
        - 定义：除最后一层外的完美二叉树，且最后一层的节点都优先往左侧挤
        - 一些公式：
            - 给定总节点数 n
                - 深度 d = floor(log2(n))
                - 除去最后一层的节点数 rn = 2**(d-1) - 1 = n - ln
                - 叶子节点数 ln = n - rn
            - 给定叶子节点数量 l，可以得出除去最后一层的节点的总节点数 ln = ceil(log2(l))-1，加上最后一层的总节点数最多为 2(ln)，最少为 2(ln)-1
            - 总节点数为奇数时没有度为1的节点，为偶数时只会有一个度为1的节点
        - 经验：
            - 去除最后一层就是完美二叉树
    - other
        - B 树
            - 通过节点分裂和合并来保持树的平衡。
        - Splay 树
            - 通过将最近访问的节点旋转到根节点来保持树的平衡
- logic：
    - 前序是进入，后序是退出，中序是退出与进入中间
        - ↙→，→↖，↗↘
    - 用数组储存二叉树
        - 常规：
            - 对于节点索引 i，其左子节点和右子节点分别是 2i+1 和 2i+2（相当神奇，直接背了吧）
            - 注意，常规数组储存永远是满二叉树，就算不是也会用空占位来补足
        - 遍历：前序/中序/后序遍历的结果储存
    - 内部节点：非叶子节点的节点
- 经验：
    - 一些原子化 mindset
        - 思考 floor 还是 ceil 时，想想 2 的倍数应该对结果 +1 还是 -1 （但大部分情况都是 floor）
        - 给定叶子节点数，考虑倒数第二层全都是加叶子情况 1 和 2 和完美二叉树的情况
        - 总节点数总是缺 1 的
        - floor 之后一般都是 +1 的 （因为缺1的特性）
        - 每一层的节点会在 {0, (2**(深度) - (2**(深度-1)))} ，左闭右闭
    - 树最重要的三个属性（先只讨论平衡树，完全数的特性又不太一样）：
        - 总结点数：
            - 给定深度：
                - 最大 = 2**(深度) - 1 （完美二叉树）
                - 最小 = 2**(深度-1) + 1 （最后一层只有一个节点，其余层是完美二叉树）
            - 给定叶子节点数：
                - 最大： (2**(floor(log2(叶子节点树)))+1) - 1 + 叶子节点 （倒数第二层全都是加叶子情况 1 和 2 ）（floor 是因为每到 2 的倍数都可以直接延伸到多一层的情况，（这和给定叶子节点数计算最大深度是一样的）所以所有2倍数之间的数都会收归到前一个2的倍数。+1 是为了乘2，-1是为了算出所有内部节点的数量）
                - 最小： 2**(floor(log2(叶子节点数))+1) - 1（完美二叉树就是最小的情况）（+1 是因为 floor 实际深度的关系，-1 是总节点数的缺一）
        - 深度
            - 给定总结点数：floor(log2(总结点数)) + 1 （很直观不需要解释）（floor 的原因是总节点数正好是 2 的倍数的话一样会有一层增加）
            - 给定叶子节点数：
                - 最大：floor(log2(叶子节点数)) + 2（首先最后一层不能满，其次考虑每个叶子节点添加叶子的话可以加两个，加一个，不加，中间那个case可以保持叶子总数的同时增加深度，因此极端情况下可以比完美二叉树的情况多加一层）（floor 的原因是总节点数正好是 2 的倍数的话一样会有一层增加）
                - 最小：floor(log2(叶子节点数)) + 1（最后一层满，深度自然是最小）（floor 的原因是总节点数正好是 2 的倍数的话一样会有一层增加）
        - 叶子节点数
            - 给定总节点数：
                - 最大：ceil(log2(总节点数))（完美二叉树的情况就是最大值）（ceil 是特例）
                - 最小：似乎没法确定，因为考虑加叶子的三种情况的话，最后一层的节点数量不同，结果公式也就不同，没有确定的下限，除非增加公式的复杂度
            - 给定深度
                - 最大：2**(深度-1)（完美二叉树的情况就是最大值）（-1是为了除2）
                - 最小：2**(深度-2)（倒数第二层每个节点都有且只有一个子节点）（-2是为了往回缩一层然后除2）
    - 中序遍历：有一定特性的二叉树的中序遍历能揭示不少信息
        - 完美二叉树：设一个节点的索引为 i ，其右兄弟节点的索引为 i + 2**(总深度-节点深度+1)
        - 完全二叉树：去除最后一层的节点就是完美二叉树
    - 分解问题为 pipeline 形式，然后每个节点都处理所有问题的一个 stage
    - 前序能利用参数，后序能利用参数和返回值；对于需要递归检查某种约束，前序和后序都有可取之处：前序可以传递参数，后序可以获得子最优解
- 具体案例经验：
    - BFS: 用queue，DFS: 用stack
- template
    - DFS
        ```ts
        interface TreeNode {
            val: number;
            left: number;
            right: number;
        }
        function tree(root: TreeNode) {
            if (!root) return;

            do_sth

            // preorder
            const left = tree(root.left);
            // in-order
            const right = tree(root.right);
            // postorder

            do_sth

            return;
        }
        ```
    - BFS
        ```ts
        interface TreeNode {
            val: number;
            left: number;
            right: number;
        }
        function tree(root: TreeNode) {
            if (!root) return;

            let queue: TreeNode[] = [];
            queue.push(root);

            // 循环直到没有下一层了
            while (queue.length) {
                // 清空当前层
                let currentLen = queue.length;
                const nextQueue: TreeNode[] = [];
                while (currentLen) {
                    const node = queue[queue.length - currentLen];

                    do_sth;

                    // 填充下一层
                    if (node.left) {
                        nextQueue.push(node.left)
                    }
                    if (node.right) {
                        nextQueue.push(node.right);
                    }

                    --currentLen;
                }

                queue = nextQueue;
            }
        }
        ```

# graph
- 定义：
    - 本质上就是交叉的树，可以用标记来模拟成每个节点最多四个子节点的树
    - DFS和BFS在这里很重要
        - DFS本质上就是递归
        - BFS本质上就是队列
    - 有向边，无向边
        - 名流问题
    - 图的储存形式
        - general：G = {V, G}
        - 邻接表：类似多叉树的数组形式
            - `graph[from] = <Array_of_to>;`
            - 邻接表的DFS昭示着依赖的排序 (可能需要倒序罢了，就看邻接表的边代表着依赖还是被依赖)
            - 参考207.ts
        - 邻接矩阵
            - n x n的矩阵，1表示i和j有边、0表示没有
            - 有向边和无向边就只是矩阵是否对称的区别
    - 入度、出度
        - 也就是每个节点被多少节点依赖，又依赖多少节点
- logic：
    - 环检测：
        - DFS：onPathTrack + visited，加上遍历过程中的卫语句就行
            - visited用来剪枝，onPathTrack用来入栈出栈和判断环
        - BFS：
            - 把所有一开始入度为0的节点入队，开始遍历
            - 出队当前节点，对其每一个子节点减少入度，并判断子节点入度是不是变成0，为0的话入队
            - 最后队列为空跳出循环了，如果有环，必然有某些节点没被遍历完（因为环节点的入度不为0），判断方法就是遍历节点时维护count，count和总节点数不一致就代表有环
    - 拓扑排序：
        - 拉平一个图，且使其没有任何右依赖左的排序
        - 因此有环是无法拓扑排序的
        - DFS：
            - 为什么邻接表的DFS和拓扑排序有关？
                1. 因为能够往下遍历的都是非环的，遍历到了叶子节点自然就是一组符合拓扑排序的排列
                2. 至于会不会出现两条依赖关系都有相同叶子节点，导致根节点的选择不同产生不同的拓扑排序，这是可能的，但是不要紧，因为拓扑排序对同一张图完全可以有不同的结果，只要保证没有右依赖左就行。从不同的根节点先开始遍历不会破坏拓扑排序
        - BFS：
            - 找入度为0的节点不断入队遍历就完成了
        - 参考210.ts
    - 并查集算法 (Union-Find Algorithm)
        - 用来实现对联通分量的检测的
        - 实现四个方法：find、union、isConnected、getGroups
        - 优化方法：路径压缩、按秩合并(较小的树接到较大的树下)
        - eg
            ```ts
            class UF {
                constructor(n: number) {}
            }
            ```
    - 路径压缩：和dp、动态规划有关系
    - 最大团、极大团搜索算法
- 经验：
    - 有向无向，有环无环的差别非常大
        - 无向有环的复杂度最高，甚至有不少 np-hard 问题
        - 有环的话很容易出现 np-hard 问题
    - template
        - 有向图和无向图差别比较大，这里先写无向有环的
        - eg
            ```ts
            type RequiredResult = number;

            function graphTemplate(from: number[], to: number[]) {
                const [n, m] = [from.length, to.length];
                // build graph
                // 1. adjacent graph
                const graph = new Map<number, number[]>();
                for (let i = 0; i < n; ++i) {
                    const fromResult = graph.get(from[i]);
                    if (fromResult) {
                        fromResult.push(to[i]);
                    } else {
                        graph.set(from[i], [to[i]]);
                    }

                    const ToResult = graph.get(to[i]);
                    if (ToResult) {
                        ToResult.push(from[i]);
                    } else {
                        graph.set(to[i], [from[i]]);
                    }
                }

                // mem.get(i) = 以节点 i 为起始的最大简单路径，这只在有向无环图可用
                // const mem = new Map<number, number>();

                function backtrack(key: number, visited: Set<number>): RequiredResult {
                    const tos = graph.get(key);
                    if (visited.has(key)) {
                        return 0;
                    }

                    if (!tos) {
                        return 1;
                    }

                    // 添加路径
                    visited.add(key);
                    
                    // 往下走，对比子最大值
                    let maxPathLen: RequiredResult = 0;
                    for (const to of tos) {
                        maxPathLen = Math.max(maxPathLen, backtrack(to, visited));
                        // console.log('backtrack return', maxPathLen, key);
                    }
                    
                    // 更新 mem，只在有向无环图可用
                    // mem.set(key, maxPathLen+1);
                    
                    // 删除路径
                    visited.delete(key);

                    return maxPathLen+1;
                }

                const allNodes = Array.from(graph).map(([key, value]) => key);
                let maxPathLen = 0;
                for (const key of allNodes) {
                    // visited 可以用数组，取决于 key 的特性
                    // visited 是简单路径的关键
                    const visited: Set<number> = new Set<number>;
                    // 对每一个节点都进行一次遍历，寻找最大简单路径（np-hard） 
                    const subResult = backtrack(key, visited);
                    maxPathLen = Math.max(maxPathLen, subResult);
                }

                return maxPathLen;

                // // 2. adjacent matrix
                // const graph: number[][] = Array.from({length: n}, _ => Array(m).fill(0))
                // for (let i = 0; i < n; ++i) {
                //     // 可以进一步区分有向和无向，这里展示有向的
                //     const [a, b] = [from[i], to[i]];
                //     graph[a][b] = 1;
                // }
            }
            ```


# queue
- FIFO
- .push(), .pop(), .front(), .back(), .empty()
- priority queue: 
    - implemented by heap, therefore have priority. 
- 注意，BFS一个tree的时候，queue如果用的两层，不可以只判断外层的长度，因为内层必定会有一个array实例，哪怕是空的

# stack
- s.top(); s.pop(); s.push();
- **单调栈**
    - 和单调队列一样，重点是在优先队列之外提供一个复杂度更低的解法。
    - 但单调栈或者队列会抛弃部分节点，而优先队列会保留全部节点
- 经验：
    - 找最大最小，多半可以用到单调栈
    - 单调栈本身就是一种 dp
    - template
        - 单调栈 eg
            ```ts
            const monoStack = [];
            for (let i = 0; i < n; ++i) {
                while (monoStack.length && monoStack[monoStack.length-1] < nums[i]) { // 根据情况换成 ‘<=’
                    const last = monoStack.pop();
                }

                monoStack.push(nums[i]);
            }
            ```

# recursion
- base case: 除了 是否null，还可以试试看用 a是否＞b（比如在a或b会被绝对数值增减的情况下）
- 大框架
    - 终止模块
    - 递归模块
        - 数据获取模块（前序遍历时储存所需数据）
- 重要的是思考每次recursion可以获得什么参数和将要返回什么参数，不要给脑子堆栈
- 还得留意参数ref问题
- 回溯算法
    - 在递归模块中，除了前序获取元素，还要后序删除元素

# 字符串
- General：
    - 字符串对比很多时候都得 m*n 或者 n*2，也就是遍历所有可能性，很少能优化的
    - 经常会有图/多叉树遍历的情况，因为要计算各种排列
- 经典案例：
    - 字符串双指针动态规划：（具体可以看 1143.最长公共子序列）
        - 两个指针指向的值相同时两边同时步进，不同时传递 state
        - eg
            ```ts
            function longestCommonSubSequence(s1: string, s2: string) {
                const [n, m] = [s1.length, s2.length];
                const dp: number[][] = Array.from({length: n}, - => Array(m).fill(0));

                for (let i = 0; i < n; ++i) {
                    for (let j = 0; j < m; ++j) {
                        if (s1[i] !== s2[j]) {
                            // 为什么要对比两个方向？
                            // 不该理解为对比两个方向，这里的意图不是对比取优者，而是统合两个方向的状态传递
                            // 因为每个循环都是i和j都步进了一步的结果，必须要把上次i的状态传下来，然后在步进j时再传j的状态
                            // 所以我们可以在 i 步进时先整体传下来，然后再一步一步传 j ，也可以把 i 的状态转移分散在每次传 j 状态的时候同步传
                            // 所以最后才得出了这么一个看起来很奇怪的 max 对比，实际上这里并不是在对比。
                            // 用先传i的思路想会清晰很多
                            dp[i][j] = Math.max(
                                dp[i-1][j],
                                dp[j-1][j],
                            )

                            // 先传i的代码
                            dp[i][j] = dp[i-1][j];
                            // 这里的对比就是 max，就是在看上次 i 的字符有没有可能和 j 的字符一样，导致相比 [i][j-1] 多了 1，如果确实多了就传到现在
                            if (dp[i][j-1] > dp[i][j]) {
                                // 证明上次 j 加了1
                                dp[i][j] = dp[i][j-1];
                            }
                        } else {
                            // 先传i的代码
                            if (i > 0 && j > 0) {
                                // 为了避免交叉对比的 pattern 重复 count，也就是避免一个字符被 count 两次
                                // 这里比较隐晦的原因是，我们其实不知道实际的公共子序列（如果知道的话这个就直观很多），但我们知道如果 i j 的字符相同，就证明 i j 在公共子序列中，因此两者都往前找一位
                                dp[i][j] += 1 + dp[i-1][j-1];
                            } else {
                                // base case 罢了
                                dp[i][j] += 1;
                            }
                        }
                    }
                }

                return dp[n-1][m-1];
            }
            // 实在不行就理解为，对比 s1[0-i] 和 s2[0-j] 的结果，不管怎么样都传，至少不会漏
            ```
    - 编辑距离：双指针，多叉树遍历
        - template
            ```ts
            // 以 s2 为 target
            function editDis(s1: string, s2: string) {
                const [n, m] = [s1.length, s2.length];

                const mem: number[][] = Array.from({length: n}, _ => Array(n).fill(-1));    // -1 是因为有些编辑距离可以是 0

                function recur(i: number, j: number) {
                    if (i >= n) {
                        return m-j;
                    }

                    if (j >= m) {
                        return n-i;
                    }

                    if (mem[i][j] !== -1) {
                        return mem[i][j];
                    }

                    // 注意我们实际上并没有真的操作原字符串，我们只是模拟了这个操作对 i j 指针的变化，但同时要保证这个指针在原字符串是正确的
                    // 所以有时候下一次递归的 i j 变化才会有些反直觉。
                    if (s1[i] === s2[j]) {
                        recur(i+1, j+1);
                    } else {
                        // insert
                        const reuslt1 = 1 + recur(i, j+1);  // 如果我们真的在 i 位置插入了字符，下一个要对比的理应是 i+1 和 j+1 ，但因为我们只是在模拟，所以实际对比的仍然是原字符串 i 位置的字符串
                        // delete
                        const result2 = 1 + recur(i+1, j);  // 如果我们真的在 i 位置删除了字符，下一个要对比的理应是新的 i 和 j+1 ，但因为我们只是在模拟，所以实际对比的是 i+1 位置的字符串，模拟了 i 位置的字符被删除了
                        // replace
                        const result3 = 1 + recur(i+1, j+1);// 和上面两个逻辑类似
                        const finalResult = Math.min(result1， result2, result3);
                        mem[i][j] = finalResult;
                        return finalResult;
                    }
                }

                return recur(0, 0);
            }
            ```

# 排序相关
- 二分查找
    - 框架
        ```ts
        function binarySearch<T>(arr: T[], target: T): number {
            let left = 0;
            let right = INIT_RIGHT; // arr.length, arr.length - 1
            while ( CONDITION ) {   // left < right, left <= right
                // 在while主要操作就可以避免很多奇怪变体出问题
                let mid = left + ROUND_BEHAVIOUR((right - left)/2);  // 防止溢出
                if ( arr[mid] === target ) {
                    FOUND_BEHAVIOUR;           // return mid, right = mid
                } else if ( arr[mid] < target ) {
                    left = NEXT_LEFT;
                } else if ( arr[mid] > target ) {
                    right = NEXT_RIGHT;   // mid, mid - 1
                }
            }
            RETURN_BEHAVIOUR;   // return left/right/-1/奇怪的condition啥的
        }
        ```
    - 有相当多变体，包括：找一个数，找左边界，找右边界
    - 通用的逻辑：
        - 注意，二分查找不要只局限于mid和target的对比，只要可以分为固定的常数级sub case，就可以使用二分查找思路（详见33.ts
        - floor和ceil影响mid最后会和l重叠还是和r重叠，也影响left和mid或者right和mid之间要不要=，floor就是left和mid对比要，ceil就是right和mid要
        - 无论单数还是双数最后都至多会塌陷到对比最后两个数，这样想方便处理edge case
        - FOUND_BEHAVIOUR能控制最终得到左一-1还是右一+1
        - 左闭右闭和`<=`绑定
        - =mid+1可能越界，而单纯=mid不会越界
    - 找target：左闭右闭
        - INIT_RIGHT = arr.length - 1; CONDITION = left <= right; ROUND_BEHAVIOUR = floor; FOUND_BEHAVIOUR = return mid; NEXT_LEFT = mid + 1; NEXT_RIGHT = mid - 1; RETURN_BEHAVIOUR = mid
        - condition为 `<=` 的原因：
            - 剩最后两个数时，会忽略掉target和left或者right重叠的情况。eg：lm重叠目标在r 或者 rm重叠目标在l，`<` 会跳过这两个cases
            - 数学来讲，考虑闭区间[a, b]，a和b相同时这个区间并不为空，如果 `<` 就会跳过了这个可能性
        - 终结时left和right一定是错开的
        - 没有target时，无法控制在"空隙"左边还是右边。
    - 找左边界（左一）：左闭右开
        - INIT_RIGHT = arr.length; CONDITION = left < right; ROUND_BEHAVIOUR = floor; FOUND_BEHAVIOUR = right = mid; NEXT_LEFT = mid - 1; NEXT_RIGHT = mid; RETURN_BEHAVIOUR = left;
        - 原理：
            - r不用动时，l和mid在动，mid会不断判断有没有更左的target以更新r，反之亦然，因此能找到左一
            - 返回的是left，不是mid，且CONDITION是`<`/终结条件是l=r，最终返回的是l和r重叠的idx，而r一定是左一
            - RETURN_BEHAVIOUR也可以返回right
        - 如果target不存在，返回大于target的第一个元素
            - 因为FOUND和NEXT_RIGHT是一样的
            - mid < target是l=mid+1，但 > target就只是r=mid没有+1，因此必定会被这个mid+1推到"空隙"右边再终结
        - 左闭右闭的版本：
            - INIT_RIGHT = arr.length-1; CONDITION = left <= right; FOUND_BEHAVIOUR = right = mid + 1; NEXT_LEFT = mid - 1; NEXT_RIGHT = mid + 1; RETURN_BEHAVIOUR = left;
            - 但RETURN_BEHAVIOUR不能right，只能是left；
    - 找右边界（右一）
        - 和左边界的FOUND_BEHAVIOUR、ROUND_BEHAVIOUR、RETURN_BEHAVIOUR相反就行了，当然结果也是相反的
    - 没有target时返回-1
        - 记得做边界检查
        - RETURN_BEHAVIOUR做if判断就行，如果等于target就返回，否则返回-1
- 耐心排序
    - 把所有元素按照一定规则分为多个组：组间有排序；一个组内的元素必然能从其左边的组中找到<=该元素的元素。
    - 依次拿牌分组，如果从左到右第一个某一堆最上边的牌大于本牌则压上去，否则创建新组
    - 可以解决 **最长递增子序列** 问题
    - 感觉和图论有点关系


# 原地算法
- 基础做法：
    - use the original/part of array to store the result. then O(1) space complexity
    - use a single extra variable to store the result. then O(1) space complexity
- 原地翻转
    - 原地翻转一个句子的单词，不反转字母（没太明白为什么要用这种方法，直接暴力点不行吗）
        - 把句子的所有字母翻转
        - 再把每个单词单独内部反转
    - 原地轮转数组：有很多方法
        1. 把整个数组翻转过来，再把前n位和剩下的位各自分开再翻转
        2. 环形替换 (力扣189)

# 环相关
- 轮转数组，用 (idx + k) mod n，k是轮转的位数，n是数组长度
- % 可以用来 range control (189.cpp 轮转数组)

# 矩阵相关
- 当你需要思考矩阵遍历时，想想往不同方向时有什么不同含义（参考 240 搜索二维矩阵）
    - 矩阵居然可以和二叉树联动（240题，从右上角往左下看类似二叉排序树）
- 经验：
    - 矩阵很容易 induce 成别的题目，也就是题目转换

# 回文
- 记住，双数和单数的子串分开处理就能把整串对比给简化成仅对比新字符
- 可以把左右区间映射到二维的dp中来实现O(1)的回文判断
    - 以 i 为左，以 j 为右，左下的三角一定为 0，此外需要 i 倒过来遍历（具体到一维里就是先判断相邻 1 的元素，再判断隔一个的元素，再判断隔两个的元素，以此类推）

# 回溯
- 路径前进和后退
- 剪枝
    - 剪枝是最 hack 的，比如 79 的剪枝可以翻转单词，用更低频的字符开始往下，以更高概率发生剪枝
- 可以思考一下**动态规划**和**路径压缩思路**
- 排序好数组可以方便往下走时去重剪枝，对于字符串每一位的往下走在回溯时还能自动获得字典序

# 去重
- 空间换时间：用Set和Map，`f(x) = <cache_result>`
- visited数组：
    - 多维度 visited 可用于多个参数的去重，`f(x, y) = <cache_result>`
        - 例如：图遍历/回溯中用多维visited数组储存cache
    - 注意，如果目标的数据是一位的，只是其某些特征可以用二位表示并解决问题，注意处理边界问题，例如用二维数组储存字符串回文结果（详见131）
- 倒三角遍历：`for x in range(k), for x in range(k+1)`
    - 从k开始遍历就行，会去除permutation的重复，也就是获得combination
- 如果涉及考虑重复元素，或者大小比较的情况，可以尝试给原数组排序
    - 这是一个相当有趣的技巧，本质上就是把重复元素出现顺序固定死了，如果重复元素a不出现，b也不能出现，所以只会有a -> b的情况，不会有a -> b和b -> a同时出现的重复情况。所以这本质上是一个倒三角遍历的变异（这个居然没有例子？）
    - 而且把目标先排序了的话，回溯的顺序刚好就是字典序
    - `if ( i > 0 && nums[i] == nums[i-1] && exist[i-1] == 0 ) {...}`
- 第一个不重复的和最后一个不重复的有细微的差别


# 深度优化
- 找出一些其实不会影响complexity，但逻辑上会减少运算的优化方法
    - 比如反转遍历顺序
- 创建数组是费时的操作。如果想要创建坐标数组，可以用index表示y，item表示x，极致压缩。

# 很白痴的索引问题
- ‘闭’ 是指包含，‘开’是指不包含
- 左闭右开就是常见的取前不取后
- 注意反向遍历时，终结条件是`>= 0`

# other
- i++ or ++i: 
    - i++: return i, then i = i + 1
    - ++i: i = i + 1, then return i
### 哈希冲突
- 开放寻址法
    - 线性探测（Linear Probing）
    - 二次探测（Quadratic Probing）
    - 双重哈希（Double Hashing）
    - 随机探测（Random Probing）
- 哈希表操作复杂度
    - 插入/删除/查询：
        - 平均情况：O(1)（假设哈希函数均匀分布，负载因子适中）。
        - 最坏情况：O(n)（所有键冲突，退化为链表）。
    - 负载因子（α, Load Factor）：
        - 定义：负载因子 = 元素数量/哈希表大小
        - 通常需保持α ≤ 0.7（线性探测）、α ≤ 0.5（二次/双重哈希）、α < 0.9（链地址法）以避免性能下降。

# 经验
- 最 hack 的两种题目是回溯和 dp ，真的很可怕
- 创建多维数组的最快方法：
    ```ts
    function create2DArray(rows, cols) {
        const arr = new Array(rows);
        for (let i = 0; i < rows; i++) {
            arr[i] = new Array(cols).fill(0);
        }
        return arr;
    }
    ```
- 子串遍历可以用滑动窗口
- 进一步优化：滚动变量/数组代替整个变量/数组进行迭代



# to_learn:
- 前序中序后序遍历的迭代实现和Morris遍历
- 二叉树、红黑树、avl树
- 1382.cpp的原地算法
- 105索引问题还没想明白

- dp 找一道做一做
- tree 层序遍历，各种遍历方法
- 146: LRU还没写完
- 300: 耐心排序
- 218：skyline

other: 
    148 skipped
    437 skipped


# 常见题目
- 二叉树
    - 记住前序中序后序就行
