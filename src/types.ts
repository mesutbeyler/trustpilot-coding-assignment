export type Direction = 'east' | 'north' | 'south' | 'stay' | 'west'

export interface FetchMazeResponse {
  'end-point': [number]
  domokun: number[]
  pony: number[]
  size: number[]
  data: ('north' | 'west')[][]
}

export interface GenerateMazeResponse {
  maze_id: string
}

export interface Maze {
  uuid: string
  dimensions: {
    height: number
    width: number
  }
  positions: {
    domokun: number
    end: number
    pony: number
  }
  structure: ('north' | 'west')[][]
}

export interface Movement {
  direction: Direction
  newPosition: number
}

export interface UseCell {
  getAdjacentCellPosition: (position: number, direction: Direction) => number
  isFirstColumn: (position: number) => boolean
  isLastColumn: (position: number) => boolean
  isFirstRow: (position: number) => boolean
  isLastRow: (position: number) => boolean
}

export interface UseMaze {
  form: {
    height: number
    width: number
    difficulty: number
  }
  maze: Maze
  fetchMaze: (uuid: string) => Promise<Maze>
  generateMaze: () => Promise<Maze>
}

export interface UseMovement {
  getPossibleMovements: (position: number) => Movement[]
  getShortestPath: (currentPosition: number, oldPosition?: number, paths?: Movement[][], index?: number) => Movement[]
}
