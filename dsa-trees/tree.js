/** TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */

  sumValues() {

    function sumHelper(node) {
      if (node === null) {
        return 0;
      }
  
      let sum = node.val;
  
      for (let child of node.children) {
        sum += sumHelper(child);
      }
  
      return sum;
    }
    
    return sumHelper(this.root);
    
  }

  /** countEvens(): count all of the nodes in the tree with even values. */

  countEvens() {

    function counter(node) {
      if (node === null) {
        return 0;
      }

      let count = 0;
      if (node.val % 2 === 1) {
        count = 1;
      }

      for (let child of node.children) {
        count += counter(child);
      }

      return count;
    }

    return counter(this.root);
  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */

  numGreater(lowerBound) {
    function numGreaterHelper(node, lowerBound) {
      if (node === null) {
        return 0;
      }


      let count = 0;
      if (node.val > lowerBound) {
        count = 1;
      }

      for (let child of node.children) {
        count += numGreaterHelper(child, lowerBound);
      }

      return count;
    }

    return numGreaterHelper(this.root, lowerBound);
  }
}

module.exports = { Tree, TreeNode };
