function uniquePaths(m: number, n: number): number {
    // 1. 动态规划
    // dp[i][j] 为到达网格的(i, j)的步数
    // dp[i][j] = dp[i-1][j] + dp[i][j-1]
    // 加上滚动变量
    const dp = new Array(n);
    for (let i = 0; i < m; ++i) {
        for (let j = 0; j < n; ++j) {
            if (i === 0 || j === 0) {
                dp[j] = 1;
            } else {
                dp[j] = dp[j-1] + dp[j];  // 左+上
            }
        }
        // console.log(dp);
    }

    return dp[n-1];

    // 2. 算数，但有些精度问题要解决，只是懒得写了
    // let [l, s] = [m, n];
    // if (m < n) {
    //     [l, s] = [n, m];
    // }
    // let ans = 1;
    // let temp = 1;
    // for (let i = 2; (l+s-i) >= s; ++i) {
    //     ans *= l + s - i;
    // }
    // for (let i = 1; i < l; ++i) {
    //     temp *= l - i;
    // }
    // console.log(ans, temp);
    // console.log(ans/temp);
    // return Math.floor(ans/temp);
};