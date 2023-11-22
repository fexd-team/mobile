import { createContext, Context } from 'react'

export interface GridContextState {
  gutter?: [number, number]
  columns?: number
  border?: boolean
  center?: boolean
  vertical?: boolean
  square?: boolean
  flexGapSupported?: boolean
}

const GridContext: Context<GridContextState> = createContext({})

export default GridContext
