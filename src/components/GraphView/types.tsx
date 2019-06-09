
export interface Node {
  /* Props of node */
  id: number,
  name?: string,
  label?: string,
  [key: string]: any

  /* Simulation system add these attributes to node */
  index?: number, // Index for node of the array
  x?: number, // x-position
  y?: number, // y-position
  vx?: number, // Velocity in x-direction
  vy?: number, // Velocity in y-direction
  // Fix a node, (If set fx, fy) x, y will be set to fx, fy 
  // after every tick, and vx, vy will be set to 0.
  fx?: number, // Fixed x-position
  fy?: number, // Fixed y-position
}

export interface Relationship {
  /* Props of relationship */
  // TODO
  id?: number,
  source: number | Node,
  target: number | Node,
  type: string,
  [key: string]: any

  /* Simulation system add these attributes to link */
  index?: number, // Index for link of the array
}

export interface IGraphViewData {
  nodes: Node[],
  relationships: Relationship[],
}

export interface D3dom {
  [key: string]: any
}
