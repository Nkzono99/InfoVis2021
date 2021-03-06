class BarChart {

    constructor(config, data) {
        this.config = {
            parent: config.parent,
            width: config.width || 256,
            height: config.height || 128,
            margin: config.margin || { top: 10, right: 10, bottom: 10, left: 10 },
            xticks: config.xticks || 10,
            yticks: config.yticks || 10,
            xlabel: config.xlabel || '',
            title: config.title || '',
        };
        this.data = data;
        this.init();
    }

    init() {
        let self = this;

        self.svg = d3.select(self.config.parent)
            .attr('width', self.config.width)
            .attr('height', self.config.height);

        let margin = self.config.margin
        self.chart = self.svg.append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

        self.inner_width = self.config.width - self.config.margin.left - self.config.margin.right;
        self.inner_height = self.config.height - self.config.margin.top - self.config.margin.bottom;

        self.xscale = d3.scaleLinear()
            .domain([0, d3.max(self.data, d => d.value)])
            .range([0, self.inner_width]);

        self.yscale = d3.scaleBand()
            .domain(self.data.map(d => d.label))
            .range([0, self.inner_height])
            .paddingInner(0.1);

        self.xaxis = d3.axisBottom(self.xscale)
            .ticks(5)
            .tickSizeOuter(0);

        self.yaxis = d3.axisLeft(self.yscale)
            .tickSizeOuter(0);

        self.xaxis_group = self.chart.append('g')
            .attr('transform', `translate(0, ${self.inner_height})`)
            .call(self.xaxis);

        self.yaxis_group = self.chart.append('g')
            .call(self.yaxis);

        self.axis_group = self.svg.append('g')
        self.title_group = self.svg.append('g')
    }

    update() {
        let self = this;

        self.render()
    }

    render() {
        let self = this;

        self.chart.selectAll("rect")
            .data(self.data).enter()
            .append("rect")
            .attr("x", 0)
            .attr("y", d => self.yscale(d.label))
            .attr("width", d => self.xscale(d.value))
            .attr("height", self.yscale.bandwidth())
            .attr('class', (d, i) => `rect${i}`)
            .each((d, i) => {
                tippy(`rect.rect${i}`, {
                    content: `${d.value} yen`,
                });
            });

        self.axis_group.append('text')
            .attr('x', self.config.width / 2)
            .attr('y', self.config.margin.top + self.inner_height + 35)
            .attr('font-size', '12pt')
            .attr('text-anchor', 'middle')
            .text(self.config.xlabel);

        self.title_group.append('text')
            .attr('x', self.config.width / 2)
            .attr('y', self.config.margin.top - 10)
            .attr('font-size', '12pt')
            .attr('font-weight', 'bold')
            .attr('text-anchor', 'middle')
            .text(self.config.title);
    }
}