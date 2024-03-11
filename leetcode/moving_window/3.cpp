class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        unordered_map<char, int> window_map;
        int max_len, window_len;
        max_len = window_len = 0;
        int i, j;
        i = j = 0;
        char left_letter, right_letter;
        while ( j < s.length() ) {
            right_letter = s.at(j);    // this will convert to char
            if ( window_map[right_letter] ) {
                while ( s.at(i) != right_letter ) { // s.at(i) will go away eventually, no need i != j
                    --window_map[s.at(i)];
                    ++i;
                    --window_len;
                }
                --window_map[s.at(i)];
                ++i;
                --window_len;
            }
            // regularly move right bountary
            ++window_map[right_letter];;
            ++window_len;
            max_len = max(max_len, window_len); // or j-i
            ++j;
        }
        return max_len;
    }
};