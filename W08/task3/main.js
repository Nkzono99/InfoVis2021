var data = [
    { label: 'Apple', value: 100 },
    { label: 'Banana', value: 200 },
    { label: 'Cookie', value: 50 },
    { label: 'Doughnut', value: 120 },
    { label: 'Egg', value: 80 }
];

var config = {
    parent: '#drawing_region',
    width: 256,
    height: 256,
    radius: 128,
    margin: { top: 10, right: 10, bottom: 20, left: 60 },
};

let pieChart = new PieChart(config, data)
pieChart.update()
