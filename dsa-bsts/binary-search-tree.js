class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    if (this.root === null) {
      this.root = new Node(val);
      return this;
    }
    let currNode = this.root;
    while (currNode) {
      if (val < currNode.val) {
        if (currNode.left === null) {
          currNode.left = new Node(val);
          return this;
        } else {
          currNode = currNode.left;
        }
      } else if (val > currNode.val) {
        if (currNode.right === null) {
          currNode.right = new Node(val);
          return this;
        } else {
          currNode = currNode.right;
        }
      }
    }
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val, currNode = this.root) {
    if (this.root === null) {
      this.root = new Node(val);
      return this;
    }

    if (val < currNode.val) {
      if (currNode.left === null) {
        currNode.left = new Node(val);
        return this;
      } else {
        return this.insertRecursively(val, currNode.left);
      }
    } else if (val > currNode.val) {
      if (currNode.right === null) {
        currNode.right = new Node(val);
        return this;
      } else {
        return this.insertRecursively(val, currNode.right);
      }
    }

  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    if (this.root === null) {
      return undefined;
    }

    let currNode = this.root;
    while (currNode) {
      if (val < currNode.val) {
        currNode = currNode.left;
      } else if (val > currNode.val) {
        currNode = currNode.right;
      } else {
        return currNode;
      }
    }

    return undefined;
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val, currNode = this.root) {
    if (currNode === null) {
      return undefined;
    }

    if (val < currNode.val) {
      return this.findRecursively(val, currNode.left);
    } else if (val > currNode.val) {
      return this.findRecursively(val, currNode.right);
    } else {
      return currNode;
    }
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    let array = [];
    let currNode = this.root;

    function traverse(node) {
      if (!node) {
        return;
      }
      array.push(node.val);
      traverse(node.left);
      traverse(node.right);
    }

    traverse(currNode);
    return array;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    let array = [];
    let currNode = this.root;

    function traverse(node) {
      if (!node) {
        return;
      }

      traverse(node.left);
      array.push(node.val);
      traverse(node.right);
    }

    traverse(currNode);
    return array;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    let array = [];
    let currNode = this.root;

    function traverse(node) {
      if (!node) {
        return;
      }

      traverse(node.left);
      traverse(node.right);
      array.push(node.val);
    }

    traverse(currNode);
    return array;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    let currNode = this.root;
    let array = [];
    let queue = [];

    queue.push(currNode);
    while (queue.length) {
      currNode = queue.shift();
      array.push(currNode.val);
      if (currNode.left) {
        queue.push(currNode.left);
      }
      if (currNode.right) {
        queue.push(currNode.right);
      }
    }
    return array;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {
    let nodeToRemove = this.root;
    let parent;

    while (nodeToRemove.val !== val) {
      parent = nodeToRemove;
      if (val < nodeToRemove.val) {
        nodeToRemove = nodeToRemove.left;
      } else {
        nodeToRemove = nodeToRemove.right;
      }
    }

    if (nodeToRemove !== this.root) {
      if (nodeToRemove.left === null && nodeToRemove.right === null) {
        if (parent.left === nodeToRemove) {
          parent.left = null;
        } else {
          parent.right = null;
        }
      } else if (nodeToRemove.left !== null && nodeToRemove.right !== null) {
        let rightParent = nodeToRemove;
        let right = nodeToRemove.right;
        if (right.left === null) {
          right.left = nodeToRemove.left;
          if (parent.left === nodeToRemove) {
            parent.left = right;
          } else {
            parent.right = right;
          }
        } else {
          while (right.left !== null) {
            rightParent = right;
            right = right.left;
          }
          if (parent.left === nodeToRemove) {
            parent.left.val = right.val;
          } else {
            parent.right.val = right.val;
          }
          if (right.right !== null) {
            rightParent.left = right.right;
          } else {
            rightParent.left = null;
          }
        }
      } else {
        if (parent.left === nodeToRemove) {
          if (nodeToRemove.right === null) {
            parent.left = nodeToRemove.left;
          } else {
            parent.left = nodeToRemove.right;
          }
        } else {
          if (nodeToRemove.right === null) {
            parent.right = nodeToRemove.left;
          } else {
            parent.right = nodeToRemove.right;
          }
        }
      }
    }
    return nodeToRemove;

  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced(current = this.root) {
    if (current === null) return;
    return maxDepth(current) - minDepth(current) <= 1;

    function minDepth(current) {
      if (current === null) return 0;
      return 1 + Math.min(minDepth(current.left), minDepth(current.right));
    }

    function maxDepth(current) {
      if (current === null) return 0;
      return 1 + Math.max(maxDepth(current.left), maxDepth(current.right));
    }
  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest(current = this.root) {
    // if the tree is too small, return
    if (!current || (!current.left && !current.right)) return;

    while (current) {
      // Current is largest and has a left subtree and 2nd largest is the largest in that subtree
      if (current.left && !current.right) {
        return this.findSecondHighest(current.left);
      }
      // Current is parent of largest and largest has no children so current is 2nd largest
      if (current.right && (!current.right.left && !current.right.right)) {
        return current.val;
      }
      current = current.right;
    }
  }
}

module.exports = BinarySearchTree;
