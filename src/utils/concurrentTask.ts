/*
 * @Author: chessman cjb15770595346@163.com
 * @Date: 2023-07-30 16:01:10
 * @LastEditors: chessman cjb15770595346@163.com
 * @LastEditTime: 2023-07-30 16:15:16
 * @FilePath: /framework-console-core/src/utils/ConcurrentTask.ts
 * @Description: 控制任务执行并发数
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
type Task = {
  func: () => Promise<any>;
  resove: (value: unknown) => void;
  reject: (value: unknown) => void;
};

class ConcurrentTask {
  private runing: number;
  private task: Task[];
  private runingCount: number;
  constructor(concurrentTaskCount = 2) {
    this.runing = concurrentTaskCount;
    this.task = [];
    this.runingCount = 0;
  }
  public add(func: () => Promise<any>) {
    return new Promise((resove, reject) => {
      this.task.push({
        func,
        reject,
        resove,
      });
      this.run();
    });
  }

  private run() {
    while (this.runingCount < this.runing && this.task.length > 0) {
      const { func, resove, reject }: Task = this.task.shift()!;
      this.runingCount++;
      func()
        .then(resove, reject)
        .finally(() => {
          this.runingCount--;
          this.run();
        });
    }
  }
}

/**
 * @description 默认同时进行两个任务
 */

export const superTask = new ConcurrentTask();
export default ConcurrentTask;
