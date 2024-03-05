class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        vector<int>::iterator i = nums.begin();
        for ( auto j = i+1; j != nums.end(); ++j ) {
            if ( (*j) != (*i) ) {
                ++i;
                (*i) = (*j);
            }
        }
        return distance(nums.begin(), i)+1;
    }
};