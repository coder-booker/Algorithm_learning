function partition(s: string): string[][] {
    const n = s.length;
    if (n === 0) return [];

    const result: string[][] = [];
    const track: string[] = [];

    // 加入动态规划记录去除重复计算，dp[i][j]表示s.slice(i, j+1)是否回文，也就是s.slice(i+1, j)是否回文，以此类推。
    // 把i > j和i == j的情况都视为true，以此让代码更优雅
    // 可以注意到这个二维dp的传播方向是左下往右上，因此从左下开始推
    // 也可以在每次判断的时候动态计算，和并查集有点类似
    const dp: boolean[][] = new Array(n).fill(false).map(() => new Array(n).fill(false));
    for (let l = n - 1; l >= 0; --l) {
        for (let r = 0; r < n; ++r) {
            if (l >= r) {
                dp[l][r] = true;
            } else {
                dp[l][r] = dp[l + 1][r - 1] && s[l] == s[r];
            }
        }
    }
    // 左闭右开
    function isPali(left: number, right: number): boolean {
        // // Method 1: 暴力
        // while ( left < right && s[left] === s[right-1] ) {
        //     ++left;
        //     --right;
        // }
        // return !(left < right); // 如果是回文则true，否则false

        // Method 2: dp cache
        return dp[left][right - 1];
    }

    function backtrack(startIdx: number): void {
        // presume startIdx前的所有组合已经被处理过了，开始尝试startIdx开始到s结尾的所有组合
        if (startIdx === n) {
            result.push(track.slice());
            return;
        }
        for (let i = startIdx + 1; i <= n; ++i) {    // <= n是因为i是‘右开’的右边界
            if (isPali(startIdx, i)) { // 判断下一个回文子串
                track.push(s.slice(startIdx, i));
                backtrack(i);
                track.pop();
            }
        }
    }

    backtrack(0);
    return result;
};