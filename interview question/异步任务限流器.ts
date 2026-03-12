class AsyTaskScheduler {
  private runningTasks: (() => Promise<any>)[];
  private waitingTasks: (() => Promise<any>)[];
  private completeCbs: ((resultList: any[]) => any)[];
  private finishedTasks: Map<number, string>;
  private concurrency: number;
  
  constructor(concurrency: number) {
    this.runningTasks = [];
    this.waitingTasks = [];
    this.completeCbs = [];
    this.finishedTasks = new Map();
    this.concurrency = concurrency;
  }

  public addTask(task: () => Promise<any>) {
    this.waitingTasks.push(task);
    this.runTask();
  }

  // once the current runningTasks is cleared, run the callback
  public onComplete(callback: (resultList: any[]) => any) {
    this.completeCbs.push(callback);
  }

  // 执行 callback，重置下次启动需要重置的资源
  private emitComplete() {
    const args = Array.from(this.finishedTasks).sort((a, b) => {
      return a[0] - b[0];
    }).map(value => value[1]);
    
    this.completeCbs.forEach(cb => {
      cb(args);
    })

    this.finishedTasks = new Map();
    this.runningTasks = [];
  }

  private runTask() {
    if (this.waitingTasks.length === 0 && this.runningTasks.length === this.finishedTasks.size) {
      // 终止循环调用链条
      this.emitComplete();
      return;
    }

    if (this.runningTasks.length - this.finishedTasks.size < this.concurrency) {
      const task = this.waitingTasks.shift();
      // 开始运行
      if (task) {
        this.runningTasks.push(task);
        let currentIndex = this.runningTasks.length;
        task()
        .then(
          _ => {
            // 保存结果到 finishedTasks
            this.finishedTasks.set(currentIndex, 'Resolved');
            Promise.resolve().then(() => this.runTask());
          },
          _ => {
            // 保存结果到 finishedTasks
            this.finishedTasks.set(currentIndex, 'Rejected');
            Promise.resolve().then(() => this.runTask());
          }
        )
      }
    }
  }
}

function test(c: number) {
  const bruh: AsyTaskScheduler = new AsyTaskScheduler(c);

  bruh.onComplete((args: any[]) => console.log(args));

  let count = 0;

  bruh.addTask(() => {
    return new Promise<void>((resolve, reject) => {
      console.log(`Task ${count} added`);
      let current = count++;
      setTimeout(() => {
        console.log(`Task ${current} ended`);
        resolve();
      }, 1000);
    })
  })
  bruh.addTask(() => {
    return new Promise<void>((resolve, reject) => {
      console.log(`Task ${count} added`);
      let current = count++;
      setTimeout(() => {
        console.log(`Task ${current} ended`);
        reject();
      }, 1000);
    })
  })
  bruh.addTask(() => {
    return new Promise<void>((resolve, reject) => {
      console.log(`Task ${count} added`);
      let current = count++;
      setTimeout(() => {
        console.log(`Task ${current} ended`);
        setTimeout(() => {
          console.log(`Next`);
          bruh.addTask(() => {
            return new Promise<void>((resolve, reject) => {
              console.log(`bruh added`);
              let current = count++;
              setTimeout(() => {
                console.log(`bruh ended`);
                resolve();
              }, 500);
            })
          })
        }, 3000);
        resolve();
      }, 3000);
    })
  })
  bruh.addTask(() => {
    return new Promise<void>((resolve, reject) => {
      console.log(`Task ${count} added`);
      let current = count++;
      setTimeout(() => {
        console.log(`Task ${current} ended`);
        resolve();
      }, 500);
    })
  })

}

test(3);