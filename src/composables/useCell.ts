import { computed } from 'vue'

import { Direction, Maze, UseCell } from '../types'

export default function useCell(maze: Maze): UseCell {
  const cellsCount = computed(() => maze.dimensions.height * maze.dimensions.width)

  const getAdjacentCellPosition = (position: number, direction: Direction) => {
    if (direction === 'north') {
      return position - maze.dimensions.width
    } else if (direction === 'south') {
      return position + maze.dimensions.width
    } else if (direction === 'west') {
      return position - 1
    } else if (direction === 'east') {
      return position + 1
    }

    return position
  }

  const isFirstColumn = (position: number) => position % maze.dimensions.width === 0
  const isLastColumn = (position: number) => (position + 1) % maze.dimensions.width === 0
  const isFirstRow = (position: number) => position < maze.dimensions.width
  const isLastRow = (position: number) => cellsCount.value - position <= maze.dimensions.width

  return {
    getAdjacentCellPosition,
    isFirstColumn,
    isLastColumn,
    isFirstRow,
    isLastRow,
  }
}
