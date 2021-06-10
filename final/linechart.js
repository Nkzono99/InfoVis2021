class BarChart extends Chart {

    constructor(config) {
        super(config);

        let self = this;

        self.config.xticks = config.xticks || 5;
        self.config.yticks = config.yticks || 5;
        self.config.fontsize = config.fontsize || '14pt';
        self.config.padrate = config.padrate || 0.1;
        self.config.duration = config.duration || 1000;
        self.config.r = config.r || 3;
        self.config.strokecolor = config.strokecolor || 'black';

        self.listeners = [];

        this._initBarchart();
    }

    _initBarchart() {
        let self = this;

        self.xscale = d3.scaleLinear()
            .range([0, self.inner_width]);

        self.yscale = d3.scaleLinear()
            .range([0, self.inner_height]);

        self.xaxis_group = self.chart.append('g')
            .attr('transform', `translate(0, ${self.inner_height})`);

        self.yaxis_group = self.chart.append('g');

        self.xaxis = d3.axisBottom(self.xscale)
            .ticks(self.config.xticks)
            .tickSizeOuter(0);

        self.yaxis = d3.axisLeft(self.yscale)
        ticks(self.config.yticks)
            .tickSizeOuter(0);

        self.xaxis_group = self.chart.append('g')
            .attr('transform', `translate(0, ${self.inner_height})`)
            .call(self.xaxis);

        self.yaxis_group = self.chart.append('g')
            .call(self.yaxis);

        self.line = d3.line()
            .x(d => d.x)
            .y(d => d.y);
    }

    _update(data) {
        let self = this;

        self.xscale
            .domain([0, d3.max(data, d => d.x)]);

        self.yscale
            .domain([0, d3.max(data, d => d.y)]);
    }

    _render(data) {
        let self = this;

        let path = self.chart.selectAll("path")
            .data(data)
            .join("path")
            .transition(self.config.duration)
            .attr('d', self.line(data))
            .attr('stroke', self.config.strokecolor)
            .attr('fill', d => d.color || 'steelblue');

        self.listeners.forEach((listener) => {
            let name = listener[0];
            let func = listener[1];
            path.on(name, (e, d) => func(e, d));
        });
    }

    addListener(name, func) {
        let self = this;

        self.listeners.push([name, func]);
    }
}
