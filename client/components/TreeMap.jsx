import Chart from '../classes/Chart';
import React, { Component, useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
// import Chart from '../classes/Chart.js';

const TreeMap = props => {
    console.log('props...', props)
    const ref = useRef(null);
    const width = props.options.chartWidth.value;
    const height = props.options.chartHeight.value;
   
    // mind potential variable hoisting pitfalls!
    const inputs = 
       {
        "name": "Eve",
        "children": [
          {
            "name": "Cain"
          },
          {
            "name": "Seth",
            "children": [
              {
                "name": "Enos"
              },
              {
                "name": "Noam"
              }
            ]
          },
          {
            "name": "Abel"
          },
          {
            "name": "Awan",
            "children": [
              {
                "name": "Enoch"
              }
            ]
          },
          {
            "name": "Azura"
          }
        ]
      }

  const [data] = useState(inputs) 
  console.log('data is...', data)

  const treeData = d3.hierarchy(data)
  console.log(treeData)
    // treeData.each(function(d) {
    //   console.log('d.id is...', d.id)
    //   d.name = d.id;
    // });

useEffect(() => {

  // set the dimensions and margins of the diagram
  const margin = {top: 0, right: 110, bottom: 30, left: 0}
  //     width = 660 - margin.left - margin.right,
  //     height = 500 - margin.top - margin.bottom;

  // declares a tree layout and assigns the size
  const treemap = d3
      .tree()
      .size([height, width]);

  //  assigns the data to a hierarchy using parent-child relationships
  let nodes = d3
      .hierarchy(treeData, d => d.children);

  // console.log('nodes are...', nodes)

  // maps the node data to the tree layout
  nodes = treemap(nodes);
  // append the svg object to the body of the page
  // appends a 'group' element to 'svg'
  // moves the 'group' element to the top left margin
  const svg = d3
      .select(ref.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom),
      g = svg.append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

  // adds the links between the nodes
  const link = g
      .selectAll(".link")
      .data(nodes.descendants().slice(1))
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("d", function(d) {
         return "M" + d.y + "," + d.x
           + "C" + (d.y + d.parent.y) / 2 + "," + d.x
           + " " + (d.y + d.parent.y) / 2 + "," + d.parent.x
           + " " + d.parent.y + "," + d.parent.x;
         });
  console.log('link', link)
  // adds each node as a group
  const node = g
      .selectAll(".node")
      .data(nodes.descendants())
      .enter()
      .append("g")
      .attr("class", function(d) {
        return "node" +
          (d.children ? " node--internal" : " node--leaf"); })
      .attr("transform", function(d) {
        return "translate(" + d.y + "," + d.x + ")"; });

  // adds the circle to the node
  node.append("circle")
      .attr("r", 10);

  // adds the text to the node
  node.append("text")
      .attr("dy", ".35em")
      .attr("x", function(d) { return d.children ? -13 : 13; })
      .style("text-anchor", function(d) {
        return d.children ? "end" : "start"; })
      .text(function(d) { return d.data.name; });
  
  console.log('treemap of nodes: ', nodes)

//   props.updateCodeText(`
//   const width = ${props.options.chartWidth.value};
//   const height = ${props.options.chartHeight.value};

//   const treemap = d3
//   .tree()
//   .size([height, width]);

// //  assigns the data to a hierarchy using parent-child relationships
// let nodes = d3.hierarchy(treeData, function(d) {
//   return d.children;
// });

// // console.log('nodes are...', nodes)

// // maps the node data to the tree layout
// nodes = treemap(nodes);
// // append the svg object to the body of the page
// // appends a 'group' element to 'svg'
// // moves the 'group' element to the top left margin
// const svg = d3
//   .select("body")
//   .append("svg")
//   .attr("width", width + margin.left + margin.right)
//   .attr("height", height + margin.top + margin.bottom),
//   g = svg.append("g")
//   .attr("transform",
//         "translate(" + margin.left + "," + margin.top + ")");

// // adds the links between the nodes
// const link = g
//   .selectAll(".link")
//   .data(nodes.descendants().slice(1))
//   .enter()
//   .append("path")
//   .attr("class", "link")
//   .attr("d", function(d) {
//      return "M" + d.y + "," + d.x
//        + "C" + (d.y + d.parent.y) / 2 + "," + d.x
//        + " " + (d.y + d.parent.y) / 2 + "," + d.parent.x
//        + " " + d.parent.y + "," + d.parent.x;
//      });
// console.log('link', link)
// // adds each node as a group
// const node = g
//   .selectAll(".node")
//   .data(nodes.descendants())
//   .enter()
//   .append("g")
//   .attr("class", function(d) {
//     return "node" +
//       (d.children ? " node--internal" : " node--leaf"); })
//   .attr("transform", function(d) {
//     return "translate(" + d.y + "," + d.x + ")"; });

// // adds the circle to the node
// node.append("circle")
//   .attr("r", 10);

// // adds the text to the node
// node.append("text")
//   .attr("dy", ".35em")
//   .attr("x", function(d) { return d.children ? -13 : 13; })
//   .style("text-anchor", function(d) {
//     return d.children ? "end" : "start"; })
//   .text(function(d) { return d.data.name; });
// `);
});

  return (
    <div>
      <svg width={props.options.chartWidth.value} height={props.options.chartHeight.value} textAnchor="middle">
            <g
              ref={ref}
            />
        </svg>
    </div>
  )
}


export default TreeMap
