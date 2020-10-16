import { GetVariantQuery, ListVariantsQuery } from '@onextech/mbk-api'

export type VariantInterface = GetVariantInterface | ListVariantInterface
export type GetVariantInterface = GetVariantQuery['getVariant']
export type ListVariantInterface = ListVariantsQuery['listVariants']['items'][number]
