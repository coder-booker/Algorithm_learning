/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
  function encode(str) {
      const encoded = new Array(26).fill(0);
      for ( let i = 0; i < str.length; ++i ) {
          ++encoded[str.charCodeAt(i) - 97];      // 'a'的ascii code
      }
      return encoded.toString();
  }

  const map = new Map();
  for ( const a of strs ) {
      const k = encode(a);
      if ( map.has(k) ) {
          map.get(k).push(a);
      } else {
          map.set(k, [a]);
      }
  }

  return Array.from(map.values());
};
