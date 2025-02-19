# Balanced Binary Search Tree in JavaScript

This project implements a balanced binary search tree (BST) in JavaScript. The tree is built from an array of numbers and supports various operations such as insertion, deletion, traversal, and rebalancing.

## Classes

### Node

Represents a node in the binary search tree.

#### Constructor

```javascript
constructor(data);
```

- `data`: The value to be stored in the node.

### Tree

Represents the binary search tree.

#### Constructor

```javascript
constructor(arr);
```

- `arr`: An array of numbers to build the initial balanced BST.

#### Methods

- `buildTree(arr)`: Builds a balanced BST from a sorted array.

  - **Parameters**:
    - `arr`: An array of numbers.
  - **Returns**:
    - The root node of the balanced BST.
  - **Description**:
    - This method first sorts the array using `mergeSort`, removes duplicates, and then recursively builds the tree by selecting the middle element as the root.

- `insert(data)`: Inserts a new node with the given data.

  - **Parameters**:
    - `data`: The value to be inserted.
  - **Description**:
    - This method calls the helper function `insertNode` to insert the new node into the tree.

- `insertNode(root, data)`: Helper function to insert a node.

  - **Parameters**:
    - `root`: The root node of the tree or subtree.
    - `data`: The value to be inserted.
  - **Returns**:
    - The root node after insertion.
  - **Description**:
    - This method recursively finds the correct position for the new node and inserts it.

- `delete(data)`: Deletes a node with the given data.

  - **Parameters**:
    - `data`: The value to be deleted.
  - **Description**:
    - This method calls the helper function `deleteNode` to remove the node from the tree.

- `deleteNode(root, data)`: Helper function to delete a node.

  - **Parameters**:
    - `root`: The root node of the tree or subtree.
    - `data`: The value to be deleted.
  - **Returns**:
    - The root node after deletion.
  - **Description**:
    - This method recursively finds the node to be deleted and removes it, adjusting the tree structure as necessary.

- `find(data)`: Finds a node with the given data.

  - **Parameters**:
    - `data`: The value to be found.
  - **Returns**:
    - The node with the given data, or `null` if not found.
  - **Description**:
    - This method calls the helper function `findNode` to locate the node in the tree.

- `findNode(root, data)`: Helper function to find a node.

  - **Parameters**:
    - `root`: The root node of the tree or subtree.
    - `data`: The value to be found.
  - **Returns**:
    - The node with the given data, or `null` if not found.
  - **Description**:
    - This method recursively searches for the node with the given data.

- `levelOrder(callback)`: Traverses the tree in level-order and applies the callback to each node.

  - **Parameters**:
    - `callback`: A function to be applied to each node's data.
  - **Description**:
    - This method uses a queue to traverse the tree level by level and applies the callback to each node's data.

- `preOrder(callback)`: Traverses the tree in pre-order and applies the callback to each node.

  - **Parameters**:
    - `callback`: A function to be applied to each node's data.
  - **Description**:
    - This method recursively traverses the tree in pre-order (root, left, right) and applies the callback to each node's data.

- `inOrder(callback)`: Traverses the tree in in-order and applies the callback to each node.

  - **Parameters**:
    - `callback`: A function to be applied to each node's data.
  - **Description**:
    - This method recursively traverses the tree in in-order (left, root, right) and applies the callback to each node's data.

- `postOrder(callback)`: Traverses the tree in post-order and applies the callback to each node.

  - **Parameters**:
    - `callback`: A function to be applied to each node's data.
  - **Description**:
    - This method recursively traverses the tree in post-order (left, right, root) and applies the callback to each node's data.

- `height(node)`: Calculates the height of the tree.

  - **Parameters**:
    - `node`: The node from which to calculate the height.
  - **Returns**:
    - The height of the tree.
  - **Description**:
    - This method recursively calculates the height of the tree by finding the maximum depth of the left and right subtrees.

- `depth(node)`: Calculates the depth of a node.

  - **Parameters**:
    - `node`: The node for which to calculate the depth.
  - **Returns**:
    - The depth of the node.
  - **Description**:
    - This method calls the helper function `findDepth` to calculate the depth of the node from the root.

- `findDepth(node, target, currentDepth)`: Helper function to find the depth of a node.

  - **Parameters**:
    - `node`: The current node in the traversal.
    - `target`: The value of the node for which to calculate the depth.
    - `currentDepth`: The current depth in the traversal.
  - **Returns**:
    - The depth of the target node, or `-1` if not found.
  - **Description**:
    - This method recursively searches for the target node and calculates its depth.

- `isBalanced(root)`: Checks if the tree is balanced.

  - **Parameters**:
    - `root`: The root node of the tree or subtree.
  - **Returns**:
    - `true` if the tree is balanced, `false` otherwise.
  - **Description**:
    - This method checks if the difference in height between the left and right subtrees is no more than 1 for all nodes.

- `rebalance()`: Rebalances the tree.
  - **Returns**:
    - The rebalanced tree.
  - **Description**:
    - This method collects all nodes in in-order traversal, builds a new balanced tree from the sorted nodes, and sets it as the root.

## Visualization

The `prettyPrint` function visualizes a BST by console.logging the tree in a structured format.

```javascript
const prettyPrint = (node, prefix = "", isLeft = true) => {
  // ...existing code...
};
```

## Example Usage

```javascript
import mergeSort from "./mergeSort.js";
import { Tree, prettyPrint } from "./balanced-BST.js";

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
```
