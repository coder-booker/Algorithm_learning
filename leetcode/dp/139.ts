function wordBreak(s: string, wordDict: string[]): boolean {
    const dictMap = new Set<string>(wordDict);
    dictMap.add('');  // base case

    // dp[i] = can s[0, i]（前闭后开） be concatenated by the dictMap?
    const dp: boolean[] = Array(s.length+1).fill(false);
    dp[0] = true;   // base case s[0-0]

    for (let i = 0; i < s.length; ++i) {
        const subS = s.slice(0, i+1);
        if (dictMap.has(subS)) {
            dp[i+1] = true;
            continue;
        }

        for (let j = 0; j < wordDict.length; ++j) {
            const len = wordDict[j].length;
            const pivot = i+1-len;
            const subS2 = s.slice(pivot, i+1);
            if (dp[pivot] && dictMap.has(subS2)) {
                dp[i+1] = true;
                break;
            }
        }
    }

    // console.log(dp)

    return dp[dp.length-1];
};