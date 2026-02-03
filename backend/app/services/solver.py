from __future__ import annotations

from typing import List, Optional, Tuple

CellValue = int
Row = List[CellValue]
Grid = List[Row]
Position = Tuple[int, int]


def find_empty(grid: Grid) -> Optional[Position]:
    for row_index in range(9):
        for col_index in range(9):
            if grid[row_index][col_index] == 0:
                return row_index, col_index
    return None


def is_valid(grid: Grid, row: int, col: int, value: int) -> bool:
    # Check row
    if any(grid[row][c] == value for c in range(9)):
        return False

    # Check column
    if any(grid[r][col] == value for r in range(9)):
        return False

    # Check 3x3 box
    box_row_start = (row // 3) * 3
    box_col_start = (col // 3) * 3
    for r in range(box_row_start, box_row_start + 3):
        for c in range(box_col_start, box_col_start + 3):
            if grid[r][c] == value:
                return False

    return True


def solve_sudoku(grid: Grid) -> bool:
    empty_pos = find_empty(grid)
    if empty_pos is None:
        return True

    row, col = empty_pos
    for value in range(1, 10):
        if is_valid(grid, row, col, value):
            grid[row][col] = value
            if solve_sudoku(grid):
                return True
            grid[row][col] = 0

    return False

