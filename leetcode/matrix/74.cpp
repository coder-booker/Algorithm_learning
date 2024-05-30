class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        int m, n;
        m = matrix.size();
        n = matrix[0].size();
        // for ( int i = 0; i < m; ++i ) {
            
        // }
        int i = 0;
        while ( i < m && target >= matrix[i][0] ) {
            ++i;
            // cout << i << '\n';
        }
        if ( i > 0 ) {
            i -= 1;
        }
        for ( int j = 0; j < n; ++j ) {
            if ( matrix[i][j] == target ) {
                return 1;
            }
        }
        return 0;
    }
};