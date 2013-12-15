var ds = require('./datastructure');

function SimpleNode(val) {
    this.value = val;
}

SimpleNode.prototype.lessThan = function(other) {
    return this.value < other.value;
}

var nodes = [];

var rbTree = new RBTree();

for(var k = 0; k < 20; ++k) {
    var node = new SimpleNode(Math.floor(Math.random()*40));
    nodes.push(node);
    rbTree.insert(node);
}

rbTree.traverse(function(node){
    console.log(node.value);
});
