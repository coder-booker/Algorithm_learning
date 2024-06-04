class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        int row = matrix.size(), col = matrix[0].size();
        int i = 0, j = col - 1;
        int current = matrix[i][j];
        while ( i < row && j >= 0 ) {
            current = matrix[i][j];
            if ( current == target ) {
                break;
            } else if ( current < target ) {
                ++i;
            } else if ( current > target ) {
                --j;
            }
        }
        // cout << current << endl;
        return current == target;
    }
};