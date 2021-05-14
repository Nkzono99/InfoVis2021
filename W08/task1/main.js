d3.csv("https://nkzono99.github.io/InfoVis2021/W08/task1/data.csv")
      .then(data => {
            data.forEach(d => { d.value = +d.value; });
            var config = {
                  parent: '#drawing_region',
                  width: 256 + 50,
                  height: 128 + 50,
                  margin: { top: 30, right: 10, bottom: 40, left: 60 },
                  xticks: 10,
                  yticks: 10,
                  xlabel: 'price [yen]',
                  title: 'Price',
            };

            let barChart = new BarChart(config, data);
            barChart.update();
      })
      .catch(error => {
            console.log(error);
      });