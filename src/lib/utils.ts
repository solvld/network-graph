import { GraphData, ServerData } from './types';

export function transformServerData(data: ServerData): GraphData {
  return {
    ...data,
    links: data.links.map(link => ({
      ...link,
      source: link.sender,
      target: link.receiver,
    })),
  };
}

export function addRoles(graphData: ServerData) {
  const nodesMap = new Map(graphData.nodes.map(node => [node.id, node]));

  graphData.links.forEach(link => {
    const senderNode = nodesMap.get(link.sender);
    const receiverNode = nodesMap.get(link.receiver);

    if (senderNode) {
      senderNode.role = 'sender';
    }
    if (receiverNode) {
      receiverNode.role = 'receiver';
    }
  });

  return graphData;
}
