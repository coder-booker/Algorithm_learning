class Solution {
public:
    vector<int> searchRange(vector<int>& nums, int target) {
        if ( nums.size() == 0 ) {
            vector<int> res(2, -1);
            return res;
        }
        vector<int> res;
        int left = 0, right = nums.size() - 1;
        int mid;
        int temp;
        // left bound
        while ( left <= right ) {
            // cout << left << ' ' << right << '\n';
            mid = left + (right-left)/2;
            temp = nums[mid];
            if ( temp == target ) {
                right = mid - 1;
            } else if ( temp > target ) {
                right = mid - 1;
            } else if ( temp < target ) {
                left = mid + 1;
            }
        }
        // cout << left << '\n';
        res.push_back(left <= nums.size() - 1 && nums[left] == target ? left : -1);

        left = 0;
        right = nums.size() - 1;
        // right bound
        while ( left <= right ) {
            // cout << left << ' ' << right << '\n';
            mid = left + (right-left)/2;
            temp = nums[mid];
            if ( temp == target ) {
                left = mid + 1;
            } else if ( temp > target ) {
                right = mid - 1;
            } else if ( temp < target ) {
                left = mid + 1;
            }
        }
        // cout << right << '\n';
        res.push_back(right >= 0 && nums[right] == target ? right : -1);

        return res;
    }
};