
function longestPalindrome(s: string): string {
  if ( s.length <= 1 ) {
      return s;
  }

  function pali(s: string, l: number, r: number) {
      while ( l >= 0 && r <= s.length && s.charAt(l) === s.charAt(r)) {
          l--;
          r++;
      }
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