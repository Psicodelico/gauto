function init() {
    const eleWrapper = document.getElementById('svg-wrapper');
    const element = document.getElementById('svg');
    return {
        el: d3.select(element),
        wrapperRect: eleWrapper.getBoundingClientRect(),
        svgRect: element.getBBox()
    }
}

const $svg = init();

const width = $svg.wrapperRect.width,
    height = $svg.wrapperRect.height;
const color = d3.scaleOrdinal(d3.schemeTableau10);

function chart() {
    const svg = $svg.el
        .attr("viewBox", [-width / 2, -height / 2, width, height]);

    const simulation = d3.forceSimulation()
        .force("charge", d3.forceManyBody().strength(-1000))
        .force("link", d3.forceLink().id(d => d.id).distance(200))
        .force("x", d3.forceX())
        .force("y", d3.forceY())
        .on("tick", ticked);

    let link = svg.append("g")
        .attr("stroke", "#000")
        .attr("stroke-width", 1.5)
        .selectAll("line");

    let node = svg.append("g")
        .attr("stroke", "#fff")
        .attr("stroke-width", 1.5)
        .selectAll("circle");

    function ticked() {
        node.attr("cx", d => d.x)
            .attr("cy", d => d.y)

        link.attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);
    }

    // Terminate the force layout when this cell re-runs.
    // invalidation.then(() => simulation.stop());
    simulation.stop();

    return Object.assign(svg.node(), {
        update({
            nodes,
            links
        }) {

            // Make a shallow copy to protect against mutation, while
            // recycling old nodes to preserve position and velocity.
            const old = new Map(node.data().map(d => [d.id, d]));
            nodes = nodes.map(d => Object.assign(old.get(d.id) || {}, d));
            links = links.map(d => Object.assign({}, d));

            node = node
                .data(nodes, d => d.id)
                .join(enter => enter.append("circle")
                    .attr("r", 8)
                    .attr("fill", d => color(d.id)));

            link = link
                .data(links, d => [d.source, d.target])
                .join("line");

            simulation.nodes(nodes);
            simulation.force("link").links(links);
            simulation.alpha(1).restart();
        }
    });
}

const handle = chart();

var graph1 = ({
    nodes: [{
            id: "a"
        },
        {
            id: "b"
        },
        {
            id: "c"
        }
    ],
    links: []
});
var graph2 = ({
    nodes: [{
            id: "a"
        },
        {
            id: "b"
        },
        {
            id: "c"
        }
    ],
    links: [{
            source: "a",
            target: "b"
        },
        {
            source: "b",
            target: "c"
        },
        {
            source: "c",
            target: "a"
        }
    ]
});
var graph3 = ({
    nodes: [{
            id: "a"
        },
        {
            id: "b"
        }
    ],
    links: [{
        source: "a",
        target: "b"
    }]
});
handle.update(graph1);

function change(n) {
    let param = graph1;
    switch (n) {
        case 1:
            param = graph1;
            break;
        case 2:
            param = graph2;
            break;
        case 3:
            param = graph3;
            break;
    }
    console.log(param)
    handle.update(param);
}