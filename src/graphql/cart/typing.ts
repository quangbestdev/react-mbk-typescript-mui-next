import { GetCartItemQuery, ListCartItemsQuery } from '@onextech/mbk-api'

export type CartItemInterface = GetCartItemInterface | ListCartItemInterface
export type GetCartItemInterface = GetCartItemQuery['getCartItem']
export type ListCartItemInterface = ListCartItemsQuery['listCartItems']['items'][number]
