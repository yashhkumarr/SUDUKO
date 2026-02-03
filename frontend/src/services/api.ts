import axios from 'axios'
import type { AxiosInstance } from 'axios'

export type CellValue = number
export type Grid = CellValue[][]

export interface SudokuSolveRequest {
  grid: Grid
}

export interface SudokuSolveResponse {
  grid: Grid
}

const apiClient: AxiosInstance = axios.create({
  baseURL: '',
  withCredentials: false,
})

export async function solveSudoku(grid: Grid): Promise<Grid> {
  const payload: SudokuSolveRequest = { grid }
  const response = await apiClient.post<SudokuSolveResponse>('/api/v1/puzzle/solve', payload)
  return response.data.grid
}

