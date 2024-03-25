class Solution {
public:
    vector<int> findAnagrams(string s, string p) {
        vector<int> result;
        if ( p.length() > s.length() ) {
            return result;
        }
        int p_len, s_len;
        p_len = p.length();
        s_len = s.length();

        vector<char> s_encode(26, 0), p_encode(26, 0);
        int i, j;
        for ( i = 0; i < p_len; ++i ) {
            p_encode.at((char)(p.at(i))-'a')++; // encode the target string
            s_encode.at((char)(s.at(i))-'a')++; // init the first sub-string to be checked
        }
        string p_encode_str(p_encode.begin(), p_encode.end());
        i = 0;
        j = p_len-1;
        // string 
        for ( i, j; j < s_len; ++i, ++j) {
            string s_encode_str(s_encode.begin(), s_encode.end());
            if ( s_encode_str == p_encode_str ) {
                result.push_back(i);
            }
            // 去除左hash
            s_encode.at((char)(s.at(i))-'a')--;

            // 添加右hash
            if ( j < s_len-1 ) {
                s_encode.at((char)(s.at(j+1))-'a')++;
            }
        }
        return result;
    }
};
