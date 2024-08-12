export interface Node extends d3.SimulationNodeDatum {
  id: string;
  type: string;
  name: string;
  usdt_balance: number;
  tokens: {
    name: string;
    amount: number;
    usdt_amount: number;
  }[];
}

export interface Link extends d3.SimulationLinkDatum<Node> {
  id: string;
  source: string | Node;
  target: string | Node;
  usdt_amount: number;
  tokens_amount: Token[];
}
export interface Token {
  name: string;
  amount: number;
  usdt_amount: number;
}

export interface GraphData {
  nodes: Node[];
  links: Link[];
}

export interface GraphProps {
  data: GraphData;
}

export interface ServerData {
  nodes: Node[];
  links: SLink[];
}

interface SLink {
  id: string;
  sender: string;
  receiver: string;
  usdt_amount: number;
  tokens_amount: Token[];
}
