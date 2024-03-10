'use client'

import { StoreEvent } from "@/types/event-types"
import { ReactNode, createContext } from "react"

export const CartItemsContext = createContext<
    | {
        state: any
        dispatch: (action: any) => void
        emit?: (event: StoreEvent) => void
    }
    | undefined
>(undefined)

export interface CartProviderProps {
    children: ReactNode
    cart?: any
    emit?: (event: StoreEvent) => void
}
