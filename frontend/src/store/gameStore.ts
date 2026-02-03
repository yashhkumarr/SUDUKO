import { create } from 'zustand'
import type { Grid } from '../services/api'
import { solveSudoku } from '../services/api'

export interface SelectedCell {
  row: number
  col: number
}

export interface GameState {
  board: Grid
  selectedCell: SelectedCell | null
  loading: boolean
  error: string | null
  setSelectedCell: (cell: SelectedCell | null) => void
  setCellValue: (row: number, col: number, value: number) => void
  resetBoard: () => void
  solveBoard: () => Promise<void>
}

const createEmptyBoard = (): Grid =>
  Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => 0))

export const useGameStore = create<GameState>((set, get) => ({
  board: createEmptyBoard(),
  selectedCell: null,
  loading: false,
  error: null,

  setSelectedCell: (cell) => set({ selectedCell: cell }),

  setCellValue: (row, col, value) =>
    set((state) => {
      const clampedValue = value >= 1 && value <= 9 ? value : 0
      const nextBoard: Grid = state.board.map((r, rIndex) =>
        r.map((cell, cIndex) => (rIndex === row && cIndex === col ? clampedValue : cell)),
      )
      return { board: nextBoard }
    }),

  resetBoard: () =>
    set({
      board: createEmptyBoard(),
      selectedCell: null,
      error: null,
    }),

  solveBoard: async () => {
    const { board } = get()
    set({ loading: true, error: null })
    try {
      const solved = await solveSudoku(board)
      set({ board: solved, loading: false })
    } catch (error) {
      set({
        loading: false,
        error: 'Unable to solve this puzzle. Please check your inputs.',
      })
    }
  },
}))

