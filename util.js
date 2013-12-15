function ddl_make_node(value) {
    return {
        data: value,
        prev: null,
        next: null
    }
}

function ddl_get_next(node) {
    return node.next;
}

function ddl_get_prev(node) {
    return node.prev;
}

function ddl_remove_node(node) {
    var prev = node.prev;
    var next = node.next;
    prev.next = next;
    next.prev = prev;
}

function ddl_foreach(head, foo) {
    var node = head;
    do {
        foo(node.data);
        node = ddl_get_next(node);
    } while(node != head);
}

function ddl_array_to_list(a) {
    var first_node = ddl_make_node(a[0]);
    var prev_node = first_node;
    for(var i = 1; i < a.length; ++i) {
        var current_node = ddl_make_node(a[i]);
        prev_node.next = current_node;
        current_node.prev = prev_node;
        prev_node = current_node;
    }
    prev_node.next = first_node;
    first_node.prev = prev_node;
    return first_node;
}

/*
function indexed_reduce(list, iter, init) {
    _.reduce(list, function() {
    }, init)
}
*/
