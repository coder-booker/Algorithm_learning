class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        vector<int> dp(nums.size(), 0);
        dp.at(0) = nums.at(0);
        int result = dp.at(0);
        for ( int i = 1; i < nums.size(); ++i ) {
            dp.at(i) = nums.at(i) + dp.at(i-1) > nums.at(i) ? nums.at(i) + dp.at(i-1) : nums.at(i);
            result = result < dp.at(i) ? dp.at(i) : result;
        }
        return result;
    }
};
