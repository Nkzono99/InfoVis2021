d3.csv("https://Nkzono99.github.io/InfoVis2021/W04/data.csv")
    .then(data => {
        data.forEach(d => { d.x = +d.x; d.y = +d.y; });

        var config = {
            parent: '#drawing_region',
            width: 256 + 50,
            height: 256 + 50,
            margin: { top: 10, right: 10, bottom: 20, left: 10 },
            chart_margin: { top: 10, right: 10, bottom: 30, left: 40 },
            xticks: 10,
            yticks: 10,
            padrate: 0.2,
            xlabel: "xlabel",
            ylabel: "ylabel",
            title: "title",
        };

        const scatter_plot = new ScatterPlot(config);
        scatter_plot.update(data);
    })
    .catch(error => {
        console.log(error);
    });
