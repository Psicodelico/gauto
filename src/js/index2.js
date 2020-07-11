const margin = {
    top: 40,
    bottom: 10,
    left: 20,
    right: 20,
};
const width = 800 - margin.left - margin.right;
const height = 600 - margin.top - margin.bottom;

// Creates sources <svg> element and inner g (for margins)
const svg = d3
    .select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

/////////////////////////

const simulation = d3
    .forceSimulation()
    .force(
        "link",
        d3.forceLink().id((d) => d.id)
    )
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2));

const color = d3.scaleOrdinal(d3.schemeCategory10);

d3.json("../assets/lib/json/miserables.json").then((data) => {
    // Links data join
    const link = svg
        .selectAll(".link")
        .data(data.links)
        .join((enter) => enter.append("line").attr("class", "link"));

    // Nodes data join
    const node = svg
        .selectAll(".node")
        .data(data.nodes)
        .join((enter) => {
            const node_enter = enter.append("circle").attr("class", "node").attr("r", 10);
            node_enter.append("title").text((d) => d.id);
            return node_enter;
        });

    node.style("fill", (d) => color(d.group));

    simulation.nodes(data.nodes).force("link").links(data.links);

    simulation.on("tick", (e) => {
        link
            .attr("x1", (d) => d.source.x)
            .attr("y1", (d) => d.source.y)
            .attr("x2", (d) => d.target.x)
            .attr("y2", (d) => d.target.y);

        node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
    });
});