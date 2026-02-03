import type { FC } from 'react'
import SudokuGrid from './components/board/SudokuGrid'

const App: FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      <div className="mx-auto flex max-w-5xl flex-col items-center px-4 py-10">
        <header className="mb-10 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-sky-400/80">
            2026 Edition
          </p>
          <h1 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Interactive Modern Sudoku Solver
          </h1>
          <p className="max-w-xl text-sm text-slate-400">
            Type in your puzzle, then let the backtracking-powered FastAPI engine instantly
            compute a valid solution. Built with React, Vite, Tailwind, and Framer Motion.
          </p>
        </header>

        <SudokuGrid />
      </div>
    </div>
  )
}

export default App

