/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val) {
    let newNode = new Node(val)

    if (this.head === null) {
      this.head = newNode;
    }

    if (this.tail !== null) {
      this.tail.next = newNode;
    }

    this.tail = newNode;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    let newNode = new Node(val)

    newNode.next = this.head;
    this.head = newNode;
  }

  /** pop(): return & remove last item. */

  pop() {
    if (this.tail === null) {
      throw new Error("The list is empty");
    }
    let lastItem = this.tail.val;
    this.tail = null;
    return lastItem;
  }

  /** shift(): return & remove first item. */

  shift() {
    if (this.head === null) {
      throw new Error("The list is empty");
    }
    let firstItem = this.head.val;
    this.head = this.head.next;
    return firstItem;
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    let current = this.head;
    let curIndex = 0;
    while (current !== null) {
      if (curIndex === idx) {
        return current.val;
      }
      current = current.next;
      curIndex ++;
    }
    throw new Error("The index is invalid");
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    let current = this.head;
    let curIndex = 0;
    while (current !== null) {
      if (curIndex === idx) {
        current.val = val;
        return;
      }
      current = current.next;
      curIndex ++;
    }
    throw new Error("The index is invalid");
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    if (idx === 0) {
      this.unshift(val);
      return;
    }
    
    let current = this.head;
    let curIndex = 0;
    while (current !== null) {
      if (curIndex === idx - 1) {
        let newNode = new Node(val);
        newNode.next = current.next
        current.next = newNode;
        return;
      }
      current = current.next;
      curIndex ++;
    }
    throw new Error("The index is invalid");
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    if (this.head === null) {
      throw new Error("The list is empty");
    }

    let removedItem = null;

    if (idx === 0) {
      removedItem = this.head.val;
      this.head = this.head.next;
      return removedItem;
    }

    let prev = this.head;
    let current = this.head.next;
    let curIndex = 1;
    while (current !== null) {
      if (curIndex === idx) {
        removedItem = current.val;
        prev.next = current.next;
        return removedItem;
      }
    }

    throw new Error("The index is invalid");
  }

  /** average(): return an average of all values in the list */

  average() {
    if (this.head === null) {
      return "The list is empty"
    }

    let current = this.head;
    let sum = 0;
    while (current !== null) {
      sum += current.val;
      current = current.next;
    }

    return sum / this.length;
  }
}

module.exports = LinkedList;
