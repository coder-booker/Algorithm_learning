class CacheNode {
  public val: number;
  public next: CacheNode | null;
  public prev: CacheNode | null;

  constructor(val: number) {
      this.val = val;
      this.next = null;
      this.prev = null;
  }
}

class LRUCache {
  private dummy: CacheNode;
  private first: CacheNode | null;
  private last: CacheNode | null;
  private map: Map<number, CacheNode>;
  private capacity: number;

  constructor(capacity: number) {
      this.dummy = new CacheNode(0);
      this.first = null;
      this.last = null;
      this.capacity = capacity;
      this.map = new Map();
  }

  get(key: number): number {
      console.log("get", key);
      if ( this.map.has(key) ) {
          const currentNode: CacheNode = this.map.get(key);
          
          // move the node to the head
          if ( this.first !== currentNode ) {
              currentNode.prev.next = currentNode.next;
              if ( currentNode.next ) {
                  currentNode.next.prev = currentNode.prev;
              }

              currentNode.prev = null;
              currentNode.next = this.first;
              this.first.prev = currentNode;
              this.first = currentNode;
          }

          // return the node val
          return this.map.get(key).val;
      } else {
          return -1;
      }
  }

  put(key: number, value: number): void {
      console.log("put", key, value);
      if ( this.map.has(key) ) {
          const currentNode: CacheNode = this.map.get(key);
          
          // update the node
          currentNode.val = value;

          // move the node to the head
          if ( this.first !== currentNode ) {
              // change last if needed
              if ( this.last === currentNode ) {
                  this.last = this.last.prev;
              }
              
              // move
              currentNode.prev.next = currentNode.next;
              if ( currentNode.next ) {
                  currentNode.next.prev = currentNode.prev;
              }

              // change first
              currentNode.prev = null;
              currentNode.next = this.first;
              this.first.prev = currentNode;
              this.first = currentNode;
          }

          // update the map
          this.map.set(key, currentNode);
      } else {    // new node
          if ( this.map.size === this.capacity ) {
              // remove last node from map
              this.map.delete(this.last.val);

              // remove last node from list
              this.last.prev.next = null;
              this.last = this.last.prev;
          }

          const newNode: CacheNode = new CacheNode(value);
          // add new node to head
          if ( this.map.size === 0 ) {
              this.first = newNode;
              this.last = newNode;
          } else {
              this.first.prev = newNode;
              newNode.next = this.first;
              this.first = newNode;
          }

          // add new node to map
          this.map.set(key, newNode);

          // no need to increment the size, since it depends on this.map
      }
  }
}

/**
* Your LRUCache object will be instantiated and called as such:
* var obj = new LRUCache(capacity)
* var param_1 = obj.get(key)
* obj.put(key,value)
*/