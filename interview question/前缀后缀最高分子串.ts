// 给定一个前缀词p、后缀词n、测试字符串s，定义前缀匹配分p_score为前缀词后x位与测试字符串前缀x位相同的位数x，后缀匹配分n_score为后缀词前x位与测试字符串后x位相同的位数x，最高分子串为p_score+n_score，求最高分子串。


// 事实上我应该没看明白题目，这里记录的应该有误。
// 不过答题思路应该就是前缀后缀匹配度的dp。前缀dp就是已i为开头的子串的最大匹配度，后缀dp就是以j为结尾的子串的最大匹配度，然后找出前缀dp[i] + 后缀dp[j] 且 i <= j 的最大的结果即可。


// 注意prefix的i是反过来的，因为是从后往前匹配的。
function prefixMatch(s: string, p: string, i: number): number {
  const sLen = s.length;
  const pLen = p.length;
  let resScore: number = 0;
  
  const subS = s.substring(sLen - i - 1, sLen);
  const subSLen = subS.length;
  let sIdx = 0;
  let pIdx = pLen - 1;
  while ( pIdx >= 0 && sIdx < subSLen && p[pIdx] === subS[sIdx] ) {
    resScore++;
    sIdx++;
    pIdx--;
  }

  return resScore;
}

function suffixMatch(s: string, n: string, i: number): number {
  const sLen = s.length;
  const nLen = n.length;

  let resScore: number = 0;
  
  const subS = s.substring(0, sLen - i);
  const subSLen = subS.length;
  let sIdx = subSLen - 1;
  let nIdx = 0;
  while ( sIdx >= 0 && nIdx < nLen && n[nIdx] === subS[sIdx] ) {
    resScore++;
    sIdx--;
    nIdx++;
  }

  return resScore;
}

function maxSubstring(s: string, p: string, n: string): string {
  const sLen = s.length;
  let p_scores: number[] = new Array(sLen);
  let n_scores: number[] = new Array(sLen);
  let result: string;

  for (let i = 0; i < sLen; i++) {
    p_scores[i] = prefixMatch(s, p, i);
    n_scores[i] = suffixMatch(s, n, i);
  }

  // 得到前缀匹配分和后缀匹配分之后，只能暴力尝试找到最优组合了
  p_scores.forEach((p_score, i) => {
    for ( let n_score of n_scores ) {
      // to do
    } 
  })

  result = "";

  return result;
}