class Solution {
public:
    int lengthOfLIS(vector<int>& nums) {
        const int n_l = nums.size();
        vector<int> dp(n_l, 1);
        int result = 0;
        for ( int i = 0; i < n_l; ++i ) {
            for ( int j = 0; j < i; ++j ) {
                if ( nums[j] < nums[i] ) {
                    if ( dp[i] < dp[j]+1 ) {
                        dp[i] = dp[j]+1;
                    }
                }
            }
            // update the longest length
            if ( result < dp[i] ) {
                result = dp[i];
            }
        }
        return result;

    }
};