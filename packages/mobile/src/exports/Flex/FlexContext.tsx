import { createContext, Context } from 'react'

export interface FlexContextState {
  targetRef?: React.Ref<HTMLDivElement>
  smValue?: number
  mdValue?: number
  lgValue?: number
}

const FlexContext: Context<FlexContextState> = createContext({})

export default FlexContext
