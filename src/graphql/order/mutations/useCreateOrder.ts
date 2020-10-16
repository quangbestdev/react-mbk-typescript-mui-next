import gql from 'graphql-tag'
import { useMutation, MutationHookOptions } from '@apollo/react-hooks'
import {
  CreateOrderMutation,
  CreateOrderMutationVariables,
  CreateOrderInput,
  createOrder as createOrderMutation,
  PartitionEnum,
} from '@onextech/mbk-api'
import { sanitizeData } from '../../../utils/data'

const useCreateOrder = (args: MutationHookOptions<CreateOrderMutation, CreateOrderMutationVariables> = {}) => {
  const [createOrder, onOrderCreated] = useMutation(gql(createOrderMutation), args)

  const handleCreateOrder = (input: Omit<CreateOrderInput, 'partition'>) => {
    const nextInput = { ...input, partition: PartitionEnum.PARTITION }
    return createOrder({ variables: { input: sanitizeData(nextInput) } })
  }

  return { handleCreateOrder, onOrderCreated }
}

export default useCreateOrder
