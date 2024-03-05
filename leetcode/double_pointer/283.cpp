class Solution {
public:
    void moveZeroes(vector<int>& nums) {
        // method 1
        // double-pointer, but swap, not duplicate
        // this one is faster
        vector<int>::iterator i = nums.begin();
        for ( auto j = i; j != nums.end(); ++j ) {
            if ( (*j) != 0 ) {
                swap(*i, *j);
                ++i;
            }
        }

        // method 2
        // traditional duplicate
        // this one is slower
        vector<int>::iterator i = nums.begin();
        for ( auto j = i; j != nums.end(); ++j ) {
            if ( (*j) != 0 ) {
                (*i) = (*j);
                ++i;
            }
        }
        for ( i; i != nums.end(); ++i ) {
            *(i) = 0;
        }
    }
};

class Solution {
public:
    void moveZeroes(vector<int>& nums) {
        vector<int>::iterator i = nums.begin();
        for ( auto j = i; j != nums.end(); ++j ) {
            if ( (*j) != 0 ) {
                (*i) = (*j);
                ++i;
            }
        }
        for ( i; i != nums.end(); ++i ) {
            *(i) = 0;
        }
    }
};