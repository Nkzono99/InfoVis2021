// import * as d3 from "d3";

async function main() {
      const geoJson = d3.json('https://hazard.westa.io/japan.geo.json')
      const width = 400; // 描画サイズ: 幅
      const height = 400; // 描画サイズ: 高さ
      const centerPos = [137.0, 38.2]; // 地図のセンター位置
      const scale = 1000; // 地図のスケール

      // 地図の投影設定
      const projection = d3
            .geoMercator()
            .center(centerPos)
            .translate([width / 2, height / 2])
            .scale(scale);

      // 地図をpathに投影(変換)
      const path = d3.geoPath().projection(projection);

      let svg = d3.select('#drawing_region')
            .attr('width', width)
            .attr('height', height);
      svg
            .selectAll(`path`)
            .data(geoJson.features)
            .enter()
            .append(`path`)
            .attr(`d`, path)
            .attr(`stroke`, `#666`)
            .attr(`stroke-width`, 0.25)
            .attr(`fill`, `#2566CC`)
            .attr(`fill-opacity`, (item) => {
                  // メモ
                  // item.properties.name_ja に都道府県名が入っている

                  // 透明度をランダムに指定する (0.0 - 1.0)
                  return Math.random();
            })
}

main()

// d3.csv("https://nkzono99.github.io/InfoVis2021/W08/task1/data.csv")
//       .then(data => {
//             data.forEach((d, i) => { d.value = +d.value; d.index = i; });
//             var config = {
//                   parent: '#drawing_region',
//                   width: 512 + 50,
//                   height: 256 + 50,
//                   margin: { top: 10, right: 10, bottom: 20, left: 10 },
//                   chart_margin: { top: 20, right: 10, bottom: 30, left: 80 },
//                   xticks: 10,
//                   yticks: 10,
//                   padrate: 0.2,
//                   xlabel: "xlabel",
//                   ylabel: "ylabel",
//                   title: "title",
//             };

//             let barChart = new BarChart(config);
//             barChart.update(data);

//             d3.select('#original')
//                   .on('click', d => {
//                         data.sort((a, b) => a.index - b.index);
//                         barChart.update(data);
//                   });

//             d3.select('#reverse')
//                   .on('click', d => {
//                         data.reverse();
//                         barChart.update(data);
//                   });

//             d3.select('#ascend')
//                   .on('click', d => {
//                         data.sort((a, b) => a.value - b.value)
//                         barChart.update(data);
//                   });

//             d3.select('#descend')
//                   .on('click', d => {
//                         data.sort((a, b) => b.value - a.value)
//                         barChart.update(data);
//                   });
//       })
//       .catch(error => {
//             console.log(error);
//       });
