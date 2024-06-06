class Solution {
public:
    void rotate(vector<int>& nums, int k) {
        // // method 1: use extra space
        // int n = nums.size();
        // vector<int> result(n, 0);
        // for ( int i = 0; i < n; ++i ) {
        //     result.at((i+k) % n) = nums.at(i);
        // }
        // nums.assign(result.begin(), result.end());

        // // method 2: direct jump
        // int n = nums.size();
        // int count = 0;
        // int i = 0;
        // int current = 0;
        // int next_i = (i + k) % n;
        // int interm_value = nums[i];
        // while ( count < n ) {
        //     next_i = (i + k) % n;
        //     swap(interm_value, nums[next_i]);
        //     ++count;
        //     if ( count < n && next_i == current ) {
        //         i = ++current;
        //         interm_value = nums[i];
        //     } else {
        //         i = next_i;
        //     }
        // };

        // method 3: partial reverse
        int n = nums.size();
        if ( n > 1 ) {
            reverse(nums.begin(), nums.end());
            reverse(nums.begin(), nums.begin()+(k%n));
            reverse(nums.begin()+(k%n), nums.end());
        }
    }
};
