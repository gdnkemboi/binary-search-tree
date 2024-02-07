const HashSet = require("./hashSet.js");

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(arr) {
    this.root = this.buildTree(arr);
  }

  buildTree(arr) {
    if (arr.length === 0) {
      return null;
    }

    arr = arr.sort((a, b) => a - b);
    let arrSet = new HashSet();
    arrSet.set(arr);
    arr = arrSet.keys();

    let mid = Math.floor(arr.length / 2);

    let root = new Node(arr[mid]);
    root.left = this.buildTree(arr.slice(0, mid));
    root.right = this.buildTree(arr.slice(mid + 1));
    return root;
  }

  insert(data) {
    this.root = this.insertNode(this.root, data);
  }

  insertNode(root, data) {
    if (root === null) {
      root = new Node(data);
      return root;
    }

    if (data < root.data) {
      if (root.left === null) {
        root.left = new Node(data);
      } else {
        this.insertNode(root.left, data);
      }
    } else if (data > root.data) {
      if (root.right === null) {
        root.right = new Node(data);
      } else {
        this.insertNode(root.right, data);
      }
    }
    return root;
  }

  delete(data) {
    this.root = this.deleteNode(this.root, data);
  }

  deleteNode(root, data) {
    if (root === null) {
      return root;
    }

    if (data < root.data) {
      root.left = this.deleteNode(root.left, data);
      return root;
    } else if (data > root.data) {
      root.right = this.deleteNode(root.right, data);
      return root;
    }

    if (root.left === null && root.right === null) {
      root = null;
      return root;
    } else if (root.left === null) {
      let temp = root.right;
      root = null;
      return temp;
    } else if (root.right === null) {
      let temp = root.left;
      root = null;
      return temp;
    } else {
      let successorParent = root;

      let successor = root.right;
      while (successor.left !== null) {
        successorParent = successor;
        successor = successor.left;
      }

      if (successorParent !== root) {
        successorParent.left = successor.right;
      } else {
        successorParent.right = successor.right;
      }

      root.data = successor.data;

      successor = null;
      return root;
    }
  }

  find(data) {
    return this.findNode(this.root, data);
  }

  findNode(root, data) {
    if (root === null) {
      return false;
    }

    let currentNode = root;
    if (data < root.data) {
      currentNode = root.left;
      return this.findNode(root.left, data);
    } else if (data > root.data) {
      currentNode = root.right;
      return this.findNode(root.right, data);
    } else {
      return currentNode;
    }
  }

  levelOrder(callback) {
    let queue = [];
    queue.push(this.root);
    while (queue.length > 0) {
      let current = queue.shift();
      if (current.left !== null) {
        queue.push(current.left);
      }
      if (current.right !== null) {
        queue.push(current.right);
      }
      if (callback) {
        callback(current.data);
      }

      return queue;
    }
  }

  inOrder(callback) {
    let result = [];
    let stack = [];
    let current = this.root;
    while (current !== null || stack.length > 0) {
      while (current !== null) {
        stack.push(current);
        current = current.left;
      }
      current = stack.pop();
      result.push(current.data);
      current = current.right;
    }
    if (callback) {
      result.forEach(callback);
    }
    return result;
  }

  preOrder(callback) {
    let result = [];
    let stack = [];
    stack.push(this.root);
    while (stack.length > 0) {
      let current = stack.pop();
      result.push(current.data);
      if (current.right !== null) {
        stack.push(current.right);
      }
      if (current.left !== null) {
        stack.push(current.left);
      }
    }
    if (callback) {
      result.forEach(callback);
    }
    return result;
  }

  postOrder(callback) {
    let result = [];
    let stack = [];
    stack.push(this.root);
    while (stack.length > 0) {
      let current = stack.pop();
      result.push(current.data);
      if (current.left !== null) {
        stack.push(current.left);
      }
      if (current.right !== null) {
        stack.push(current.right);
      }
    }
    result = result.reverse();
    if (callback) {
      result.forEach(callback);
    }
    return result;
  }

  height(node) {
    if (node === null) {
      return -1;
    }
    let left = this.height(node.left);
    let right = this.height(node.right);
    if (left > right) {
      return left + 1;
    } else {
      return right + 1;
    }
  }

  depth(node) {
    if (typeof(node) === 'number') {
      return this.findDepth(this.root, node, 0);
    }

    return this.findDepth(this.root, node.data, 0);
  }
  
  findDepth(node, target, currentDepth = 0) {
    if (node === null) {
      return -1;
    }

    if (node.data === target) {
      return currentDepth;
    }

    let leftDepth = this.findDepth(node.left, target, currentDepth + 1);
    let rightDepth = this.findDepth(node.right, target, currentDepth + 1);

    return Math.max(leftDepth, rightDepth);
  }

  isBalanced(root) {
    if (root === null) {
      return true;
    }

    let left = this.height(root.left);
    let right = this.height(root.right);
    let diff = Math.abs(left - right);
    if (diff > 1) {
      return false;
    }

    return true
  }

  rebalance() {
    let arr = this.inOrder();
    this.root = this.buildTree(arr, 0, arr.length - 1);
    return this;
  }
}

// Visualizes a BST by console.logging the tree in a structured format. 
// It expects to receive the root of a tree as the value for the node parameter.
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};


// drive script testing all methods of the Tree class
let numbers = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let tree = new Tree(numbers);

console.log('Testing inOrder method:');
console.log(tree.inOrder());

console.log('Testing preOrder method:');
console.log(tree.preOrder());

console.log('Testing postOrder method:');
console.log(tree.postOrder());

console.log('Testing levelOrder method:');
console.log(tree.levelOrder());

console.log('Testing height method:');
console.log(tree.height(tree.root));

console.log('Testing depth method:');
console.log(tree.depth(tree.root));

console.log('Testing find method:');
console.log(tree.find(23));
console.log(tree.find(6345));
console.log(tree.find(100));  // This should return null as 100 is not in the tree

console.log('Testing delete method:');
tree.delete(23);  // Delete a node and then check if it's still in the tree
console.log(tree.find(23));  // This should return null

console.log('Testing isBalanced method:');
console.log(tree.isBalanced(tree.root));

console.log('Testing rebalance method:');
tree.rebalance();
console.log(tree.isBalanced(tree.root));  // This should return true after rebalancing
