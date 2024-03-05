class Solution {
public:
    int removeElement(vector<int>& nums, int val) {
        vector<int>::iterator i = nums.begin();
        for ( auto j = i; j != nums.end(); ++j ) {
            if ( (*j) != val ) {
                (*i) = (*j);
                ++i;
            }
        }
        return distance(nums.begin(), i);
    }
};