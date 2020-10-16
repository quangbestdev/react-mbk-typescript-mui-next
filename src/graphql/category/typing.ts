import { GetCategoryQuery, ListCategorysQuery } from '@onextech/mbk-api'

export type CategoryInterface = GetCategoryInterface | ListCategoryInterface
export type GetCategoryInterface = GetCategoryQuery['getCategory']
export type ListCategoryInterface = ListCategorysQuery['listCategorys']['items'][number]
