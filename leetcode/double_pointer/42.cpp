class Solution {
public:
    int trap(vector<int>& height) {
        vector<int>::iterator left_max, i, right_max, j;
        left_max = i = height.begin();
        right_max = j = height.end()-1;

        int total_volume = 0;
        while ( i != j ) {
            if ( *left_max < *right_max ) {
                if ( *i > *left_max ) {
                    left_max = i;
                } else {
                    total_volume += min(*left_max, *right_max) - *i;
                    ++i;
                }
            } else {
                if ( *j > *right_max ) {
                    right_max = j;
                } else {
                    total_volume += min(*left_max, *right_max) - *j;
                    --j;
                }
            }
        }
        return total_volume;
    }
};