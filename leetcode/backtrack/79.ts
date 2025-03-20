function exist(board: string[][], word: string): boolean {
    const w = word.length;
    const m = board.length;
    const n = board[0].length;
    if ( w > m*n ) return false;
    const d = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    
    let found = false;

    function backtrack(x: number, y: number, idx: number, visited: boolean[][]): void {
        if ( idx === w ) {
            found = true;
            return
        }
        if ( x === n || y === m || x < 0 || y < 0 || found || board[y][x] !== word[idx] || visited[y][x] ) return;

        for ( let i = 0; i < 4; ++i ) {
            const [dx, dy] = d[i];
            visited[y][x] = true;
            backtrack(x+dx, y+dy, idx+1, visited);
            visited[y][x] = false;
        }
    }

    // 优化1: 特定情况下翻转word来加快剪枝的发生
    const wordCount = new Map<string, number>();
    for ( let i = 0; i < w; ++i ) {
        wordCount.set(word[i], wordCount.has(word[i]) ? wordCount.get(word[i])+1 : 0);
    }
    if ( wordCount.get(word[0]) > wordCount.get(word[w-1]) ) {
        word = Array.from(word).reverse().join("");
    }
    // 优化2：判断board和word的字母数量，如果某字母在后者中比前者中多则返回false
    const boardCount = new Map<string, number>();
    for ( let i = 0; i < m; ++i ) {
        for ( let j = 0; j < n; ++j ) {
            boardCount.set(board[i][j], boardCount.has(board[i][j]) ? boardCount.get(board[i][j])+1 : 0); 
        }
    }
    for ( let i = 0; i < w; ++i ) {
        if ( wordCount.get(word[i]) > boardCount.get(word[i]) ) return false;
    }


    const visited: boolean[][] = Array.from({ length: m }, () => Array(n).fill(false));
    for ( let i = 0; i < m; ++i ) {
        for ( let j = 0; j < n; ++j ) {
            if ( board[i][j] === word[0] ) {
                backtrack(j, i, 0, visited);
            }
        }
    }
    return found;
};