function minPathSum(grid: number[][]): number {
    // if (grid.length === 0 || grid[0].length === 0) {
    //     return 0;
    // }
    let [m, n] = [grid.length, grid[0].length];
    const dp = new Array(n);
    for (let i = 0; i < m; ++i) {
        for (let j = 0; j < n; ++j) {
            if (i === 0) {
                dp[j] = j > 0 ? grid[i][j] + dp[j-1] : grid[i][j];
            } else if (j === 0) {
                dp[j] = i > 0 ? grid[i][j] + dp[j] : grid[i][j];
            } else {
                dp[j] = Math.min(dp[j], dp[j-1]) + grid[i][j];
            }
        }
    }

    return dp[n-1];
};