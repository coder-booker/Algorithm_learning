function generateParenthesis(n: number): string[] {
  const result: string[] = [];

  function backtrack(track: string[], depthLeft: number, depthRight: number) {
      if ( depthLeft === n && depthRight === n ) { 
          result.push(track.join(""));
          return;
      }
      if ( depthLeft < n ) {
          track.push("(");
          backtrack(track, depthLeft+1, depthRight);
          track.pop();
      }
      if ( depthRight < depthLeft ) {
          track.push(")");
          backtrack(track, depthLeft, depthRight+1);
          track.pop();
      }
  }
  const track: string[] = [];
  backtrack(track, 0, 0);

  return result;
};