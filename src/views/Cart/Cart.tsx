import React, { useState } from 'react'
import Router from 'next/router'
import { Grid, Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Layout from '../../components/Layout/Layout'
import ShoppingBag from './ShoppingBag'
import CartSummary from './CartSummary'
import { CartItemInterface, useCurrentCart } from '../../graphql/cart'
import Block from '../../components/Block'

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    padding: theme.spacing(0, 4.5),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0, 2),
    },
  },
  contentWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  header: {
    margin: theme.spacing(3.75, 0),
    color: theme.palette.text.primary,
    fontSize: theme.typography.pxToRem(30),
  },
}))

const Cart: React.FC = (props) => {
  const classes = useStyles(props)

  const onSubmit = () => {
    Router.push('/checkout')
  }

  // This section of Hooks and Methods will be used during integration with Backend
  const { cartItems, handleUpdateCartItem, handleDeleteCartItem } = useCurrentCart()
  const [selected, setSelected] = useState<CartItemInterface[]>(cartItems)
  const handleSelect = (item: CartItemInterface, isSelected: boolean) => {
    if (!isSelected) return setSelected(selected.filter((selectedItem) => selectedItem.id !== item.id))
    const isAlreadySelected = selected.find((selectedItem) => selectedItem.id === item.id)
    if (!isAlreadySelected) return setSelected(selected.concat(item))
  }
  const handleSelectAll = () => {
    if (selected.length === cartItems.length) return setSelected([])
    setSelected(cartItems)
  }
  const handleChange = (item: CartItemInterface) => (quantity: number) => {
    handleUpdateCartItem({ id: item.id, quantity })
  }
  const handleDelete = (item: CartItemInterface) => {
    handleDeleteCartItem({ id: item.id })
  }
  // ------------------------------- End Of Section -------------------------------

  return (
    <Layout title="Cart">
      <Block py={5} container bgcolor="grey.50" height="100%">
        <Typography variant="h5" className={classes.header}>
          Shopping Cart
        </Typography>

        <Grid container className={classes.contentWrapper}>
          <Grid item xs={12} md={9}>
            <ShoppingBag cartItems={cartItems} handleDelete={handleDelete} handleChange={handleChange} />
          </Grid>

          <Grid item xs={12} md={3}>
            <CartSummary cartItems={cartItems} onSubmit={onSubmit} />
          </Grid>
        </Grid>
      </Block>
    </Layout>
  )
}

export default Cart
