class Solution {
public:
    void rotate(vector<int>& nums, int k) {
        // method 1: use extra space
        int n = nums.size();
        vector<int> result(n, 0);
        for ( int i = 0; i < n; ++i ) {
            result.at((i+k) % n) = nums.at(i);
        }
        nums.assign(result.begin(), result.end());

        // method 2: reverse
        
    }
};