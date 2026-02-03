from __future__ import annotations

from copy import deepcopy
from typing import Any, Dict

from fastapi import APIRouter, HTTPException

from app.schemas.sudoku import SudokuPuzzle, SudokuSolution, Grid
from app.services.solver import solve_sudoku


router = APIRouter(prefix="/api/v1/puzzle", tags=["puzzle"])


@router.post("/solve", response_model=SudokuSolution)
async def solve_puzzle(payload: SudokuPuzzle) -> SudokuSolution:
    grid_copy: Grid = deepcopy(payload.grid)

    if not solve_sudoku(grid_copy):
        raise HTTPException(status_code=400, detail="Sudoku puzzle is unsolvable.")

    return SudokuSolution(grid=grid_copy)

