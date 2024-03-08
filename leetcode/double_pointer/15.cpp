class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        // 首先，n数之和就是递归的两数之和
        // 两数之和两种思路实现：
        // 1. 排序，双指针向中间走
        // 2. 哈希表找target_sum - current（空间换时间）
        // 但这题有重复项，哈希表会太过复杂，因此采用解法1

        sort(nums.begin(), nums.end());

        vector<vector<int>> all_result;
        int target = 0;     // as specified in description
        vector<int> sub_result(3);
        int sub_target;

        vector<int>::iterator left, right;
        int current_sub_sum;
        for ( auto i = nums.begin(); i != nums.end(); ++i ) {
            sub_result.at(0) = *i;
            sub_target = target - *i;
            left = i+1;             // 每次找sub_result都往右，因为左侧的可能性都遍历完了
            right = nums.end()-1;
            while ( left < right ) {    // 开始在sub范围内缩小范围
                current_sub_sum = *left + *right;
                if ( current_sub_sum > sub_target ) {
                    --right;
                } else if ( current_sub_sum < sub_target ) {
                    ++left;
                } else {
                    sub_result.at(1) = *left;
                    sub_result.at(2) = *right;
                    all_result.push_back(sub_result);
                    // cout << sub_result.at(0) << ' ' << endl;
                    // 跳过和当前sub组合一样的数来避免重复的组合; 由于有排序，所以一样的数会紧贴彼此
                    while ( left < right && *left == sub_result.at(1) ) ++left;
                    while ( left < right && *right == sub_result.at(2) ) --right;
                }
            }
            while ( i+1 != nums.end() && *(i+1) == *i ) ++i;     // same as line 35
        }
        return all_result;
    }
};