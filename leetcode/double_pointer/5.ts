function longestPalindrome(s: string): string {
    if ( s.length <= 1 ) {
        return s;
    }

    function pali(s: string, l: number, r: number) {
        while ( l >= 0 && r < s.length && s.charAt(l) === s.charAt(r)) {
            l--;
            r++;
        }
        // 因为是同时往外扩的，也得同时往内缩，而substring的左闭右开导致了左+1而右不用动
        // 而无论如何都返回substring而不是代表错误的空字符，是因为跳出while循环的那一对字符，因为往内缩了，会被忽略
        return s.substring(l + 1, r);
    }

    let result: string = "";
    s.split("").forEach((item, i) => {
        let paliStr1: string = pali(s, i, i);
        let paliStr2: string = pali(s, i, i+1);
        result = result.length > paliStr1.length ? result : paliStr1;
        result = result.length > paliStr2.length ? result : paliStr2;
    });

    return result;
};