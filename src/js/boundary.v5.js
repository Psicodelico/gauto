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

function create() {
    const param = {
        radius: 15,
        color: d3.scaleOrdinal(d3.schemeTableau10)
    }

    const zoom = d3.zoom().on("zoom", function () {
        g.attr("transform", d3.event.transform)
    });

    const svg = $svg.el
        .attr('viewBox', `0, 0, ${width}, ${height}`)
        .call(zoom);

    const g = svg
        .append('g')
        .attr('transform', `translate(${0}, ${0})`);

    var links = g.append('g')
        .selectAll('line');

    var nodes = g.append('g')
        .selectAll('g')


    const simulation = d3
        .forceSimulation()
        .force(
            'link',
            d3.forceLink().id((d) => d.id))
        // 使每两个节点之间的距离都至少是节点半径的两倍，避免节点相互覆盖
        .force('collision', d3.forceCollide().radius(param.radius * 2))
        .force('charge', d3.forceManyBody())
        .force('center', d3.forceCenter(width / 2, height / 2))
        .on('tick', () => {
            links
                .attr('x1', d => d.source.x) //Math.max(radius, Math.min(width - radius, d.source.x)))
                .attr('y1', d => d.source.y) //Math.max(radius, Math.min(height - radius, d.source.y)))
                .attr('x2', d => d.target.x) //Math.max(radius, Math.min(width - radius, d.target.x)))
                .attr('y2', d => d.target.y) //Math.max(radius, Math.min(height - radius, d.target.y)));

            /* node.attr('x', d => d.x) //Math.max(radius, Math.min(width - radius, d.x)))
                .attr('y', d => d.y) //Math.max(radius, Math.min(height - radius, d.y))); */
            nodes.attr('transform', d => `translate(${d.x},${d.y})`)
        });

    // Terminate the force layout when this cell re-runs.
    // invalidation.then(() => simulation.stop());
    // simulation.stop();

    // events start
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
                color = '#4aa6fc';
            } else if (d.id === l.source.id) {
                color = '#4aa6fc'
            }
            return color;
        })
    }

    function nodeOut(d) {
        links.style('stroke', '#999')
    }
    // events end
    return Object.assign(svg, {
        resetZoom() {
            svg.transition()
                .duration(750)
                .call(zoom.transform, d3.zoomIdentity);

        },
        update({
            nodes: n,
            links: l
        }) {
            links = links.data(l)
                .join('line')
                .attr('stroke-width', 1);

            nodes = nodes.data(n)
                .join('g')
                .call(drag())
                .on('mouseover', nodeOver)
                .on('mouseout', nodeOut);

            const img = nodes
                .append('image')
                .attr('xlink:href', d => {
                    return `../assets/images/topo/${d.type}.png`
                })
                .attr('width', 2 * param.radius)
                .attr('height', 2 * param.radius)
                .attr('transform', `translate(${-param.radius},${-param.radius})`)
            img.append('title')
                .text(d => d.id);

            nodes.append('text')
                .attr('transform', 'scale(0.75)')
                .text(d => d.type)
                .attr('x', function (d) {
                    return -this.getBBox().width / 2
                })
                .attr('y', 36)
            /* .each(function (d) {
                d.width = this.getBBox().width;
            }) */
            simulation.nodes(n).force('link').links(l);
        }
    });
}

// console.log(digest(yb_mock));
let handle = create();
handle.update(digest(yb_mock));

function reset() {
    handle.resetZoom();
}

function changeData(n) {
    let param;
    switch (n) {
        case 1:
            param = yb_mock;
            break;
        case 2:
            param = yb_mock2;
            break;
    }
    handle.update(digest(param));
}