
d3.csv("https://nkzono99.github.io/InfoVis2021/W08/task1/data.csv")
      .then(data => {
            data.forEach((d, i) => { d.value = +d.value; d.index = i; });
            var config = {
                  parent: '#drawing_region',
                  width: 512 + 50,
                  height: 256 + 50,
                  margin: { top: 10, right: 10, bottom: 20, left: 10 },
                  chart_margin: { top: 20, right: 10, bottom: 30, left: 80 },
                  xticks: 10,
                  yticks: 10,
                  padrate: 0.2,
                  xlabel: "xlabel",
                  ylabel: "ylabel",
                  title: "title",
            };

            let barChart = new BarChart(config);
            barChart.update(data);

            d3.select('#original')
                  .on('click', d => {
                        data.sort((a, b) => a.index - b.index);
                        barChart.update(data);
                  });

            d3.select('#reverse')
                  .on('click', d => {
                        data.reverse();
                        barChart.update(data);
                  });

            d3.select('#ascend')
                  .on('click', d => {
                        data.sort((a, b) => a.value - b.value)
                        barChart.update(data);
                  });

            d3.select('#descend')
                  .on('click', d => {
                        data.sort((a, b) => b.value - a.value)
                        barChart.update(data);
                  });
      })
      .catch(error => {
            console.log(error);
      });
