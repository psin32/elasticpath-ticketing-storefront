'use client'

import React, { useEffect, useReducer } from "react"
import { cartReducer } from "./cart-reducer"
import { getInitialState } from "./get-initial-cart-state"
import { CartItemsContext, CartProviderProps } from "./cart-context"
import { getCart } from "@/services/cart"
import { getCookie } from "cookies-next"
import { StoreEvent } from "@/types/event-types"

export function CartProvider({
  cart,
  children,
  emit,
}: CartProviderProps) {
  const [state, dispatch] = useReducer(cartReducer, getInitialState(cart))

  useEffect(() => {
    if (state.kind === "uninitialised-cart-state") {
      _initialiseCart(dispatch, emit)
    }
  }, [state, dispatch, emit])

  return (
    <CartItemsContext.Provider
      value={{ state, dispatch, emit }}
    >
      {children}
    </CartItemsContext.Provider>
  )
}

async function _initialiseCart(
  dispatch: (action: any) => void,
  emit?: (event: StoreEvent) => void
) {
  const cookieName = process.env.NEXT_PUBLIC_COOKIE_PREFIX_KEY + "_ep_cart"
  const cartId = getCookie(cookieName) || ""
  if (cartId) {

    dispatch({
      type: "initialise-cart"
    })

    const response = await getCart(cartId)

    dispatch({
      type: "update-cart",
      payload: {
        id: response.data.id,
        items: response.included?.items,
        meta: response.data.meta,
      }
    })

    if (emit) {
      emit({
        type: "success",
        scope: "cart",
        action: "init",
        message: "Initialised cart"
      })
    }
  }
}