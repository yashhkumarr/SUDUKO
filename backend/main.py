from __future__ import annotations

from typing import List

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.endpoints.puzzle import router as puzzle_router


app = FastAPI(
    title="Interactive Modern Sudoku Solver API",
    version="1.0.0",
)


origins: List[str] = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    # TODO: Add your deployed Vercel frontend origin here, e.g.:
    # "https://your-sudoku-app.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health", tags=["health"])
async def health_check() -> dict[str, str]:
    return {"status": "ok"}


app.include_router(puzzle_router)

