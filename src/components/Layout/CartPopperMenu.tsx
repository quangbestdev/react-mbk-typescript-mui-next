import React from 'react'
import { sumBy } from 'lodash'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { Menu, Box, BoxProps, Grid } from '@material-ui/core'
import { S3Image } from '@onextech/gvs-kit/core'
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import Link from 'next/link'
import { red } from '@material-ui/core/colors'
import { CartItemInterface } from '../../graphql/cart'
import { formatCurrency } from '../../utils/utils'

// TODO: Integrate cart item data

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(1, 2.5),
    borderRadius: 24,
    border: `1px solid ${theme.palette.divider}`,
    marginLeft: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0,
      padding: theme.spacing(1, 2),
      '& > span > .MuiButton-startIcon': {
        marginRight: 0,
      },
    },
  },
  icon: {
    color: theme.palette.icon,
  },
  buttonText: {
    lineHeight: 1,
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
}))

interface CartPopperMenuProps extends BoxProps {
  cartItems?: CartItemInterface[]
}

const CartPopperMenu: React.FC<CartPopperMenuProps> = (props) => {
  const classes = useStyles()
  const theme = useTheme()
  const { cartItems, ...rest } = props
  const [cartAnchorEl, setCartAnchorEl] = React.useState(null)
  const handleOpenCart = (event) => {
    setCartAnchorEl(event.currentTarget)
  }
  const handleCloseCart = () => {
    setCartAnchorEl(null)
  }

  return (
    <>
      <Box display="flex" alignSelf="center" className={classes.root} {...rest} clone>
        <Button startIcon={<ShoppingCartIcon className={classes.icon} />} onClick={handleOpenCart}>
          <Box display="flex">
            <Typography className={classes.buttonText} variant="subtitle2">
              Cart
            </Typography>
            <Typography className={classes.buttonText} variant="subtitle2">
              <Box color={theme.palette.text.light}>($0.00)</Box>
            </Typography>
          </Box>
          <Box
            width={20}
            height={20}
            ml={1}
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="50%"
            color={theme.palette.common.white}
            bgcolor={red[500]}
          >
            {(cartItems && sumBy(cartItems, 'quantity')) || 0}
          </Box>
        </Button>
      </Box>

      <Menu
        id="user-icon-menu"
        anchorEl={cartAnchorEl}
        keepMounted
        autoFocus={false}
        open={Boolean(cartAnchorEl)}
        onClose={handleCloseCart}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Box p={3} width={1}>
          {cartItems?.length ? (
            cartItems.map((cartItem) => {
              const image = cartItem.variant?.product?.media?.[0]?.src
              const title = cartItem.variant?.product?.title
              const price = (cartItem.variant?.price || 0) * cartItem.quantity
              return (
                <Grid container key={cartItem.id}>
                  <Grid item xs={12} sm={3}>
                    <S3Image src={image} alt="product" />
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <Typography variant="overline">{title}</Typography>
                    <Typography color="textSecondary" variant="subtitle2">
                      {formatCurrency(price)}
                    </Typography>
                  </Grid>
                </Grid>
              )
            })
          ) : (
            <Box display="flex" justifyContent="center">
              <Typography>Your cart is empty</Typography>
            </Box>
          )}
        </Box>

        <Box width={1}>
          {cartItems && (
            <>
              <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography variant="overline">Subtotal</Typography>
                <Typography>Total Cost</Typography>
              </Box>
              <Box>
                <Link href="/cart" passHref>
                  <Button variant="contained" color="primary" fullWidth>
                    Proceed to cart
                  </Button>
                </Link>
              </Box>
            </>
          )}
        </Box>
      </Menu>
    </>
  )
}

export default CartPopperMenu
