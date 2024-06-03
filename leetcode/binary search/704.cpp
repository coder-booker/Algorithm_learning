class Solution {
public:
    int search(vector<int>& nums, int target) {
        int left = 0;
        int right = nums.size() - 1;
        int mid;
        int temp;

        while ( left <= right ) {
            mid = left + (right - left) / 2;
            temp = nums[mid];
            if ( temp == target ) {
                return mid;
            } else if ( temp < target ) {
                left = mid + 1;
            } else if ( temp > target ) {
                right = mid - 1;
            }
        }
        return -1;
    }
};