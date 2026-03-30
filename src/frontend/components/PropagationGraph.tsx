import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface Node extends d3.SimulationNodeDatum {
  id: string;
  type: 'source' | 'platform' | 'user';
  label: string;
  risk?: number;
}

interface Link extends d3.SimulationLinkDatum<Node> {
  source: string;
  target: string;
  value: number;
}

export const PropagationGraph: React.FC<{ riskScore: number }> = ({ riskScore }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 600;
    const height = 400;

    // Clear previous graph
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");

    // Simulated data based on risk score
    const nodes: Node[] = [
      { id: "source", type: "source", label: "Original Asset", risk: riskScore },
      { id: "twitter", type: "platform", label: "X (Twitter)" },
      { id: "insta", type: "platform", label: "Instagram" },
      { id: "fb", type: "platform", label: "Facebook" },
      { id: "tg", type: "platform", label: "Telegram" },
      { id: "u1", type: "user", label: "Bot Node 01" },
      { id: "u2", type: "user", label: "Bot Node 02" },
      { id: "u3", type: "user", label: "Viral Hub" },
    ];

    const links: Link[] = [
      { source: "source", target: "twitter", value: 1 },
      { source: "source", target: "insta", value: 1 },
      { source: "twitter", target: "u1", value: 1 },
      { source: "twitter", target: "u2", value: 1 },
      { source: "insta", target: "u3", value: 1 },
      { source: "u3", target: "fb", value: 1 },
      { source: "u3", target: "tg", value: 1 },
    ];

    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id((d: any) => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg.append("g")
      .attr("stroke", "#333")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", d => Math.sqrt(d.value) * 2)
      .attr("stroke", (d: any) => riskScore > 70 ? "#FF3B3B" : "#00B4FF");

    const node = svg.append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .selectAll("g")
      .data(nodes)
      .join("g")
      .call(d3.drag<any, any>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

    node.append("circle")
      .attr("r", d => d.type === 'source' ? 12 : 8)
      .attr("fill", d => {
        if (d.type === 'source') return riskScore > 70 ? "#FF3B3B" : "#00B4FF";
        if (d.type === 'platform') return "#1A1C1E";
        return "#333";
      })
      .attr("stroke", d => d.type === 'platform' ? "#00B4FF" : "#fff");

    node.append("text")
      .attr("dx", 12)
      .attr("dy", ".35em")
      .text(d => d.label)
      .attr("fill", "#8E9299")
      .attr("font-size", "10px")
      .attr("font-family", "JetBrains Mono");

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node
        .attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    function dragstarted(event: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: any) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event: any) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    return () => simulation.stop();
  }, [riskScore]);

  return (
    <div className="relative w-full h-full min-h-[400px] glass rounded-2xl overflow-hidden p-4">
      <div className="absolute top-4 left-4 z-10">
        <h3 className="text-xs font-mono uppercase tracking-widest text-blue">Propagation Mesh</h3>
        <p className="text-[10px] text-slate-500 italic">Simulated propagation based on AI detection patterns</p>
      </div>
      <svg ref={svgRef} className="w-full h-full" />
      {riskScore > 70 && (
        <div className="absolute bottom-4 right-4 z-10 px-3 py-1 bg-red/10 border border-red/20 rounded-full">
          <p className="text-[10px] font-mono text-red animate-pulse">HIGH VELOCITY SPREAD DETECTED</p>
        </div>
      )}
    </div>
  );
};
