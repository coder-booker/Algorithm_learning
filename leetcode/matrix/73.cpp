class Solution {
public:
    void setZeroes(vector<vector<int>>& matrix) {
        int n, m;
        m = matrix.size();
        n = matrix.at(0).size();
        bool col0_is_0, row0_is_0;
        col0_is_0 = row0_is_0 = 0;

        for ( int i = 0; i < m; ++i ) {
            if ( !matrix.at(i).at(0) ) {
                col0_is_0 = 1;
            }
            if ( col0_is_0 ) {
                break;
            }
        }

        for ( int j = 0; j < n; ++j ) {
            if ( !matrix.at(0).at(j)) {
                row0_is_0 = 1;
            }
            if ( row0_is_0 ) {
                break;
            }
        }

        for ( int i = 0; i < m; ++i ) {
            for ( int j = 0; j < n; ++j ) {
                if ( !matrix.at(i).at(j) ) {
                    matrix.at(i).at(0) = matrix.at(0).at(j) = 0;
                }
            }
        }

        for ( int i = 1; i < m; ++i ) {
            for ( int j = 1; j < n; ++j ) {
                if ( !matrix.at(0).at(j) || !matrix.at(i).at(0) ) {
                    matrix.at(i).at(j) = 0;
                }
            }
        }

        if ( row0_is_0 ) {
            vector<int> temp(n, 0);
            matrix.at(0).assign(temp.begin(), temp.end());
        }

        if ( col0_is_0 ) {
            for ( int i = 0; i < m; ++i ) {
                matrix.at(i).at(0) = 0;
            }
        }
        
        // return matrix
    }
};