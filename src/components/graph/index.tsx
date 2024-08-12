import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { GraphProps, Node, Link } from '../../lib/types';

const Graph: React.FC<GraphProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 800;
    const height = 600;

    const svg = d3
      .select(svgRef.current)
      .attr('width', '100%')
      .attr('height', height);

    svg.selectAll('*').remove();

    const simulation = d3
      .forceSimulation<Node>(data.nodes)
      .force(
        'link',
        d3
          .forceLink<Node, Link>(data.links)
          .id(d => d.id)
          .distance(90),
      )
      .force('charge', d3.forceManyBody().strength(-800))
      .force('center', d3.forceCenter(width / 2.25, height / 2.5));

    const link = svg
      .append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(data.links)
      .enter()
      .append('line')
      .attr('stroke-width', '1px')
      .attr('stroke', '#64748b');

    const node = svg
      .append('g')
      .attr('class', 'nodes')
      .selectAll('g')
      .data(data.nodes)
      .enter()
      .append('g');

    node
      .append('circle')
      .attr('r', d => (d.id == data.nodes[0].id ? 20 : 15))
      .style('border', 'solid 1px white')
      .attr('fill', d => {
        if (d.id == data.nodes[0].id) {
          return '#3b82f6';
        } else if (d.type == 'user') {
          return '#4ade80';
        } else if (d.type == 'bridge') {
          return '#38bdf8 ';
        } else return '#1e1b4b ';
      });

    node
      .append('text')
      .text(d => d.name)
      .attr('dy', d => (d.id == data.nodes[0].id ? -25 : -20))
      .attr('text-anchor', 'middle')
      .style('fill', '#030712');

    node
      .append('text')
      .text(d => `$${d.usdt_balance.toFixed(2)}`)
      .attr('dy', d => (d.id == data.nodes[0].id ? 38 : 35))
      .attr('text-anchor', 'middle')
      .style('fill', '#64748b');

    simulation.on('tick', () => {
      link
        .attr('x1', d => (d.source as Node).x!)
        .attr('y1', d => (d.source as Node).y!)
        .attr('x2', d => (d.target as Node).x!)
        .attr('y2', d => (d.target as Node).y!);

      node.attr('transform', d => `translate(${d.x}, ${d.y})`);
    });
  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default Graph;
