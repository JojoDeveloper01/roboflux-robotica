export type GridNode = { r: number; c: number };

export type AStarResult = {
  analysedOrder: GridNode[];
  route: GridNode[];
  found: boolean;
};

export type GenerateMapOptions = {
  rows: number;
  cols: number;
  start: GridNode;
  end: GridNode;
  obstacleChance?: number;
  maxAttempts?: number;
};

export function nodeKey(node: GridNode): string {
  return `${node.r},${node.c}`;
}

export function isSameNode(a: GridNode, b: GridNode): boolean {
  return a.r === b.r && a.c === b.c;
}

export function manhattanDistance(a: GridNode, b: GridNode): number {
  return Math.abs(a.r - b.r) + Math.abs(a.c - b.c);
}

export function isInsideGrid(node: GridNode, rows: number, cols: number): boolean {
  return node.r >= 0 && node.r < rows && node.c >= 0 && node.c < cols;
}

export function getWalkableNeighbors(node: GridNode, rows: number, cols: number, walls: Set<string>): GridNode[] {
  return [
    { r: node.r - 1, c: node.c },
    { r: node.r + 1, c: node.c },
    { r: node.r, c: node.c - 1 },
    { r: node.r, c: node.c + 1 }
  ].filter((next) => isInsideGrid(next, rows, cols) && !walls.has(nodeKey(next)));
}

export function hasValidRoute(rows: number, cols: number, start: GridNode, end: GridNode, walls: Set<string>): boolean {
  const queue = [start];
  const seen = new Set([nodeKey(start)]);

  while (queue.length) {
    const current = queue.shift();
    if (!current) break;
    if (isSameNode(current, end)) return true;

    for (const next of getWalkableNeighbors(current, rows, cols, walls)) {
      const key = nodeKey(next);
      if (!seen.has(key)) {
        seen.add(key);
        queue.push(next);
      }
    }
  }

  return false;
}

export function generateValidWalls({
  rows,
  cols,
  start,
  end,
  obstacleChance = 0.24,
  maxAttempts = 250
}: GenerateMapOptions): Set<string> | null {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const walls = new Set<string>();

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const node = { r, c };
        if (isSameNode(node, start) || isSameNode(node, end)) continue;
        if (Math.random() < obstacleChance) walls.add(nodeKey(node));
      }
    }

    if (hasValidRoute(rows, cols, start, end, walls)) return walls;
  }

  return null;
}

function reconstructRoute(cameFrom: Map<string, GridNode>, current: GridNode): GridNode[] {
  const route = [current];

  while (cameFrom.has(nodeKey(current))) {
    current = cameFrom.get(nodeKey(current))!;
    route.unshift(current);
  }

  return route;
}

export function runAStar(rows: number, cols: number, start: GridNode, end: GridNode, walls: Set<string>): AStarResult {
  const open = [start];
  const cameFrom = new Map<string, GridNode>();
  const gScore = new Map<string, number>([[nodeKey(start), 0]]);
  const fScore = new Map<string, number>([[nodeKey(start), manhattanDistance(start, end)]]);
  const analysedOrder: GridNode[] = [];

  while (open.length) {
    open.sort((a, b) => (fScore.get(nodeKey(a)) ?? Infinity) - (fScore.get(nodeKey(b)) ?? Infinity));
    const current = open.shift()!;
    analysedOrder.push(current);

    if (isSameNode(current, end)) {
      return {
        analysedOrder,
        route: reconstructRoute(cameFrom, current),
        found: true
      };
    }

    for (const next of getWalkableNeighbors(current, rows, cols, walls)) {
      const tentativeG = (gScore.get(nodeKey(current)) ?? Infinity) + 1;

      if (tentativeG < (gScore.get(nodeKey(next)) ?? Infinity)) {
        cameFrom.set(nodeKey(next), current);
        gScore.set(nodeKey(next), tentativeG);
        fScore.set(nodeKey(next), tentativeG + manhattanDistance(next, end));

        if (!open.some((node) => isSameNode(node, next))) {
          open.push(next);
        }
      }
    }
  }

  return { analysedOrder, route: [], found: false };
}
