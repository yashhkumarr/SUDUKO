import { motion } from 'framer-motion'
import type { FC, ChangeEvent, FocusEvent } from 'react'

export interface CellProps {
  row: number
  col: number
  value: number
  isSelected: boolean
  onSelect: (row: number, col: number) => void
  onChange: (row: number, col: number, value: number) => void
}

const Cell: FC<CellProps> = ({ row, col, value, isSelected, onSelect, onChange }) => {
  const select = (): void => {
    onSelect(row, col)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const input = event.target.value.replace(/[^1-9]/g, '')
    if (input === '') {
      onChange(row, col, 0)
      return
    }

    const parsed = Number.parseInt(input.slice(-1), 10)
    if (!Number.isNaN(parsed)) {
      onChange(row, col, parsed)
    }
  }

  const displayValue = value === 0 ? '' : String(value)

  const handleFocus = (_event: FocusEvent<HTMLInputElement>): void => {
    select()
  }

  const borderClasses =
    [
      row % 3 === 0 ? 'border-t-2 border-sudoku-accent' : '',
      col % 3 === 0 ? 'border-l-2 border-sudoku-accent' : '',
      row === 8 ? 'border-b-2 border-sudoku-accent' : '',
      col === 8 ? 'border-r-2 border-sudoku-accent' : '',
    ]
      .filter(Boolean)
      .join(' ') || 'border border-slate-700'

  return (
    <motion.div
      onClick={select}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`relative flex items-center justify-center bg-slate-900/60 text-slate-50 ${borderClasses} ${
        isSelected ? 'ring-2 ring-sudoku-accent ring-offset-2 ring-offset-slate-900' : ''
      }`}
    >
      <input
        type="text"
        inputMode="numeric"
        pattern="[1-9]*"
        maxLength={1}
        value={displayValue}
        onChange={handleChange}
        onFocus={handleFocus}
        className="h-full w-full cursor-pointer bg-transparent text-center text-lg font-semibold text-slate-50 caret-transparent outline-none"
      />
    </motion.div>
  )
}

export default Cell

