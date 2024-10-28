class MinStack {
  // 队列和链表实现差不多，但队列方便些
  private stack: number[];
  private minStack: number[];
  constructor() {
      this.stack = [];
      this.minStack = []; // 维护一个minStack来实现获取最小值
  }

  // 入栈时判断是不是最小
  push(val: number): void {
      if ( val <= this.minStack[this.minStack.length-1] || this.minStack.length === 0 ) {
          this.minStack.push(val);
      };
      this.stack.push(val); 
  }

  pop(): void {
      if ( this.stack[this.stack.length-1] === this.minStack[this.minStack.length-1] ) {
          this.minStack.pop();
      };
      this.stack.pop();
  }

  top(): number {
      return this.stack[this.stack.length-1];
  }

  getMin(): number {
      return this.minStack[this.minStack.length-1];
  }
}

/**
* Your MinStack object will be instantiated and called as such:
* var obj = new MinStack()
* obj.push(val)
* obj.pop()
* var param_3 = obj.top()
* var param_4 = obj.getMin()
*/