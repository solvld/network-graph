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
