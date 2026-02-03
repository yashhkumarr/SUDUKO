from __future__ import annotations

from typing import List

from pydantic import BaseModel, Field, field_validator


CellValue = int
Row = List[CellValue]
Grid = List[Row]


class SudokuPuzzle(BaseModel):
    grid: Grid = Field(..., description="9x9 Sudoku grid using 0 for empty cells.")

    @field_validator("grid")
    @classmethod
    def validate_grid(cls, value: Grid) -> Grid:
        if len(value) != 9:
            raise ValueError("Grid must have exactly 9 rows.")
        for row in value:
            if len(row) != 9:
                raise ValueError("Each row must have exactly 9 columns.")
            for cell in row:
                if not isinstance(cell, int):
                    raise ValueError("All cells must be integers.")
                if cell < 0 or cell > 9:
                    raise ValueError("Cell values must be between 0 and 9 (0 represents empty).")
        return value


class SudokuSolution(BaseModel):
    grid: Grid

