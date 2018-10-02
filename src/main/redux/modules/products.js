import has from 'lodash/has'
import get from 'lodash/get'

import { cropShopifyImage } from 'common/utils/imageCrop'

const FETCH_PRODUCTS = 'FETCH_PRODUCTS'
const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS'
const FETCH_PRODUCTS_FAIL = 'FETCH_PRODUCTS_FAIL'

const FETCH_PRODUCT_DETAIL = 'FETCH_PRODUCT_DETAIL'
const FETCH_PRODUCT_DETAIL_SUCCESS = 'FETCH_PRODUCT_DETAIL_SUCCESS'
const FETCH_PRODUCT_DETAIL_FAIL = 'FETCH_PRODUCT_DETAIL_FAIL'

const initialState = {
  loading: false,
  loaded: false,
  products: {},
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        loading: true,
      }
    case FETCH_PRODUCTS_SUCCESS:
   
      return {
        ...state,
        loading: false,
        loaded: true,
        error: null,
        products: Object.assign(
          {},
          state.products,
          action.result.reduce(
            (accumulator, item) => ({
              ...accumulator,
              [item.handle]: {
                isLoading: false,
                isLoaded: true,
                error: null,
                data: formatProductData(item),
              },
            }),
            {}
          )
        ),
      }
    case FETCH_PRODUCTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    case FETCH_PRODUCT_DETAIL:
      return {
        ...state,
        products: {
          ...state.products,
          [action.handle]: {
            isLoading: true,
          },
        },
      }
    case FETCH_PRODUCT_DETAIL_SUCCESS:
      return {
        ...state,
        products: {
          ...state.products,
          [action.handle]: {
            isLoading: false,
            isLoaded: true,
            error: null,
            data: formatProductData(action.result),
          },
        },
      }
    case FETCH_PRODUCT_DETAIL_FAIL:
      return {
        ...state,
        products: {
          ...state.products,
          [action.handle]: {
            isLoading: false,
            error: action.error,
          },
        },
      }
    default:
      return state
  }
}

function formatProductData(item) {
  return {
    handle: item.handle,
    heading: item.title,
    href: `/shop/${item.handle}`,
    id: item.id,
    info: item.body_html,
    image: has(item, 'image.src')
      ? cropShopifyImage(item.image.src, 500)
      : require('main/assets/img/products/product-placeholder.jpg'),
    imageSrc: get(item, 'image.src'),
    tags: item.tags,
    type: item.product_type,
    vendor: item.vendor,
    rating: item.rating,
  }
}

export function getIsLoading(state) {
  return state.products.loading
}

export function getProductIsLoading(state, id) {
  const product = getProduct(state, id)
  return product && product.isLoading
}

export function getProducts(state) {
  return Object.values(state.products.products)
}

export function getProduct(state, id) {
  return state.products.products[id]
}

export function fetchProductDetail(handle) {
  return {
    handle,
    types: [
      FETCH_PRODUCT_DETAIL,
      FETCH_PRODUCT_DETAIL_SUCCESS,
      FETCH_PRODUCT_DETAIL_FAIL,
    ],
    promise: client => client.get(`api/shopify/products/${handle}`),
  }
}

export function fetchProductList() {
  return {
    types: [FETCH_PRODUCTS, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_FAIL],
    promise: client => client.get('api/shopify/products'),
  }
}

