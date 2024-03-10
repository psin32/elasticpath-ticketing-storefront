'use client'

import React, { useEffect, useReducer } from "react"
import { getInitialState } from "./get-initial-locale-state"
import { getCart } from "@/services/cart"
import { getCookie } from "cookies-next"
import { StoreEvent } from "@/types/event-types"
import { LocaleContext, LocaleProviderProps } from "./locale-context"
import { localeReducer } from "./locale-reducer"

export function LocaleProvider({
  locale,
  translation,
  children,
  emit,
}: LocaleProviderProps) {
  const [state, dispatch] = useReducer(localeReducer, getInitialState(locale))

  useEffect(() => {
    if (state.kind === "uninitialised-cart-state") {
      _initialiseTranslation(dispatch, emit)
    }
  }, [state, dispatch, emit])

  return (
    <LocaleContext.Provider
      value={{ state, dispatch, emit }}
    >
      {children}
    </LocaleContext.Provider>
  )
}

async function _initialiseTranslation(
  dispatch: (action: any) => void,
  emit?: (event: StoreEvent) => void
) {
  const cookieName = process.env.NEXT_PUBLIC_COOKIE_PREFIX_KEY + "_ep_cart"
  const cartId = getCookie(cookieName) || ""
  if (cartId) {

    dispatch({
      type: "initialise-translation"
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