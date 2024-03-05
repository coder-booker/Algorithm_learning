class Solution {
public:
    int maxArea(vector<int>& height) {
        vector<int>::iterator left, i, right, j;
        left = i = height.begin();
        right = j = height.end()-1;

        int max_area = 0;
        int current_area;
        while ( i != j ) {
            // i = max()
            if ( *left < *right ) {
                if ( *i > *left ) {
                    left = i;
                } else {
                    ++i;
                }
            } else {
                if ( *j > *right ) {
                    right = j;
                } else {
                    --j;
                }
            }

            current_area = min(*left, *right) * (right-left);
            max_area = max(max_area, current_area);
        }
        return max_area;
    }
};