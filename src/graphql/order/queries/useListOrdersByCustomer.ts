import gql from 'graphql-tag'
import { useQuery, QueryHookOptions } from '@apollo/react-hooks'
import {
  ListOrdersByUserIdCreatedAtQuery,
  ListOrdersByPartitionCreatedAtQueryVariables,
  listOrdersByUserIdCreatedAt as listOrdersByCustomerQuery,
} from '@onextech/mbk-api'
import { DEFAULT_LIMIT } from '../../constants'

const useListOrdersByCustomer = (
  args: QueryHookOptions<ListOrdersByUserIdCreatedAtQuery, ListOrdersByPartitionCreatedAtQueryVariables> = {}
) => {
  const { data, ...rest } = useQuery(gql(listOrdersByCustomerQuery), {
    ...args,
    variables: { limit: DEFAULT_LIMIT, ...args?.variables },
  })

  const orders = data?.listOrdersByUserIDCreatedAt?.items ?? []

  return {
    orders,
    ...rest,
  }
}

export default useListOrdersByCustomer
