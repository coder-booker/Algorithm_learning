function largestRectangleArea(heights: number[]): number {
    // 要点：
    // 1. loop 反转
    // 2. 单调栈

    // 这三个全都存的 index 而非 value
    const leftFirstLess: number[] = Array(heights.length).fill(-1);
    const rightFirstLess: number[] = Array(heights.length).fill(heights.length);
    const ascMonoStack: number[] = [];

    heights.forEach((element, i) => {
        while (ascMonoStack.length > 0 && element < heights[ascMonoStack[ascMonoStack.length-1]]) {
            // 弹出时，记录被弹出者的最右
            rightFirstLess[ascMonoStack[ascMonoStack.length-1]] = i;
            ascMonoStack.pop();
        }
        
        // 进入后，记录进入者的最左
        if (ascMonoStack.length > 0) {
            leftFirstLess[i] = ascMonoStack[ascMonoStack.length-1];
        } else {
            leftFirstLess[i] = -1;
        }
        
        ascMonoStack.push(i);
    });

    let maxArea = 0;
    for (let i = 0; i < heights.length; ++i) {
        const current: number = (rightFirstLess[i]-leftFirstLess[i]-1) * heights[i];
        maxArea = Math.max(maxArea, current);
    }

    return maxArea;
};