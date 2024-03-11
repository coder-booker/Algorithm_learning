class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        unordered_map<char, int> window_map;
        int max_len, window_len;
        max_len = window_len = 0;
        int i, j;
        i = j = 0;
        char right_letter;
        while ( j < s.length() ) {
            right_letter = s.at(j);     // this will convert to char
            ++window_map[right_letter];
            ++j;                        // regularly move right bountary

            // move left boundary if duplicated element occurs
            while ( window_map[right_letter] > 1 ) { // s.at(i) will go away eventually, no need i != j
                --window_map[s.at(i)];
                ++i;
            }

            max_len = max(max_len, j - i);
        }
        return max_len;
    }
};