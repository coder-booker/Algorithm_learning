function minWindow(s: string, t: string): string {
    // 滑动窗口
    let valid = 0;  // 子串中有多少个字符的数量符合 t 中对应字符的数量

    // 初始化一切
    const window: Map<string, number> = new Map();
    const tMap: Map<string, number> = new Map();
    for (const c of t) {
        const result = tMap.get(c);
        if (result) {
            tMap.set(c, result+1);
        } else {
            tMap.set(c, 1);
        }
    }
    const tLen = tMap.size;

    // 开始滑动窗口
    let left = 0, right = 0;
    let minLen = Infinity;
    let minStart = 0;
    let found = false;
    while (left <= right && right < s.length) {
        ++right;
        // 添加右侧内容
        const rightC = s[right-1];
        const winResult = window.get(rightC);
        if (winResult) {
            window.set(rightC, winResult+1);
        } else {
            // 不存在，初始化
            window.set(rightC, 1);
        }

        // +1 和 看看要不要更新 valid
        if (window.get(rightC) === tMap.get(rightC)) {
            ++valid;
        }

        // 缩小左侧
        while (valid === tLen && left < right) {
            found = true;
            // 更新题目要求的结果
            if (right-left < minLen) {
                minLen = right-left;
                minStart = left;
            }

            // 删除左侧内容
            const leftC = s[left];
            const winResult = window.get(leftC);    // 必不为 null

            // 窗口记录 -1 和 看看要不要更新 valid
            window.set(leftC, winResult-1);
            if (winResult === tMap.get(leftC)) {
                --valid;
            }

            // 左边界往右
            ++left;
        }
    }
    // console.log(minStart, minStart + minLen)
    return found ? s.slice(minStart, minStart + minLen) : '';
};