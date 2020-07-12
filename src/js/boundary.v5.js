function digest(mock) {
    var len = mock.length,
        i = 0;
    var nodes = [],
        links = [];
    for (; i < len; i++) {
        let j = 0,
            innerLen = mock[i].length;
        for (; j < innerLen; j++) {
            /* if (i == 0) {
                break;
            } */
            let item = mock[i][j]
            nodes.push({
                id: item.id,
                type: item.type,
                group: i + 1
            });
            if (Array.isArray(item.relations) && item.relations.length > 0) {
                for (let m = 0; m < item.relations.length; m++) {
                    links.push({
                        source: item.id,
                        target: item.relations[m].id,
                        // value: Math.ceil(10 * Math.random())
                    })
                }
            }
        }
    }
    return {
        nodes,
        links
    }
}

let result = digest(yb_mock);

const eleWrapper = document.getElementById('svg-wrapper');
const eleRect = eleWrapper.getBoundingClientRect();

const width = eleRect.width;
const height = eleRect.height;

const element = document.getElementById('svg');

const zoom = d3.zoom().on("zoom", function () {
    svg.attr("transform", d3.event.transform)
})

const origin = d3
    .select(element)
    .attr('viewBox', `0, 0, ${width}, ${height}`)
    .call(zoom);

function reset() {
    origin.transition()
        .duration(750)
        .call(zoom.transform, d3.zoomIdentity);
}

function add() {
    setData();
}

const svg = origin
    .append('g')
    .attr('transform', `translate(${0}, ${0})`);


const radius = 15;

const simulation = d3
    .forceSimulation()
    .force(
        'link',
        d3.forceLink().id((d) => d.id))
    // 使每两个节点之间的距离都至少是节点半径的两倍，避免节点相互覆盖
    .force('collision', d3.forceCollide().radius(radius * 3))
    .force('charge', d3.forceManyBody())
    .force('center', d3.forceCenter(width / 2, height / 2));

simulation.on('tick', () => {
    links
        .attr('x1', d => d.source.x) //Math.max(radius, Math.min(width - radius, d.source.x)))
        .attr('y1', d => d.source.y) //Math.max(radius, Math.min(height - radius, d.source.y)))
        .attr('x2', d => d.target.x) //Math.max(radius, Math.min(width - radius, d.target.x)))
        .attr('y2', d => d.target.y) //Math.max(radius, Math.min(height - radius, d.target.y)));

    /* node.attr('x', d => d.x) //Math.max(radius, Math.min(width - radius, d.x)))
        .attr('y', d => d.y) //Math.max(radius, Math.min(height - radius, d.y))); */
    nodes.attr('transform', d => `translate(${d.x},${d.y})`)
});

var links, nodes;

function setData(result) {
    links = svg.append('g')
        .selectAll('line')
        .data(result.links)
        .join('line')
        .attr('stroke-width', 1);

    const color = d3.scaleOrdinal(d3.schemeCategory10);
    console.log(color);

    nodes = svg.append('g')
        .selectAll('g')
        .data(result.nodes)
        .join('g')
        .call(drag())
        .on('mouseover', nodeOver)
        .on('mouseout', nodeOut);

    const img = nodes
        .append('image')
        .attr('xlink:href', d => {
            return `../assets/images/topo/${d.type}.png`
        })
        .attr('width', 2 * radius)
        .attr('height', 2 * radius)
        .attr('transform', `translate(${-radius},${-radius})`)
    img.append('title')
        .text(d => d.id);

    const label = nodes.append('text')
        .attr('transform', 'scale(0.75)')
        .text(d => d.type)
        .attr('x', function (d) {
            return -this.getBBox().width / 2
        })
        .attr('y', 36)
    /* .each(function (d) {
        d.width = this.getBBox().width;
    }) */
    simulation.nodes(result.nodes).force('link').links(result.links);
}

setData(result);

function drag() {

    function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }

    return d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended);
}

function nodeOver(d) {
    links.style('stroke', function (l) {
        var color = '#999';
        if (d.id === l.target.id) {
            color = '#f00';
        } else if (d.id === l.source.id) {
            color = '#00f'
        }
        return color;
    })
}

function nodeOut(d) {
    links.style('stroke', '#999')
}