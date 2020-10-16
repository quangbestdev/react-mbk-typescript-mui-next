import React from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { FulfillmentStatusEnum, ModelSortDirection } from '@onextech/mbk-api'
import { Box, Tabs, Tab } from '@material-ui/core'
import { useListOrdersByCustomer } from '../../../graphql/order'
import OrderList from './OrderList'
import { useAuth } from '../../../auth'
import { headerFontFamily } from '../../../theme/typography'

const useStyles = makeStyles((theme) => ({
  wrapper: {
    marginTop: theme.spacing(6.25),
    flex: 1,
  },
  tabsWrapper: {
    marginBottom: theme.spacing(5),
    borderBottom: `1px solid ${theme.palette.primary.light}`,
    '& .Mui-selected': {
      color: theme.palette.primary.main,
    },
  },
}))

const StyledTab = withStyles((theme) => ({
  root: {
    fontFamily: headerFontFamily,
    fontSize: theme.typography.subtitle1.fontSize,
    color: theme.palette.primary.light,
    fontWeight: 700,
    textTransform: 'none',
    marginRight: theme.spacing(4),
    '&:hover': {
      color: theme.palette.primary.main,
    },
    '&:focus': {
      color: theme.palette.primary.main,
    },
  },
}))((props: any) => <Tab {...props} />)

const StyledTabs = withStyles((theme) => ({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',

    '& > div': {
      width: '100%',
      backgroundColor: theme.palette.primary.main,
    },
  },
}))((props: any) => <Tabs {...props} TabIndicatorProps={{ children: <div /> }} />)

const Orders: React.FC = () => {
  const classes = useStyles()
  const { user } = useAuth()
  const [tab, setTab] = React.useState(0)

  const handleChange = (event, newTab) => {
    setTab(newTab)
  }

  const { orders } = useListOrdersByCustomer({
    variables: {
      filter: {
        userID: {
          eq: user?.id,
        },
      },
      sortDirection: ModelSortDirection.DESC,
    },
    skip: !user?.id,
    fetchPolicy: 'cache-and-network',
  })

  const completedOrders = orders.filter((order) => order.fulfillmentStatus === FulfillmentStatusEnum.completed)

  return (
    <Box className={classes.wrapper}>
      <Box className={classes.tabsWrapper}>
        <StyledTabs value={tab} onChange={handleChange} aria-label="Order Tabs">
          <StyledTab label="All" />
          <StyledTab label="Completed" />
        </StyledTabs>
      </Box>
      <OrderList orders={tab === 0 ? orders : completedOrders} />
    </Box>
  )
}

export default Orders
