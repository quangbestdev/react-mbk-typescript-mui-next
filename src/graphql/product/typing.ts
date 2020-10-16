import { GetProductQuery, ListProductsQuery } from '@onextech/mbk-api'

export type ProductInterface = GetProductInterface | ListProductInterface
export type GetProductInterface = GetProductQuery['getProduct']
export type ListProductInterface = ListProductsQuery['listProducts']['items'][number]
