import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    let maxPrice = action.payload.map((p) => p.price)
    maxPrice = Math.max(...maxPrice)

    return {
      ...state,
      all_products: [...action.payload], //copying the valu\es
      filtered_products: [...action.payload],
      filters: {
        ...state.filters,
        max_price: maxPrice,
        price: maxPrice,
      },
    }
  }

  if (action.type === SET_LISTVIEW) {
    return {
      ...state,
      grid_view: false,
    }
  }

  if (action.type === SET_GRIDVIEW) {
    return {
      ...state,
      grid_view: true,
    }
  }

  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload }
  }

  if (action.type === SORT_PRODUCTS) {
    const { sort, filtered_products } = state
    let tempProducts = filtered_products

    if (sort === 'price-lowest') {
      tempProducts = tempProducts.sort((a, b) => a.price - b.price)
      return { ...state, filtered_products: tempProducts }
    }
    if (sort === 'price-highest') {
      tempProducts = tempProducts.sort((a, b) => b.price - a.price)
      return { ...state, filtered_products: tempProducts }
    }
    if (sort === 'name-a') {
      tempProducts = tempProducts.sort((a, b) => a.name.localeCompare(b.name))
      return { ...state, filtered_products: tempProducts }
    }
    if (sort === 'name-z') {
      tempProducts = tempProducts.sort((a, b) => b.name.localeCompare(a.name))
      return { ...state, filtered_products: tempProducts }
    }
    return { ...state, filtered_products: [...tempProducts] }
  }

  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload
    return { ...state, filters: { ...state.filters, [name]: value } }
  }

  if (action.type === FILTER_PRODUCTS) {
    const { all_products } = state
    let tempProducts = [...all_products]

    const { text, category, company, color, price, shipping } = state.filters

    if (text) {
      tempProducts = tempProducts.filter((item) => {
        return item.name.toLowerCase().startsWith(text)
      })
    }

    if (category !== 'all') {
      tempProducts = tempProducts.filter((item) => {
        return item.category === category
      })
    }

    if (company !== 'all') {
      tempProducts = tempProducts.filter((item) => item.company === company)
    }

    if (color !== 'all') {
      tempProducts = tempProducts.filter((item) => {
        return item.colors.find((c) => c === color)
      })
    }

    if (price) {
      tempProducts = tempProducts.filter((item) => {
        return item.price <= price
      })
    }

    if (shipping) {
      tempProducts = tempProducts.filter((item) => {
        return item.shipping === shipping
      })
    }
    return { ...state, filtered_products: tempProducts }
  }

  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: '',
        company: 'all',
        category: 'all',
        color: 'all',
        price: state.filters.max_price,
        shipping: false,
      },
    }
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
