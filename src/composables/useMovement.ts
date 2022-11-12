import { Direction, Maze, Movement, UseMovement } from '../types'

import useCell from './useCell'

export default function useMovement(maze: Maze): UseMovement {
  const { getAdjacentCellPosition, isFirstColumn, isLastColumn, isFirstRow, isLastRow } = useCell(maze)

  const canMoveToCellAbove = (position: number) => !isFirstRow(position) && !maze.structure[position].includes('north')
  const canMoveToCellBelow = (position: number) =>
    !isLastRow(position) && !maze.structure[getAdjacentCellPosition(position, 'south')].includes('north')
  const canMoveToNextCell = (position: number) =>
    !isLastColumn(position) && !maze.structure[getAdjacentCellPosition(position, 'east')].includes('west')
  const canMoveToPreviousCell = (position: number) =>
    !isFirstColumn(position) && !maze.structure[position].includes('west')

  const getPossibleMovements = (position: number): Movement[] => {
    // If the pony has spawned on the same cell as the end
    // Then the only possible direction is "stay".
    if (maze.positions.pony === maze.positions.end) {
      return [{ direction: 'stay', newPosition: position }]
    }

    const directions: Direction[] = []

    if (canMoveToCellAbove(position)) {
      directions.push('north')
    }

    if (canMoveToCellBelow(position)) {
      directions.push('south')
    }

    if (canMoveToPreviousCell(position)) {
      directions.push('west')
    }

    if (canMoveToNextCell(position)) {
      directions.push('east')
    }

    return directions.map(direction => ({
      direction,
      newPosition: getAdjacentCellPosition(position, direction),
    }))
  }

  const getShortestPath = (currentPosition: number, oldPosition?: number, paths: Movement[][] = [], index = 0) => {
    const baseIndex = index
    const isFirstMovement = typeof oldPosition === 'undefined'

    const movements = getPossibleMovements(currentPosition).filter(({ newPosition }) => newPosition !== oldPosition)

    for (const { direction, newPosition } of movements) {
      if (isFirstMovement || movements.length > 1) {
        const content = !isFirstMovement && typeof paths[baseIndex] !== 'undefined' ? paths[baseIndex] : []

        index = paths.push(content.slice()) - 1
      }

      paths[index].push({ direction, newPosition })

      if (newPosition === maze.positions.end) {
        break
      }

      getShortestPath(newPosition, currentPosition, paths, index)
    }

    return paths
      .filter(movements => movements.some(movement => movement.newPosition === maze.positions.end))
      .sort((a, b) => a.length - b.length)[0]
  }

  return { getPossibleMovements, getShortestPath }
}
