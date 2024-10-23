function openLock(deadends: string[], target: string): number {

  const moveUp = (combination: string, i: number): string => {
      const a = combination.split('');
      if ( a[i] === '9' ) a[i] = '0';
      else a[i] = String.fromCharCode(a[i].charCodeAt(0) + 1);
      return a.join('');
  };
  const moveDown = (combination: string, i: number): string => {
      const a = combination.split('');
      if ( a[i] === '0' ) a[i] = '9';
      else a[i] = String.fromCharCode(a[i].charCodeAt(0) - 1);
      return a.join('');
  };



  // BFS，把每次拨轮的可能性视为一层，然后遍历
  // 而每个节点都是一次拨轮，其子节点是这个节点的下一个可能节点。根据deadends的条件把某些位置的节点减少就行
  // 还有一点，每位的可能性只有0到9，不会有10或者-1
  const deadSet = new Set(deadends);
  if ( deadSet.has('0000') ) return -1;

  const visited = new Set(['0000']);

  const q: Array<string[]> = [['0000']];
  let count: number = 0;
  while ( q[0].length > 0 ) {
      const layer: string[] = q.shift();
      const next_layer: string[] = [];

      for ( let possibility of layer ) {
          if ( possibility === target ) return count;
          
          // 处理每一位数的可能性
          for ( let i = 0; i < 4; ++i ) {
              const a = moveUp(possibility, i);
              if ( !(deadSet.has(possibility) || visited.has(a)) ) {
                  next_layer.push(a);
                  visited.add(a);
              }
              const b = moveDown(possibility, i);
              if ( !(deadSet.has(possibility) || visited.has(b)) ) {
                  next_layer.push(b);
                  visited.add(b);
              }
          };
      }
      ++count;
      q.push(next_layer);
  }
  return -1;
};

// or 
function openLock(deadends: string[], target: string): number {

    const moveUp = (combination: string, i: number): string => {
        const a = combination.split('');
        if ( a[i] === '9' ) a[i] = '0';
        else a[i] = String.fromCharCode(a[i].charCodeAt(0) + 1);
        return a.join('');
    };
    const moveDown = (combination: string, i: number): string => {
        const a = combination.split('');
        if ( a[i] === '0' ) a[i] = '9';
        else a[i] = String.fromCharCode(a[i].charCodeAt(0) - 1);
        return a.join('');
    };



    // BFS，把每次拨轮的可能性视为一层，然后遍历
    // 而每个节点都是一次拨轮，其子节点是这个节点的下一个可能节点。根据deadends的条件把某些位置的节点减少就行
    // 还有一点，每位的可能性只有0到9，不会有10或者-1
    const deadSet = new Set(deadends);
    if ( deadSet.has('0000') ) return -1;

    const visited = new Set(['0000']);

    const q: string[] = ['0000'];
    let count: number = 0;
    while ( q.length > 0 ) {
        const size = q.length;

        for ( let i = 0; i < size; ++i ) {
            const possibility = q.shift();
            if ( possibility === target ) return count;
            
            // 处理每一位数的可能性
            for ( let j = 0; j < 4; ++j ) {
                const a = moveUp(possibility, j);
                if ( !(deadSet.has(possibility) || visited.has(a)) ) {
                    q.push(a);
                    visited.add(a);
                }
                const b = moveDown(possibility, j);
                if ( !(deadSet.has(possibility) || visited.has(b)) ) {
                    q.push(b);
                    visited.add(b);
                }
            };
        }
        ++count;
    }
    return -1;
};