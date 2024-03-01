class Solution {
public:
    int longestConsecutive(vector<int>& nums) {
        unordered_set<int> existing_e;
        for ( const int& num : nums ) {         // 引用变量比复制变量效率更高
            existing_e.insert(num);
        }

        int res_len = 0;

        for ( const int& num : existing_e ) {   // 引用变量比复制变量效率更高
            
            int cur = num;  // 使用变量时再声明效率更高
            if ( existing_e.count(cur-1) ) {    // 要使用某种程度上的贪心算法来加快时间
                continue;
            }
            int len = 1;    // 使用变量时再声明效率更高
            while ( existing_e.count(cur+1) ) { // 这里也可以用上
                ++len;
                ++cur;
            }
            // len += 1;
            res_len = max(res_len, len);
        }
        return res_len;


        // leetcode的写法

        // unordered_set<int> num_set;
        // for (const int& num : nums) {
        //     num_set.insert(num);
        // }

        // int longestStreak = 0;

        // for (const int& num : num_set) {
        //     if (!num_set.count(num - 1)) {
        //         int currentNum = num;
        //         int currentStreak = 1;

        //         while (num_set.count(currentNum + 1)) {
        //             currentNum += 1;
        //             currentStreak += 1;
        //         }

        //         longestStreak = max(longestStreak, currentStreak);
        //     }
        // }

        // return longestStreak;   
    }
};