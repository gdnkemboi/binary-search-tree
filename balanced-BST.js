import mergeSort from "./mergeSort.js";

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
    if (arr.length === 0) return null;

    arr = mergeSort(arr);

    let arrSet = new Set(arr);

    arr = [...arrSet];

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

    if (data <= root.data) {
      if (root.left === null) {
        root.left = new Node(data);
      } else {
        this.insertNode(root.left, data);
      }
    }

    if (data > root.data) {
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
    if (root === null) return root;

    if (data < root.data) {
      root.left = this.deleteNode(root.left, data);
    } else if (data > root.data) {
      root.right = this.deleteNode(root.right, data);
    } else {
      if (root.left === null && root.right === null) {
        root = null;
      } else if (root.left === null) {
        root = root.right;
      } else if (root.right === null) {
        root = root.left;
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
      }
    }

    return root;
  }

  find(data) {
    return this.findNode(this.root, data);
  }

  findNode(root, data) {
    if (root === null) {
      return null;
    }

    let currentNode = root;

    if (data < root.data) {
      currentNode = root.left;
      return this.findNode(root.left, data);
    } else if (data > root.data) {
      currentNode = root.right;
      return this.findNode(root.right, data);
    }

    return currentNode;
  }

  levelOrder(callback) {
    if (!callback) {
      throw new Error("No callback function provided");
    }

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

      callback(current.data);
    }
  }

  preOrder(callback) {
    if (!callback) {
      throw new Error("No callback function provided");
    }

    const preOrderTraversal = (node) => {
      if (node === null) {
        return;
      }

      callback(node.data);

      preOrderTraversal(node.left);

      preOrderTraversal(node.right);
    };

    preOrderTraversal(this.root);
  }

  inOrder(callback) {
    if (!callback) {
      throw new Error("No callback function provided");
    }

    const inOrderTraversal = (node) => {
      if (node === null) {
        return;
      }

      inOrderTraversal(node.left);
      callback(node.data);
      inOrderTraversal(node.right);
    };

    inOrderTraversal(this.root);
  }

  postOrder(callback) {
    if (!callback) {
      throw new Error("No callback function provided");
    }

    const postOrderTraversal = (node) => {
      if (node === null) {
        return;
      }

      postOrderTraversal(node.left);
      postOrderTraversal(node.right);
      callback(node.data);
    };

    postOrderTraversal(this.root);
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
    if (typeof node === "number") {
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

    return true;
  }

  rebalance() {
    let arr = [];
    this.inOrder((n) => arr.push(n));

    console.log(arr);

    this.root = this.buildTree(arr);
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

prettyPrint(tree.root);

console.log("Testing inOrder method:\n");
let inOrderNodes = [];
tree.inOrder((n) => inOrderNodes.push(n));
console.log(inOrderNodes);

console.log("Testing preOrder method:\n");
let preOrderNodes = [];
tree.preOrder((n) => preOrderNodes.push(n));
console.log(preOrderNodes);

console.log("Testing postOrder method:\n");
let postOrderNodes = [];
tree.postOrder((n) => postOrderNodes.push(n));
console.log(postOrderNodes);

console.log("Testing levelOrder method:\n");
let levelOrderNodes = [];
tree.levelOrder((n) => levelOrderNodes.push(n));
console.log(levelOrderNodes);

console.log("Testing height method:\n");
console.log(tree.height(tree.root));

console.log("Testing depth method:\n");
console.log(tree.depth(1));

console.log("Testing find method:\n");
console.log(tree.find(23));
console.log(tree.find(6345));
console.log(tree.find(100)); // This should return null as 100 is not in the tree

console.log("Testing delete method:\n");
tree.delete(8);
prettyPrint(tree.root);
console.log(tree.find(8)); // This should return null

console.log("Testing isBalanced method:");
console.log(tree.isBalanced(tree.root));

console.log("Testing rebalance method:");
tree.rebalance();
console.log(tree.isBalanced(tree.root)); // This should return true after rebalancing
