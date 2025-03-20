function allPali(s: string): number {
  if ( s.length <= 1 ) {
    return s.length;
  }

  let set = new Set<string>();

  function pali(s: string, l: number, r: number): void {
    while ( l >= 0 && r < s.length && s[l] === s[r]) {
      set.add(s.substring(l, r + 1));
      l--;
      r++;
    }
  }

  s.split("").forEach((item, i) => {
    pali(s, i, i);
    pali(s, i, i+1);
  });

  return set.size;
}