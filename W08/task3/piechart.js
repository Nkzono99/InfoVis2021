class PieChart {

    constructor(config, data) {
        this.config = {
            parent: config.parent,
            width: config.width || 256,
            height: config.height || 128,
            margin: config.margin || { top: 10, right: 10, bottom: 10, left: 10 },
            radius: config.radius || 128,
            innerRadius: config.innerRadius || 50
        };
        this.data = data;
        this.init();
    }

    init() {
        let self = this;

        self.svg = d3.select(self.config.parent)
            .attr('width', self.config.width)
            .attr('height', self.config.height);

        self.chart = self.svg.append('g')
            .attr('transform', `translate(${self.config.width / 2}, ${self.config.height / 2})`);

        self.pie = d3.pie()
            .value(d => d.value);

        self.arc = d3.arc()
            .innerRadius(self.config.innerRadius)
            .outerRadius(self.config.radius);

        self.color = d3.scaleOrdinal()
            .range(["#0081a7", "#00afb9", "#fdfcdc", "#fed9b7", "#f07167"]);
    }

    update() {
        let self = this;

        self.render()
    }

    render() {
        let self = this;

        let pieElement = self.chart.selectAll('pie')
            .data(self.pie(self.data)).enter()
            .append('g')

        pieElement.append('path')
            .attr('d', self.arc)
            .attr('fill', d => self.color(d.index))
            .attr('stroke', 'black')
            .style('stroke-width', '2px');

        pieElement
            .append("text")
            .attr('transform', d => `translate(${self.arc.centroid(d)})`)
            .attr("text-anchor", "middle")
            .text(d => d.data.label)
            .attr('class', (d, i) => `pie${i}`)
            .each((d, i) => {
                tippy(`text.pie${i}`, {
                    content: `${d.data.value} yen`,
                });
            });
    }
}