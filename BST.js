class BinarySearchTree {
    constructor(key = null, value = null, parent = null) {
        this.key = key;
        this.value = value;
        this.parent = parent;
        this.left = null;
        this.right = null;
    }

    insert(key, value) {
        if (this.key == null) {
            this.key = key;
            this.value = value;
        }

        else if (key < this.key) {
            if (this.left == null) {
                this.left = new BinarySearchTree(key, value, this);
            }
            else {
                this.left.insert(key, value);
            }
        }
        else {
            if (this.right == null) {
                this.right = new BinarySearchTree(key, value, this);
            }
            else {
                this.right.insert(key, value);
            }
        }
    }

    find(key) {
        if(this.key == key) {
            return this.value;
        }
        else if (key < this.key && this.left) {
            return this.left.find(key);
        }
        else if (key > this.key && this.right) {
            return this.right.find(key);
        }
        else {
            throw new Error("Key Error");
        }
    }

    remove(key) {
        if(this.key == key) {
            if(this.left && this.right) {
                if(this.left && this.right) {
                    const successor = this.right._findMin();
                    this.key = successor.key;
                    this.value = successor.value;
                    successor.remove(successor.key);
                }
                else if (this.left) {
                    this._replaceWith(this.left);
                }
                else if (this.right) {
                    this._replaceWith(this.right);
                }
                else {
                    this._replaceWith(null);
                }
            }
            else if (key < this.key && this.left) {
                this.left.remove(key);
            }
            else if (key > this.key && this.right) {
                this.right.remove(key);
            }
            else {
                throw new Error('Key error');
            }
        }
    }

    _replaceWith(node) {
        if(this.parent) {
            if(this == this.parent.left) {
                this.parent.left = node;
            }
            else if (this == this.parent.right) {
                this.parent.rigth = node;
            }
            if (node) {
                node.parent = this.parent;
            }
        }
        else {
            if (node) {
                this.key = node.key;
                this.value = node.value;
                this.left = node.left;
                this.right = node.right;
            }
            else {
                this.key = null;
                this.value = null;
                this.left = null;
                this.right = null;
            }
        }
    }

    _findMin() {
        if(!this.left) {
            return this;
        }
        return this.left._findMin();
    }
}
function bst_height(tree) {
	return Math.max(tree.left && bst_height(tree.left),
		tree.right && bst_height(tree.right)) + 1;
}


function isBST(bst){
    if(bst.left){
      if(bst.left.key > bst.key){
        return false;
      }
      if(!isBST(bst.left)){
        return false;
      }
    }
    if(bst.right){
      if(bst.right.key < bst.key){
        return false;
      }
      if(!isBST(bst.right)){
        return false;
      }
    }
    return true;
}

function _shortest(tree){
return Math.min(tree.left && bst_height(tree.left),
        tree.right && bst_height(tree.right)) + 1;
}

function balanced(node){
return bst_height(node) - _shortest(node) <= 1
}

function thirdLargest(node, counter = 1){
if(!node) return console.log('Tree is too young, not enough digits');
if(counter === 3) return node.value;
return thirdLargest(node.right, counter +1) || thirdLargest(node.left, counter +1)
}

function main() {
    let BST = new BinarySearchTree;
    BST.insert(3, 3)
    BST.insert(1, 1)
    BST.insert(4, 4)
    BST.insert(6, 6)
    BST.insert(9, 9)
    BST.insert(2, 2)
    BST.insert(5, 5)
    BST.insert(7, 7)
    console.log(BST);
}
main();