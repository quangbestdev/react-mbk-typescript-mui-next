import React from 'react'
import capitalize from 'lodash/capitalize'
import moment from 'moment'
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Container, Divider, Grid, Typography } from '@material-ui/core'
import grey from '@material-ui/core/colors/grey'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import { OrderTypeEnum } from '@onextech/mbk-api'
import PersonIcon from '@material-ui/icons/Person'
import OrderProductRow from './components/OrderProductRow'
import { ListOrderInterface } from '../../../graphql/order'
import OrderItemTotal from './components/OrderItemTotal'
import Button from '../../../components/Button'
import OrderEventRows from './components/OrderEventRows'
import { headerFontFamily } from '../../../theme/typography'

export interface OrderListProps {
  orders: ListOrderInterface[]
}

const useStyles = makeStyles((theme: any) => ({
  orderWrapper: {
    background: theme.palette.background.paper,
  },
  noOrderWrapper: {
    background: theme.palette.background.paper,
    padding: theme.spacing(5, 5.25),
    marginBottom: theme.spacing(5),
    width: 'auto',
    height: 500,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  detailsWrapper: {
    display: 'flex',
    padding: theme.spacing(5, 5.25, 4),
    [theme.breakpoints.only('xs')]: {
      flexDirection: 'column-reverse',
    },
  },
  purchasesWrapper: {
    padding: theme.spacing(4.5, 5.25),
    width: 'auto',
  },
  totalsWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: theme.spacing(5),
    padding: theme.spacing(2.75, 5.25),
    width: 'auto',
    [theme.breakpoints.up('md')]: {
      paddingRight: theme.spacing(10),
    },
  },
  orderDetailsHeaderWrapper: {
    [theme.breakpoints.only('xs')]: {
      display: 'flex',
      flexDirection: 'column',
    },
  },
  placedAtTitle: {
    fontFamily: headerFontFamily,
    color: theme.palette.text.description,
    [theme.breakpoints.only('xs')]: {
      textAlign: 'center',
    },
  },
  orderNo: {
    margin: theme.spacing(0.5, 0, 1.25),
    fontFamily: headerFontFamily,
    '& span': {
      color: theme.palette.primary.main,
    },
    [theme.breakpoints.only('xs')]: {
      textAlign: 'center',
      margin: theme.spacing(1.25, 0, 1.5),
    },
  },
  shippingDetailsWrapper: {
    marginTop: theme.spacing(3),
  },
  shippingDetail: {
    display: 'flex',
    alignItems: 'flex-start',
    '& > .MuiTypography-root': {
      fontFamily: headerFontFamily,
    },
    '& svg': {
      color: theme.palette.primary.main,
      marginRight: theme.spacing(1),
    },
    [theme.breakpoints.only('xs')]: {
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: theme.spacing(1),
      '& > .MuiTypography-root': {
        textAlign: 'center',
      },
    },
  },
  fulfillmentStatusWrapper: {
    backgroundColor: grey[50],
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(1),
    [theme.breakpoints.only('xs')]: {
      marginBottom: theme.spacing(3),
    },
  },
  orderStatusTitle: {
    fontFamily: headerFontFamily,
    color: theme.palette.text.secondary,
    textTransform: 'uppercase',
  },
  orderStatusDescription: {
    fontFamily: headerFontFamily,
    color: theme.palette.primary.main,
    fontWeight: 600,
  },
  columnHeader: {
    fontFamily: headerFontFamily,
    textTransform: 'uppercase',
    fontWeight: 700,
    color: theme.palette.primary.main,
    letterSpacing: 1,
  },
  columnHeaderRow: {
    marginBottom: theme.spacing(2.5),
    [theme.breakpoints.only('xs')]: {
      display: 'none',
    },
  },
  gridItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  leftGridItem: {
    display: 'flex',
    alignItems: 'center',
  },
  noOrder: {
    marginTop: theme.spacing(9),
    marginBottom: theme.spacing(1),
    textTransform: 'uppercase',
  },
  noOrderSubtitle: {
    color: theme.palette.common.black,
  },
  button: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(1, 3),
  },
}))

const OrderList: React.FC<OrderListProps> = (props) => {
  const classes = useStyles()
  const { orders } = props

  if (!orders?.length) {
    return (
      <Container className={classes.noOrderWrapper}>
        <Typography variant="h5" className={classes.noOrder}>
          You have no orders yet
        </Typography>
        <Typography variant="body2" className={classes.noOrderSubtitle}>
          Browse our wide selection of products
        </Typography>
        <Link href="/shop" passHref>
          <Button className={classes.button}>Continue Shopping</Button>
        </Link>
      </Container>
    )
  }

  return (
    <>
      {orders.map((order) => {
        const { id, createdAt, invoiceNo, fulfillmentInfo, fulfillmentStatus, eventStatus, lines, type } = order

        const { shippingAddress, customerInfo } = fulfillmentInfo || {}

        const { line1, zip } = shippingAddress || {}
        const { email, mobile, name } = customerInfo || {}

        return (
          <Box className={classes.orderWrapper} key={id}>
            {/* Order Details */}
            <Container className={classes.detailsWrapper}>
              <Grid container spacing={1}>
                <Grid className={classes.orderDetailsHeaderWrapper} item xs={12} sm={9}>
                  <Typography variant="caption" className={classes.placedAtTitle}>
                    Placed on {moment(createdAt).format('DD MMM YYYY, h:mma')}
                  </Typography>
                  <Typography variant="h5" className={classes.orderNo}>
                    Order <span>#{invoiceNo}</span>
                  </Typography>
                  <Grid className={classes.shippingDetailsWrapper} container>
                    <Grid className={classes.shippingDetail} item xs={12} md={5}>
                      <PersonIcon />
                      <Typography color="textPrimary" variant="caption">
                        {name} <br /> {email} <br /> {mobile}
                      </Typography>
                    </Grid>
                    <Grid className={classes.shippingDetail} item xs={12} md={7}>
                      <LocationOnIcon />
                      <Typography color="textPrimary" variant="caption">
                        {line1} <br /> {zip}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              {/* Fulfillment Status */}
              <Grid className={classes.fulfillmentStatusWrapper} item xs={12} sm={3}>
                <Typography variant="button" className={classes.orderStatusTitle}>
                  Status:
                </Typography>
                <Typography variant="button" className={classes.orderStatusDescription}>
                  {capitalize(type === OrderTypeEnum.EVENT ? eventStatus : fulfillmentStatus)}
                </Typography>
              </Grid>
            </Container>
            <Divider />

            {/* Purchases */}
            <Container className={classes.purchasesWrapper}>
              <Grid container className={classes.columnHeaderRow}>
                <Grid item xs={8} className={classes.leftGridItem}>
                  <Typography variant="body2" className={classes.columnHeader}>
                    Items
                  </Typography>
                </Grid>
                <Grid item xs={2} className={classes.gridItem}>
                  <Typography variant="body2" className={classes.columnHeader}>
                    Price
                  </Typography>
                </Grid>
                <Grid item xs={2} className={classes.gridItem}>
                  <Typography variant="body2" className={classes.columnHeader}>
                    Quantity
                  </Typography>
                </Grid>
              </Grid>

              {type === OrderTypeEnum.EVENT
                ? lines.map((line) => <OrderEventRows item={line} key={line?.event?.title} />)
                : lines.map((line) => <OrderProductRow item={line} key={line?.variant?.id} />)}
            </Container>
            <Divider />

            {/* Order Totals */}
            <Container className={classes.totalsWrapper}>
              <OrderItemTotal order={order} />
            </Container>
          </Box>
        )
      })}
    </>
  )
}

export default OrderList
