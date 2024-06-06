class Solution {
public:
    int coinChange(vector<int>& coins, int amount) {
        if ( amount == 0 ) {
            return 0;
        }
        vector<int> dp(amount+1, amount+1);
        dp[0] = 0;       // so the edge case "i-coins[j]==0" can be handle
        for ( int i = 0; i < dp.size(); ++i ) {
            for ( int j = 0; j < coins.size(); ++j ) {
                if ( i - coins[j] >= 0 ) {
                    dp[i] = min(dp[i], dp[i-coins[j]] + 1);
                }
            }
        }
        return dp[amount] != amount+1 ? dp[amount] : -1;

        // if ( amount == 0 ) {
        //     return 0;
        // }
        // vector<int> dp(amount, amount+1);
        // // dp[0] = 0;
        // for ( int i = 0; i < dp.size(); ++i ) {
        //     for ( int coin : coins ) {
        //         if ( i+1 - coin > 0 ) {
        //             dp[i] = min(dp[i], dp[i-coin] + 1);
        //         } else if ( i+1 - coin == 0 ) {
        //             dp[i] = 1;
        //         }
        //     }
        // }
        // return dp[amount-1] != amount+1 ? dp[amount-1] : -1;
    }
};