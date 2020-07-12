var len = yb_mock.length,
    i = 0;
var nodes = [],
    links = [];
for (; i < len; i++) {
    let j = 0,
        innerLen = yb_mock[i].length;
    for (; j < innerLen; j++) {
        /* if (i == 0) {
            break;
        } */
        let item = yb_mock[i][j]
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

let result = {
    nodes,
    links
}
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

const radius = 15;

const link = svg.append('g')
    .selectAll('line')
    .data(result.links)
    .join('line')
    .attr('stroke-width', 1);

const color = d3.scaleOrdinal(d3.schemeCategory10);
const node = svg.append('g')
    .selectAll('image')
    .data(result.nodes)
    .join('image')
    .attr('xlink:href', d => {
        return `../assets/images/topo/${d.type}.png`
    })
    .attr('width', 2 * radius)
    .attr('height', 2 * radius)
    .attr('transform', `translate(${-radius},${-radius})`)
    .call(drag(simulation));
node.append('title')
    .text(d => d.id);

const simulation = d3
    .forceSimulation()
    .force(
        'link',
        d3.forceLink().id((d) => d.id))
    // 使每两个节点之间的距离都至少是节点半径的两倍，避免节点相互覆盖
    .force('collision', d3.forceCollide().radius(radius * 2))
    .force('charge', d3.forceManyBody())
    .force('center', d3.forceCenter(width / 2, height / 2));
simulation.nodes(result.nodes).force('link').links(result.links);

simulation.on('tick', () => {
    link
        .attr('x1', d => Math.max(radius, Math.min(width - radius, d.source.x)))
        .attr('y1', d => Math.max(radius, Math.min(height - radius, d.source.y)))
        .attr('x2', d => Math.max(radius, Math.min(width - radius, d.target.x)))
        .attr('y2', d => Math.max(radius, Math.min(height - radius, d.target.y)));

    node.attr('x', d => Math.max(radius, Math.min(width - radius, d.x)))
        .attr('y', d => Math.max(radius, Math.min(height - radius, d.y)));
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