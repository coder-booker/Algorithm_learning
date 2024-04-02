class Solution {
public:
    int subarraySum(vector<int>& nums, int k) {
        if ( nums.empty() ) {
            return 0;
        }
        vector<int> prefix_sum;
        unordered_map<int, int> sum_freq_map;
        int result_count = 0;
        prefix_sum.push_back(0);
        sum_freq_map[0] = 1;
        for ( int i = 0; i < nums.size(); ++i ) {
            // get current prefix
            prefix_sum.push_back(prefix_sum[i] + nums[i]);

            // find map[prefix-k]
            if ( sum_freq_map[prefix_sum[i+1] - k] ) {
                result_count += sum_freq_map[prefix_sum[i+1] - k];
            }

            // update map
            ++sum_freq_map[prefix_sum[i+1]];
        }

        return result_count;
    }
};
