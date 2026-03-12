function canMatch(base: string, targets: string[]) {
  const baseOneCount = Array.from(base.matchAll(/1/g)).length;
  let possibilities = new Set();
  // 1. 算出所有 base 的可能
  // 只可能把 1 往后放
  function generatePossibilities(lastStr: string, i: number, j: number) {  // i 是1， j 是0
    const subArr = lastStr.split("");
    [subArr[i], subArr[j]] = [subArr[j], subArr[i]];
    const subStr = subArr.join("");
    // base case
    if (possibilities.has(subStr)) return;
    possibilities.add(subStr)

    for (let k = 0; k < subArr.length; k++) {
      for (let t = k + 1; t < subArr.length; t++) {
        if (subArr[k] === "1" && subArr[t] === "0") {
          generatePossibilities(subStr, k, t);
        }
      }
    }
  }

  generatePossibilities(base, 0, 1);


  // 2. 回溯填充 ? 来看看两者是否可能一致
  function backtrack(currentComb: string[], oneCount: number, startI: number): boolean {
    
    // 剪枝：
    // 1. base 中的1比 current 少就不可能了
    if (oneCount > baseOneCount) {
      return false;
    }
    // 2. base 中prefix 1的数量如果比当前的 prefix 1 的数量少就已经代表不可能了，不需要往下
    // ...todo

    if (possibilities.has(currentComb.join(''))) {
      return true;
    }

    let result = false;
    for (let i = startI; i < currentComb.length; ++i) {
      if (currentComb[i] === '?') {
        currentComb[i] = '0';
        console.log('left go down at', i, currentComb);
        result = result || backtrack(currentComb, oneCount, i+1);
        currentComb[i] = '1';
        console.log('right go down at', i, currentComb);
        result = result || backtrack(currentComb, oneCount + 1, i+1);
        currentComb[i] = '?';
        break; // 找到第一个就 break
      }
    }
    return result;
  }

  console.log(`Base: ${base}`);

  targets.forEach(target => {
    let targetOriginalOneCount = 0;
    for (const a of target) {
      if (a === '1') ++targetOriginalOneCount;
    }
    const matchResult = backtrack(target.split(''), targetOriginalOneCount, 0);
    console.log(`Target: ${target}, Match: ${matchResult}`);
  });
}


let base = "110?";
let targets = ["??0?"];
canMatch(base, targets);