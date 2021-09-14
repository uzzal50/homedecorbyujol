import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const { id, amount, color, product } = action.payload
    const tempItem = state.cart.find((c) => c.id === id + color)
    if (tempItem) {
      const tempCart = state.cart.map((item) => {
        if (item.id === id + color) {
          let newAmount = item.amount + amount
          if (newAmount > item.max) {
            newAmount = item.max
          }

          return { ...item, amount: newAmount }
        } else {
          return item
        }
      })
      return { ...state, cart: tempCart }
    } else {
      const newItem = {
        id: id + color,
        name: product.name,
        image: product.images[0].url,
        color,
        price: product.price,
        max: product.stock,
        amount,
      }
      return { ...state, cart: [...state.cart, newItem] }
    }
  }

  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload
    const tempCart = state.cart.map((item, index) => {
      if (item.id === id) {
        if (value === 'inc') {
          let tempAmount = item.amount + 1
          if (tempAmount >= item.max) {
            tempAmount = item.max
          }
          return { ...item, amount: tempAmount }
        }
        if (value === 'dec') {
          let tempAmount = item.amount - 1
          if (tempAmount < 1) {
            tempAmount = 1
          }
          return { ...item, amount: tempAmount }
        }
      }
      return item
    })
    return { ...state, cart: tempCart }
  }

  if (action.type === REMOVE_CART_ITEM) {
    const tempCart = state.cart.filter((item) => {
      return item.id !== action.payload
    })
    return { ...state, cart: tempCart }
  }

  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] }
  }

  if (action.type === COUNT_CART_TOTALS) {
    const { total_amount, total_items } = state.cart.reduce(
      (total, item) => {
        const { amount, price } = item
        total.total_items += amount
        total.total_amount += price * amount
        return total
      },
      {
        total_amount: 0,
        total_items: 0,
      }
    )

    return { ...state, total_amount, total_items }
  }

  throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer
