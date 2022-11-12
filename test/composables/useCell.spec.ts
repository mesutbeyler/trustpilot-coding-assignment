import useCell from '../../src/composables/useCell'
import { Maze } from '../../src/types'

describe('useCell composable function', () => {
  const maze: Maze = {
    uuid: 'cd0c2dad-7327-44e6-92e8-72393de079b4',
    dimensions: {
      height: 15,
      width: 20,
    },
    positions: {
      domokun: 250,
      end: 0,
      pony: 0,
    },
    structure: [],
  }

  const { getAdjacentCellPosition, isFirstColumn, isLastColumn, isFirstRow, isLastRow } = useCell(maze)

  describe('getAdjacentCellPosition', () => {
    it(`should return the above cell's position`, () => {
      expect(getAdjacentCellPosition(25, 'north')).toBe(5)
    })

    it(`should return the below cell's position`, () => {
      expect(getAdjacentCellPosition(25, 'south')).toBe(45)
    })

    it(`should return the previous cell's position`, () => {
      expect(getAdjacentCellPosition(25, 'west')).toBe(24)
    })

    it(`should return the next cell's position`, () => {
      expect(getAdjacentCellPosition(25, 'east')).toBe(26)
    })

    it(`should return the cell's position`, () => {
      expect(getAdjacentCellPosition(25, 'stay')).toBe(25)
    })
  })

  describe('isFirstColumn', () => {
    it('should return true if the given position is in the first column', () => {
      expect(isFirstColumn(20)).toBe(true)
      expect(isFirstColumn(40)).toBe(true)
    })

    it('should return false otherwise', () => {
      expect(isFirstColumn(21)).toBe(false)
      expect(isFirstColumn(45)).toBe(false)
    })
  })

  describe('isLastColumn', () => {
    it('should return true if the given position is in the last column', () => {
      expect(isLastColumn(19)).toBe(true)
      expect(isLastColumn(59)).toBe(true)
    })

    it('should return false otherwise', () => {
      expect(isLastColumn(20)).toBe(false)
      expect(isLastColumn(40)).toBe(false)
    })
  })

  describe('isFirstRow', () => {
    it('should return true if the given position is in the first row', () => {
      expect(isFirstRow(15)).toBe(true)
      expect(isFirstRow(19)).toBe(true)
    })

    it('should return false otherwise', () => {
      expect(isFirstRow(20)).toBe(false)
      expect(isFirstRow(25)).toBe(false)
    })
  })

  describe('isLastRow', () => {
    it('should return true if the given position is in the last row', () => {
      expect(isLastRow(280)).toBe(true)
      expect(isLastRow(299)).toBe(true)
    })

    it('should return false otherwise', () => {
      expect(isLastRow(275)).toBe(false)
      expect(isLastRow(279)).toBe(false)
    })
  })
})
