class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        unordered_map<string, vector<string>> hash_map;
        // for ( int i = 0; i < strs.size(); i++ ) {   // 遍历每个str
        for ( vector<string>::iterator i = strs.begin();
            i != strs.end(); i++ ) {
            // string str = *i;        // 遍历每个str

            vector<char> encode(26, 0);     // 编码成char vector
            for ( string::iterator j = (*i).begin(); j != (*i).end(); j++ ) {  // 遍历str的每个字符
                encode.at((char)(*j)-'a')++;   // 编码
            }

            string encode_str(encode.begin(), encode.end());    // 把编码转成string
            hash_map[encode_str].push_back(*i);    // 把相同编码的str放在同一个vector里
        }

        vector<vector<string>> result;
        for ( unordered_map<string, vector<string>>::iterator iter = hash_map.begin(); 
            iter != hash_map.end(); iter++ ) {   // 遍历hash_map的键
            result.push_back(iter->second);
        }

        return result;
    }
};