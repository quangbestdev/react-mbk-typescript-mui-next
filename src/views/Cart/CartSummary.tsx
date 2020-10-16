import React from 'react'
import { Box, Button, Grid, Typography } from '@material-ui/core'
import { ListCartItemsQuery } from '@onextech/mbk-api'
import { formatCurrency } from '../../utils/utils'

interface CartSummaryProps {
  cartItems: ListCartItemsQuery['listCartItems']['items']
  onSubmit: () => void
}

const CartSummary: React.FC<CartSummaryProps> = (props) => {
  const { cartItems, onSubmit } = props

  const totalCost = cartItems.reduce((total, cartItem) => {
    return total + (cartItem.variant?.price || 0) * cartItem.quantity
  }, 0)

  return (
    <Box bgcolor="common.white" p={3}>
      <Typography variant="h5">Order Summary</Typography>

      <Box my={2}>
        <Grid container>
          <Grid item xs={8}>
            <Typography variant="body2" color="textSecondary">
              Subtotal ({cartItems.length} items)
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2" align="right">
              {formatCurrency(totalCost)}
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Grid container>
        <Grid item xs={6}>
          <Typography variant="body1"><b>Total</b></Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1" align="right">
            <b>{formatCurrency(totalCost)}</b>
          </Typography>
        </Grid>
      </Grid>

      <Box mt={3}>
        <Button variant="contained" color="primary" onClick={onSubmit} fullWidth>
          Check Out
        </Button>
      </Box>
    </Box>
  )
}

export default CartSummary
