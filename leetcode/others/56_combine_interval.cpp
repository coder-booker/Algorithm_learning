class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        sort(intervals.begin(), intervals.end(), [](auto& a, auto& b){
            return a[0] < b[0];
        });
        vector<vector<int>> result;
        result.push_back(intervals.at(0));

        for ( int i = 1; i < intervals.size(); ++i ) {
            auto& current = intervals.at(i);
            auto& last = result.back();

            if ( current[0] <= last[1] ) {
                if ( current[1] > last[1] ) {
                    last[1] = current[1];
                }
            } else {
                result.push_back(current);
            }
        }
        return result;
    }
};