function longestCommonSubsequence(text1: string, text2: string): number {
    // 本质上也是回溯+备忘录剪枝，不过回溯很多时候可以重构为 dp
    const m = text1.length, n = text2.length;

    // dp[i][j] = text1[0, i] 和 text2[0, j] 的最长公共子序列
    // dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]) 然后看情况要不要 +1
    const dp = new Array(m);
    for (let i = 0; i < m; ++i) {
        dp[i] = new Array(n);
        for (let j = 0; j < n; ++j) {
            dp[i][j] = 0;
            if (text1[i] === text2[j]) {
                if (i > 0 && j > 0) {
                    dp[i][j] += 1 + dp[i-1][j-1];
                } else {
                    dp[i][j] += 1;
                }
            } else {
                dp[i][j] += Math.max(
                    i > 0 ? dp[i-1][j] : 0,
                    j > 0 ? dp[i][j-1] : 0,
                );
            }

        }
    }

    return dp[m-1][n-1];
};