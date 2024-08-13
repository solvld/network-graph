import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { GraphProps, Node, Link } from '../../lib/types';

const Graph: React.FC<GraphProps> = ({ data, mutate }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 800;
    const height = 700;

    const svg = d3
      .select(svgRef.current)
      .attr('width', '100%')
      .attr('height', height);

    svg.selectAll('*').remove();

    svg
      .append('defs')
      .append('marker')
      .attr('id', 'arrowhead')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 23)
      .attr('refY', 0)
      .attr('markerWidth', 12)
      .attr('markerHeight', 15)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('fill', '#64748b');

    const simulation = d3
      .forceSimulation<Node>(data.nodes)
      .force(
        'link',
        d3
          .forceLink<Node, Link>(data.links)
          .id(d => d.id)
          .distance(270),
      )
      .force('charge', d3.forceManyBody().strength(-1000))
      .force('center', d3.forceCenter(width, height / 2))
      .force(
        'x',
        d3.forceX(d => (d.role == 'sender' ? width / 6 : (4 * width) / 1.5)),
      )
      .force(
        'y',
        d3.forceX(d => (d.role == 'receiver' ? height / 6 : height / 3)),
      );

    const link = svg
      .append('g')
      .selectAll('line')
      .data(data.links)
      .enter()
      .append('line')
      .attr('stroke-width', 1)
      .attr('stroke', '#64748b')
      .attr('marker-end', 'url(#arrowhead)');

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
      .attr('fill', d => {
        if (d.type == 'user') {
          return '#4ade80';
        } else if (d.type == 'bridge') {
          return '#38bdf8 ';
        } else return '#1e1b4b ';
      })
      .data(data.nodes)
      .on('click', (_, d: Node) => {
        if (d.id !== data.nodes[0].id) {
          mutate({ address: d.id });
        }
      });

    node
      .append('text')
      .text(d => d.name)
      .attr('dy', d => (d.id == data.nodes[0].id ? -35 : -32))
      .attr('text-anchor', 'middle')
      .style('fill', '#030712');

    node
      .append('text')
      .text(d => d.id)
      .attr('dy', d => (d.id == data.nodes[0].id ? -22 : -17))
      .attr('text-anchor', 'middle')
      .style('fill', '#9d09ad')
      .style('font-size', 12);

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
  }, [data, mutate]);

  return <svg ref={svgRef}></svg>;
};

export default Graph;
