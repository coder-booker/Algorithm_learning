class Solution {
public:
    // The key point is that the subarray must be continuous. 
    // If we look at each element one by one and calculate the sum of the subarray ending before the element, we can conclude: 
    // if the sum of the subarray ending before the element is negative, the element itself is already the larger subarray;
    // if the sum of the subarray ending before the element is positive, the element can be added to the subarray to see if the sum can be larger.
    // keep doing this to every element and we can get the result.

    // Then, we have two ways to implement this idea:
    int maxSubArray(vector<int>& nums) {
        // method 1: dp
        vector<int> dp(nums.size(), 0);
        dp.at(0) = nums.at(0);
        int result = dp.at(0);
        for ( int i = 1; i < nums.size(); ++i ) {
            dp.at(i) = nums.at(i) + dp.at(i-1) > nums.at(i) ? nums.at(i) + dp.at(i-1) : nums.at(i);
            result = result < dp.at(i) ? dp.at(i) : result;
        }
        return result;

        // method 2: moving window
        vector<int>::iterator i = nums.begin();
        vector<int>::iterator j = i+1;
        int result = *i;
        int win_sum = *i;
        while (j != nums.end()) {
            if ( win_sum <= 0 and i < j ) {
                win_sum -= *i;
                ++i;
            } else {
                win_sum += *j;
                ++j;
                result = result < win_sum ? win_sum : result;
            }
        }
        return result;
    }
};
