function padrange(vmin, vmax, rate) {
    var len = vmax - vmin;

    return [vmin - rate * len, vmax + rate * len];
}

class ScatterPlot extends Chart {

    constructor(config) {
        super(config);

        let self = this;
        self.config.xticks = config.xticks || 10;
        self.config.yticks = config.yticks || 10;
        self.config.padrate = config.padrate || 10;
        self.config.color = config.color || "steelblue";
        self.config.color_selected = config.color_selected || "blue";
        self._initScatterPlot();
    }

    _initScatterPlot() {
        let self = this;

        self.xscale = d3.scaleLinear()
            .range([0, self.inner_width]);

        self.yscale = d3.scaleLinear()
            .range([self.inner_height, 0]);

        self.xaxis = d3.axisBottom(self.xscale)
            .ticks(self.config.xticks);

        self.yaxis = d3.axisLeft(self.yscale)
            .ticks(self.config.yticks);

        self.xaxis_group = self.chart.append('g')
            .attr('transform', `translate(0, ${self.inner_height})`);

        self.yaxis_group = self.chart.append('g')
            .attr('transform', `translate(0, 0)`);
    }

    _update(data) {
        let self = this;

        const xmin = d3.min(data, d => d.x);
        const xmax = d3.max(data, d => d.x);
        self.xscale.domain(padrange(xmin, xmax, self.config.padrate));

        const ymin = d3.min(data, d => d.y);
        const ymax = d3.max(data, d => d.y);
        self.yscale.domain(padrange(ymin, ymax, self.config.padrate));
    }

    _render(data) {
        let self = this;

        let circles = self.chart.selectAll("circle")
            .data(data)
            .join("circle");

        circles
            .attr("cx", d => self.xscale(d.x))
            .attr("cy", d => self.yscale(d.y))
            .attr("r", d => d.r)
            .attr('fill', self.config.color);

        circles
            .on('mouseover', (e, d) => {
                d3.select(e.currentTarget)
                    .attr('fill', self.config.color_selected);
                d3.select('#tooltip')
                    .style('opacity', 1)
                    .html(`<div class="tooltip-label">Position</div>(${d.x}, ${d.y})`);
            })
            .on('mousemove', (e) => {
                const padding = 10;
                d3.select('#tooltip')
                    .style('left', (e.pageX + padding) + 'px')
                    .style('top', (e.pageY + padding) + 'px');
            })
            .on('mouseleave', (e, d) => {
                d3.select(e.currentTarget)
                    .attr('fill', self.config.color);
                d3.select('#tooltip')
                    .style('opacity', 0);
            });

        self.xaxis_group.call(self.xaxis);
        self.yaxis_group.call(self.yaxis);
    }
}
