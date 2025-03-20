function letterCombinations(digits: string): string[] {
  if ( digits.length === 0 ) {
    return [];
  }

  const numLettersMap = new Map();
  numLettersMap.set("1", [""]);
  numLettersMap.set("2", ["a", "b", 'c']); 
  numLettersMap.set("3", ["d", 'e', 'f'])
  numLettersMap.set("4", ["g", 'h', 'i'])
  numLettersMap.set("5", ["j", 'k', 'l']);
  numLettersMap.set("6", ["m", 'n', 'o']);
  numLettersMap.set("7", ["p", 'q', 'r', 's']);
  numLettersMap.set("8", ["t", 'u', 'v']);
  numLettersMap.set("9", ["w", 'x', 'y', 'z']);

  const n = digits.length;

  const result: string[] = [];

  function backtrack(digitIdx: number, track: string[]) {
    if ( track.length === n ) result.push(track.join(''));
    if ( digitIdx === n ) return;

    const letters: string[] = numLettersMap.get(digits[digitIdx]);
    for ( let j = 0; j < letters.length; ++j ) {
        track.push(letters[j]);
        backtrack(digitIdx+1, track);
        track.pop();
    }
  }

  const track: string[] = [];
  backtrack(0, track);

  return result;
};