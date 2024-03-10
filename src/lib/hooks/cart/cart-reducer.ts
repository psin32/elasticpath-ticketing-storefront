
export function calculateCartNumbers(
) {

  return {
    withTax: "",
    withoutTax: "",
    tax: ""
  }
}

export function cartReducer(state: any, action: any): any {
  switch (action.type) {
    case "initialise-cart": {
      if (state.kind !== "uninitialised-cart-state") {
        return state
      }
      return {
        kind: "loading-cart-state"
      }
    }
    case "updating-cart": {
      if (
        state.kind === "present-cart-state" ||
        state.kind === "empty-cart-state"
      ) {
        return {
          kind: "updating-cart-state",
          previousCart: state,
          updateAction: action.payload.action
        }
      }
      return state
    }
    case "failed-cart-update": {
      if (state.kind === "updating-cart-state") {
        return state.previousCart
      }
      return state
    }
    case "update-cart":
      if (
        state.kind !== "updating-cart-state" &&
        state.kind !== "loading-cart-state"
      ) {
        return state
      }
      const { id, items, meta } = action.payload

      if (!items || items.length < 1) {
        return {
          kind: "empty-cart-state",
          id
        }
      }

      return {
        kind: "present-cart-state",
        id,
        items,
        meta,
      }
    default:
      return state
  }
}
