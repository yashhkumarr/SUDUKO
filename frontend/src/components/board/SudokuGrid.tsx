import type { FC } from 'react'
import { motion } from 'framer-motion'
import Cell from './Cell'
import { useGameStore } from '../../store/gameStore'

const SudokuGrid: FC = () => {
  const { board, selectedCell, setSelectedCell, setCellValue, solveBoard, resetBoard, loading, error } =
    useGameStore()

  return (
    <div className="flex flex-col items-center gap-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-2xl bg-sudoku-surface/80 p-4 shadow-2xl shadow-sky-500/20 backdrop-blur"
      >
        <div className="grid aspect-square w-full max-w-[420px] grid-cols-9 grid-rows-9 bg-slate-800/60">
          {board.map((row, rowIndex) =>
            row.map((value, colIndex) => {
              const isSelected =
                selectedCell?.row === rowIndex && selectedCell.col === colIndex
              return (
                <Cell
                  key={`${rowIndex}-${colIndex}`}
                  row={rowIndex}
                  col={colIndex}
                  value={value}
                  isSelected={isSelected}
                  onSelect={setSelectedCell}
                  onChange={setCellValue}
                />
              )
            }),
          )}
        </div>
      </motion.div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={resetBoard}
          className="rounded-full border border-slate-600 bg-slate-900/70 px-6 py-2 text-sm font-medium text-slate-100 shadow-sm transition hover:border-sudoku-accent hover:text-sudoku-accent"
        >
          Clear
        </button>
        <button
          type="button"
          onClick={() => {
            void solveBoard()
          }}
          disabled={loading}
          className="rounded-full bg-sudoku-accent px-8 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/40 transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Solving…' : 'Solve'}
        </button>
      </div>

      {error !== null && (
        <p className="text-sm text-rose-400/90">
          {error}
        </p>
      )}
    </div>
  )
}

export default SudokuGrid

