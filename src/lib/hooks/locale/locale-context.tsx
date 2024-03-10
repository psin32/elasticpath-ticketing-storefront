'use client'

import { StoreEvent } from "@/types/event-types"
import { ReactNode, createContext } from "react"

export const LocaleContext = createContext<
    | {
        state: any
        dispatch: (action: any) => void
        emit?: (event: StoreEvent) => void
    }
    | undefined
>(undefined)

export interface LocaleProviderProps {
    children: ReactNode
    locale?: string
    translation?: any
    emit?: (event: StoreEvent) => void
}
