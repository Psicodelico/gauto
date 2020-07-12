/* var len = yb_mock.length,
    i = 0;
var nodes = [],
    links = [];
for (; i < len; i++) {
    let j = 0,
        innerLen = yb_mock[i].length;
    for (; j < innerLen; j++) {
        let item = yb_mock[i][j]
        nodes.push({
            id: item.id,
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

let result = {
    nodes,
    links
}

console.log(JSON.stringify(result)) */

const eleWrapper = document.getElementById('svg-wrapper');
const eleRect = eleWrapper.getBoundingClientRect();

const width = eleRect.width;
const height = eleRect.height;

const element = document.getElementById('svg');

const svg = d3
    .select(element)
    .attr('viewBox', `0, 0, ${width}, ${height}`)
    .append('g')
    .attr('transform', `translate(${0}, ${0})`);

/////////////////////////

const root = d3.hierarchy(treeData);
const links = root.links();
const nodes = root.descendants();

const simulation = d3.forceSimulation(nodes)
    .force('link', d3.forceLink(links).id(d => d.id).distance(0).strength(1))
    .force('charge', d3.forceManyBody().strength(-50))
    // .force('x', d3.forceX())
    // .force('y', d3.forceY())
    .force('center', d3.forceCenter(width / 2, height / 2));

const link = svg.append('g')
    .attr('stroke', '#999')
    .attr('stroke-opacity', 0.6)
    .selectAll('line')
    .data(links)
    .join('line');

const radius = 3;
const node = svg.append('g')
    .attr('fill', '#fff')
    .attr('stroke', '#000')
    .attr('stroke-width', 2)
    .selectAll('circle')
    .data(nodes)
    .join('circle')
    .attr('fill', d => d.children ? null : '#000')
    .attr('stroke', d => d.children ? null : '#fff')
    .attr('r', 4)
    .call(drag(simulation));

node.append('title')
    .text(d => d.data.name);

simulation.on('tick', () => {
    link
        .attr('x1', d => Math.max(radius, Math.min(width - radius, d.source.x)))
        .attr('y1', d => Math.max(radius, Math.min(height - radius, d.source.y)))
        .attr('x2', d => Math.max(radius, Math.min(width - radius, d.target.x)))
        .attr('y2', d => Math.max(radius, Math.min(height - radius, d.target.y)));

    node.attr('cx', d => Math.max(radius, Math.min(width - radius, d.x)))
        .attr('cy', d => Math.max(radius, Math.min(height - radius, d.y)));
});

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