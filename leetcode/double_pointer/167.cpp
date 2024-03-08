class Solution {
public:
    vector<int> twoSum(vector<int>& numbers, int target) {
        vector<int>::iterator begin = numbers.begin();
        auto i = begin;
        vector<int>::iterator j = numbers.end()-1;

        int current_sum;
        vector<int> res;
        while ( i != j ) {
            current_sum = *i + *j;
            if ( current_sum == target ) {
                // res = {i-begin+1, j-begin+1};    vector初始化不能使用任何运算
                res.push_back(i-begin+1);
                res.push_back(j-begin+1);
                break;
            } else if ( current_sum > target ) {
                --j;
            } else if ( current_sum < target ) {
                ++i;
            }
        }
        return res;
    }
};