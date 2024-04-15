class Solution {
public:
    vector<int> spiralOrder(vector<vector<int>>& matrix) {
        int n, m;
        n = matrix.size();
        m = matrix[0].size();
        vector<int> result;

        int rotate_count = 0;
        int i, j;
        i = j = 0;
        int top, bottom, left, right;
        top = left = 0; bottom = n-1; right = m-1;
        for ( int r = 0; r < n*m; ++r ) {
            result.push_back(matrix[i][j]);
            if ( rotate_count == 0 ) {
                if ( j < right ) {
                    ++j;
                } else {
                    ++rotate_count;
                }
            }

            if ( rotate_count == 1 ) {
                if ( i < bottom ) {
                    ++i;
                } else {
                    ++rotate_count;
                }
            }

            if ( rotate_count == 2 ) {
                if ( j > left ) {
                    --j;
                } else {
                    ++rotate_count;
                }
            }

            if ( rotate_count == 3 ) {
                if ( i > top+1 ) {
                    --i;
                } else {
                    rotate_count = 0;
                    j += 1;
                    top += 1;
                    left += 1;
                    bottom -= 1;
                    right -= 1;
                }
            }
        }
        return result;
    }
};