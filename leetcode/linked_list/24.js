/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function(head) {
  // // Method 1: recursion
  // if ( head === null ) {
  //     return null;
  // }
  // function recurSwap(a, b) {
  //     if ( a === null ) {
  //         return null;
  //     }
  //     if ( b === null ) {
  //         return a;
  //     }
  //     a.next = recurSwap(b.next, b.next === null ? null : b.next.next);
  //     b.next = a;
  //     return b;
  // }
  // return recurSwap(head, head.next);

  // Method 2: iteration
  if ( head === null || head.next === null ) {
      return head;
  }
  let a = head;
  let b = head.next;
  let c = new ListNode(0, head);
  let dummyHead = new ListNode(0, c);

  while ( 1 ) {
      // console.log(a.val, b.val);
      a.next = b.next;
      b.next = a;
      c.next = b;

      if ( a.next === null || a.next.next === null ) {
          break;
      }
      c = a;
      a = a.next;
      b = a.next;
  }
  
  return dummyHead.next.next;
};