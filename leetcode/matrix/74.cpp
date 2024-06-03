class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        // // Method 1: O(m+n)
        // int m, n;
        // m = matrix.size();
        // n = matrix[0].size();
        // int i = 0;
        // while ( i < m && target >= matrix[i][0] ) {
        //     ++i;
        // }
        // if ( i > 0 ) {
        //     i -= 1;
        // }
        // for ( int j = 0; j < n; ++j ) {
        //     if ( matrix[i][j] == target ) {
        //         return 1;
        //     }
        // }
        // return 0;

        // Method 2: BInary search O(log(mn)) = O(log(m)+log(n))
        int m, n, left, right, mid, temp;
        m = matrix.size();      // col
        n = matrix[0].size();   // row
        left = 0;
        right = m*n - 1;

        while ( left <= right ) {
            mid = left + (right - left) / 2;
            temp = matrix[mid/n][mid%n];
            if ( temp == target ) {
                return true;
            } else if ( temp < target ) {
                left = mid + 1;
            } else if ( temp > target ) {
                right = mid - 1;
            }
        }
        return false;
    }
};