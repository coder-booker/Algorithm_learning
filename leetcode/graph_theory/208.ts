type TrieNode = {
  children: { [key: string]: TrieNode };
  isEnd: boolean; // 作用是标识这个节点是一个词的结尾，哪怕这个节点不是叶子节点
}
class Trie {
  private root: TrieNode;
  constructor() {
      this.root = {
          children: {},
          isEnd: false,
      }
  }

  insert(word: string): void {
      let currentNode = this.root;
      for ( let char of word ) { 
          // 检查存不存在，如果不存在则创建
          if ( !currentNode.children[char] ) {
              currentNode.children[char] = {
                  children: {},
                  isEnd: false
              }
          }
          // 存在与否都要继续
          currentNode = currentNode.children[char];
      }
      currentNode.isEnd = true;
  }

  search(word: string): boolean {
      let currentNode = this.root;
      for ( let char of word ) { 
          // 检查存不存在，如果不存在则false
          if ( !currentNode.children[char] ) {
              return false;
          }
          // 存在与否都要继续
          currentNode = currentNode.children[char];
      }
      // 循环结束代表全都存在，判断是否是一个词的结尾
      return currentNode.isEnd;
  }

  startsWith(prefix: string): boolean {
      let currentNode = this.root;
      for ( let char of prefix ) { 
          // 检查存不存在，如果不存在则false
          if ( !currentNode.children[char] ) {
              return false;
          }
          // 存在与否都要继续
          currentNode = currentNode.children[char];
      }
      // 循环结束代表全都存在。这里无需判断是否结尾，因为只需要prefix符合即可
      return true;
  }
}

/**
* Your Trie object will be instantiated and called as such:
* var obj = new Trie()
* obj.insert(word)
* var param_2 = obj.search(word)
* var param_3 = obj.startsWith(prefix)
*/