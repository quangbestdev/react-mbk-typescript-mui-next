import gql from 'graphql-tag'
import { useQuery, QueryHookOptions } from '@apollo/react-hooks'
import {
  ListVariantsByProductIdCreatedAtQuery,
  ListVariantsByProductIdCreatedAtQueryVariables,
  listVariantsByProductIdCreatedAt as listVariantsByProductQuery,
} from '@onextech/mbk-api'
import { DEFAULT_LIMIT } from '../../constants'

const useListVariantsByProduct = (
  args: QueryHookOptions<ListVariantsByProductIdCreatedAtQuery, ListVariantsByProductIdCreatedAtQueryVariables> = {}
) => {
  const { data, ...rest } = useQuery(gql(listVariantsByProductQuery), {
    ...args,
    variables: { limit: DEFAULT_LIMIT, ...args?.variables },
  })

  const variants = data?.listVariantsByProductIDCreatedAt?.items ?? []

  return {
    variants,
    ...rest,
  }
}

export default useListVariantsByProduct
