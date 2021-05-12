var data = [
      { label: 'Apple', value: 100 },
      { label: 'Banana', value: 200 },
      { label: 'Cookie', value: 50 },
      { label: 'Doughnut', value: 120 },
      { label: 'Egg', value: 80 },
];

d3.csv("https://nkzono99.github.io/InfoVis2021/W08/task1/data.csv")
      .then(data => {
            var config = {
                  parent: '#drawing_region',
                  width: 256,
                  height: 128,
                  margin: { top: 10, right: 10, bottom: 20, left: 60 },
                  xticks: 10,
                  yticks: 10,
            };

            let barChart = new BarChart(config, data);
            barChart.update();
      })
      .catch(error => {
            console.log(error);
      });