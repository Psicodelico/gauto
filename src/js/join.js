function randomLetters() {
    return d3.shuffle("abcdefghijklmnopqrstuvwxyz".split(""))
        .slice(0, Math.floor(6 + Math.random() * 20))
        .sort();
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
    .attr('transform', `translate(${0}, ${30})`);

const eleBox = element.getBBox();
console.log(eleBox);

function action() {
    const t = svg.transition()
        .duration(750);
    svg.selectAll("text")
        .data(randomLetters(), d => d)
        .join(
            enter => enter.append("text")
            .attr("fill", "green")
            .attr("x", (d, i) => i * 16)
            .attr("y", -30) // 导致整个g的起始点y为-30
            .text(d => d)
            .call(enter => enter.transition(t)
                .attr("y", 0)),
            update => update
            .attr("fill", "black")
            .attr("y", 0)
            .call(update => update.transition(t)
                .attr("x", (d, i) => i * 16)),
            exit => exit
            .attr("fill", "grey")
            .call(exit => exit.transition(t)
                .attr("y", 30)
                .remove())
        );
};
action();

setInterval(action, 2500);