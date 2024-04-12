class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
        // const int N = nums.size();
        // vector<int> prod_prefix(N, 1);
        // vector<int> prod_suffix(N, 1);
        // vector<int> result(N, 1);

        // vector<int>::iterator i = nums.begin()+1;
        // vector<int>::iterator j = prod_prefix.begin()+1;
        // vector<int>::iterator k = prod_suffix.end()-2;

        // for ( i, j; i != nums.end(); ++i, ++j) {
        //     (*j) = (*(j-1)) * (*(i-1));
        // }
        // for ( i = nums.end()-2, k; i >= nums.begin(); --i, --k ) {
        //     (*k) = (*(k+1)) * (*(i+1));
        // }
        // for ( int r = 0; r < N; ++r ) {
        //     result.at(r) = prod_prefix.at(r) * prod_suffix.at(r);
        // }

        // return result;

        // reduce the space complexity to O(1)
        const int N = nums.size();
        vector<int> result(N, 1);

        vector<int>::iterator i = nums.begin();
        vector<int>::iterator j = result.begin();

        int L = 1;

        for ( i, j; i != nums.end(); ++i, ++j ) {
            *j *= L;
            L *= *i;
        }

        int R = 1;
        for ( i = i-1, j = j-1; i >= nums.begin(); --i, --j ) {
            *j *= R;
            R *= *i;
        }
        return result;
    }
};