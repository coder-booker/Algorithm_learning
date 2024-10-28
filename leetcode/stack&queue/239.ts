class DoubleNode {
    public prev: DoubleNode | null;
    public next: DoubleNode | null;
    public val: number;

    constructor(val: number = 0) {
        this.val = val;
    }
}
class DoubleLinkedList {

    private head: DoubleNode | null;
    private tail: DoubleNode | null;
    public length: number;

    constructor() {
        this.head = null;
        this.tail = this.head;
        this.length = 0;
    }

    push(val: number): void {
        if ( this.length === 0 ) {
            this.head = new DoubleNode(val);
            this.tail = this.head;
        } else {
            const node = new DoubleNode(val);
            node.prev = this.tail;
            this.tail.next = node;
            this.tail = node;
        }
        ++this.length;
    }
    pop(): void {
        if ( this.length === 0 ) return
        if ( this.head === this.tail ) {
            this.tail = null;
        } else {
            // 先把tail往前移
            this.tail = this.tail.prev;
            // 再把原tail去除
            this.tail.next = null;
        }
        --this.length;
    }
    shift(): void {
        if ( this.length === 0 ) return
        if ( this.head === this.tail ) {
            this.head = null;
        } else {
            // 先把head往后移
            this.head = this.head.next;
            // 再把原head去除
            this.head.prev = null;
        }
        --this.length;
    }
    getFirst(): number {
        if ( this.length === 0 ) return -Infinity;
        return this.head.val;
    }
    getLast(): number {
        if ( this.length === 0 ) return -Infinity;
        return this.tail.val;
    }
}
class MonoMaxQueue {
    // 队列和链表实现差不多，但队列方便些
    private q: DoubleLinkedList;

    constructor() {
        this.q = new DoubleLinkedList();
    }

    // 入堆时不停判断前面是不是更小，如果是则剔除前面
    push(val: number): void {
        while ( this.q.length > 0 && this.q.getLast() < val ) {
            this.q.pop();
        }
        this.q.push(val);
    }

    // 队列的pop是pop第一位，也就是shift
    shift(): void {
        if ( this.q.length > 0 ) {
            this.q.shift();
        };
    }

    getMax(): number {
        return this.q.getFirst();
    }
}

function maxSlidingWindow(nums: number[], k: number): number[] {
    if ( k <= 1 ) {
        return nums;
    }
    // 构建单调队列
    const monoMaxQueue: MonoMaxQueue = new MonoMaxQueue();

    const n = nums.length;
    const result: number[] = [];

    // init the queue
    for ( let i = 0; i < k; ++i ) {
        monoMaxQueue.push(nums[i]);
    }
    result[0] = monoMaxQueue.getMax();

    // 遍历nums
    for ( let i = k; i < n; ++i ) {
        // window右侧先进队列
        monoMaxQueue.push(nums[i]);
        if ( nums[i-k] === monoMaxQueue.getMax() ) {
            monoMaxQueue.shift();
        }
        // result push max的栈顶
        result.push(monoMaxQueue.getMax());
    }

    return result;
};

// 这道题比较特殊，我这里自己实现链表肯定比数组的O(n)shift快，但因为数组储存了index可以加快速度，导致链表的优势不明显。
// 但就复杂度而言，链表肯定比数组低


// function maxSlidingWindow(nums: number[], k: number): number[] {
//     if ( k <= 1 ) {
//         return nums;
//     }
//     // 构建单调队列
//     const monoMaxQueue: number[] = [];

//     const n = nums.length;
//     const result: number[] = [];

//     // init the queue
//     for ( let i = 0; i < k; ++i ) {
//         // const num = nums[i];
//         while ( monoMaxQueue.length && nums[monoMaxQueue[monoMaxQueue.length-1]] <= nums[i] ) {
//             monoMaxQueue.pop();
//         }
//         monoMaxQueue.push(i);
//     }
//     result.push(nums[monoMaxQueue[0]]);

//     // 遍历nums
//     for ( let i = k; i < n; ++i ) {
//         // const num = nums[i];
//         while ( monoMaxQueue.length && nums[monoMaxQueue[monoMaxQueue.length-1]] <= nums[i] ) {
//             monoMaxQueue.pop();
//         }
//         monoMaxQueue.push(i);
//         while ( i-k >= monoMaxQueue[0] ) {
//             monoMaxQueue.shift();
//         }
//         // result push max的栈顶
//         // result.push(monoMaxQueue[0]);
//         result.push(nums[monoMaxQueue[0]]);
//     }

//     return result;
// };