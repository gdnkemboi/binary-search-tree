class HashSet {
  constructor() {
    this.map = new Array(16);
    this.hashMax = this.map.length;

    for (let i = 0; i < this.map.length; i++) {
      this.map[i] = new LinkedList();
    }
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode % this.hashMax;
  }

  set(key) {
    // Takes one arguments: a key. 
    // If a key already exists, then the old value is overwritten. 
    // The argument can also be an array of keys

    if (Array.isArray(key)) {
      for (let i = 0; i < key.length; i++) {
        let value = key[i];
        const index = this.hash(value);
        if (this.has(value)) {
          this.remove(value);
        }
        this.map[index].append([value]);
      }
      return;
    }

    const index = this.hash(key);
    if (this.has(key)) {
      this.remove(key);
    }
    this.map[index].append([key]);
    return;
  }

  has(key) {
    // Takes a key as an argument and returns true or false based on whether or not the key is in the hash map.
    const index = this.hash(key);
    return this.map[index].contains(key);
  }

  remove(key) {
    // Takes a key as an argument. If key is in the hash map, it should remove the entry with that key and return true. If the key isn’t in the hash map, it should return false.
    const index = this.hash(key);
    this.map[index].removeAt(key);
  }

  length() {
    // Returns the number of stored keys in the hash map

    let count = 0;
    for (let i = 0; i < this.map.length; i++) {
      count += this.map[i].size();
    }
    return count;
  }

  clear() {
    // Removes all entries in the hash map

    for (let i = 0; i < this.map.length; i++) {
      this.map[i] = new LinkedList();
    }
  }

  keys() {
    // Returns an array containing all the keys inside the hash map

    const keys = [];
    for (let i = 0; i < this.map.length; i++) {
      let currentNode = this.map[i].head;
      while (currentNode) {
        keys.push(currentNode.value[0]);
        currentNode = currentNode.nextNode;
      }
    }
    return keys;
  }
}

class Node {
  constructor(value, nextNode = null) {
    this.value = value;
    this.nextNode = nextNode;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  append(value) {
    const newNode = new Node(value);
    if (this.head === null) {
      this.head = newNode;
      return;
    }

    let currentNode = this.head;
    while (currentNode.nextNode) {
      currentNode = currentNode.nextNode;
    }

    currentNode.nextNode = newNode;
  }

  prepend(value) {
    let currentNode = this.head;
    this.head = new Node(value, currentNode);
  }

  size() {
    let count = 0;
    let currentNode = this.head;
    while (currentNode) {
      count++;
      currentNode = currentNode.nextNode;
    }
    return count;
  }

  contains(value) {
    let currentNode = this.head;
    while (currentNode) {
      if (currentNode.value[0] === value) {
        return true;
      }
      currentNode = currentNode.nextNode;
    }
    return false;
  }

  removeAt(index) {
    if (this.size() === 1) {
      this.head = null;
      return;
    }
    let previousNode;
    let currentNode = this.head;

    while (currentNode) {
      if (currentNode.value[0] === index && previousNode) {
        previousNode.nextNode = currentNode.nextNode;
        return;
      } else if (currentNode.value[0] === index && !previousNode) {
        this.head = currentNode.nextNode;
        return;
      }

      previousNode = currentNode;
      currentNode = currentNode.nextNode;
    }
  }
}

module.exports = HashSet;
