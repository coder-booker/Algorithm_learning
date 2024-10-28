function nextGreaterElement(nums1: number[], nums2: number[]): number[] {
  // nums2构建单调栈
  // 构建一个结果数组，其中每个索引的值都是nums2中对应索引的值右边的第一个最大值。
  // 然后以nums2中对应索引的值和其右边的第一个最大值构建map，达成nums1直接查表就得出结果的答案
  
  // 整体复杂度是O(nums2.length + nums1.length)


  // nums2构建单调栈
  const n: number = nums2.length;
  const idxGreater: number[] = new Array(n);
  const monoStack: number[] = [];
  // 倒着遍历每个元素
  for ( let i = n-1; i >= 0; --i ) {
      const num = nums2[i];
      // 找出右侧最大值
      // 如果栈最后一位没num大，出栈。如果到栈头了还是没找到，跳出循环。
      while ( monoStack.length > 0 && monoStack[monoStack.length - 1] <= num ) {
          monoStack.pop();
      }
      // 此时栈内要么是大于num的数，要么是空的。
      idxGreater[i] = monoStack.length > 0 ? monoStack[monoStack.length - 1] : -1;
      monoStack.push(num);
  }

  // 因为nums1代表的不是index而是nums2里的值本身（注意nums2的值全部唯一），可以且需要额外构建一个map
  const greatermap: { [key: number]: number } = {};
  // 键为nums2的值，值为nums2的值的右侧第一最大
  // 获得右侧第一最大需要index
  nums2.forEach((num, i) => {
      greatermap[num] = idxGreater[i];
  });

  // 最后构建nums1的结果数组
  return nums1.map((num) => greatermap[num]);
};