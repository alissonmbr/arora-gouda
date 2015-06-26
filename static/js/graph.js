var network = null;
var layoutMethod = "hubsize";
var nodes = [];
var edges = [];
var states = [];

function updateGraph(data) {
    if (!!data && !!data.nodes && !!data.edges) {
        destroy();
        nodes = data.nodes;
        edges = data.edges;
        draw();
    }
}

function postNode(node) {
    $.ajax({
        url: '/arora-gouda/add-node',
        type: 'POST',
        contentType: "application/json;charset=UTF-8",
        dataType: 'json',
        data: JSON.stringify(node),
    }).success(function(data) {
        updateGraph(data);
    });
}

function postRemoveNode(node) {
    $.ajax({
        url: '/arora-gouda/remove-node',
        type: 'POST',
        contentType: "application/json;charset=UTF-8",
        dataType: 'json',
        data: JSON.stringify(node),
    }).success(function(data) {
        updateGraph(data);
    });
}

function postEdge(edge) {
    $.ajax({
        url: '/arora-gouda/add-edge',
        type: 'POST',
        contentType: "application/json;charset=UTF-8",
        dataType: 'json',
        data: JSON.stringify(edge),
    }).success(function(data) {
        updateGraph(data);
    });
}

function postRemoveEdge(edge) {
    $.ajax({
        url: '/arora-gouda/remove-edge',
        type: 'POST',
        contentType: "application/json;charset=UTF-8",
        dataType: 'json',
        data: JSON.stringify(edge),
    }).success(function(data) {
        updateGraph(data);
    });
}

function clearNodes() {
    $.ajax({
        url: '/arora-gouda/clear',
        type: 'POST'
    }).success(function(data) {
        updateGraph(data);
    });

}

function run() {
    $.ajax({
        url: '/arora-gouda/run',
        type: 'POST'
    }).success(function(data) {
        console.log(data);
        if (!!data && !!data.states) {
            states = data.states.reverse();
        }

    });
}

function next() {
    if (states.length > 0)
        updateGraph(states.pop())
}

function destroy() {
    if (network !== null) {
        network.destroy();
        network = null;
    }
}

function existNode(nodeId) {
    for (var i = 0; i < nodes.length; ++i)
        if (nodes[i].id == nodeId)
            return true;

    return false;
}

function existEdge(fromId, toId) {
    for (var i = 0; i < edges.length; ++i)
        if (edges[i].from == fromId && edges[i].to == toId)
            return true;
    return false;
}

function addNode() {
    var nodeId = document.getElementById('node').value;
    var root = document.getElementById('root').value;
    var distance = document.getElementById('distance').value;
    var parent = document.getElementById('parent').value;

    if (!(!!nodeId && !!root && !!distance))
        return;

    if (existNode(nodeId))
        return;

    var node = {};
    node.id = nodeId;
    node.root = root;
    node.distance = distance;
    node.parent = (!!parent && parent.length > 0) ? parent : null;

    postNode(node);
}

function removeNode() {
    var nodeId = document.getElementById('removeNode').value;

    if (!(!!nodeId))
        return;

    if (!existNode(nodeId))
        return;

    var node = {};
    node.id = nodeId;

    postRemoveNode(node);
}

function addEdge() {
    var fromId = document.getElementById('from').value;
    var toId = document.getElementById('to').value;

    if (!(!!fromId && !!toId))
        return;

    if (!(existNode(fromId) && existNode(toId)))
        return;

    if (existEdge(fromId, toId))
        return;

    var edge = {};
    edge.from = fromId;
    edge.to = toId;

    postEdge(edge);
}

function removeEdge() {
    var fromId = document.getElementById('removeFrom').value;
    var toId = document.getElementById('removeTo').value;

    if (!(!!fromId && !!toId))
        return;

    if (!(existNode(fromId) && existNode(toId)))
        return;

    if (!existEdge(fromId, toId))
        return;

    var edge = {};
    edge.from = fromId;
    edge.to = toId;

    postRemoveEdge(edge);
}

function draw() {
    // create a network
    var container = document.getElementById('mynetwork');
    var data = {
        nodes: nodes,
        edges: edges
    };

    var options = {
        layout: {
            hierarchical: {
                sortMethod: layoutMethod
            }
        },
        edges: {
            smooth: true
        }
    };
    network = new vis.Network(container, data, options);
}