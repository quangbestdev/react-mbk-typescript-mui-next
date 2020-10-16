import React, { useState, useEffect } from 'react'
import { Grid, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Router from 'next/router'
import Layout from '../../components/Layout/Layout'
import CustomerDetailsForm from './CustomerDetailsForm'
import PaymentDetailsForm from './PaymentDetailsForm'
import OrderSummarySection from './OrderSummarySection'
import { DiscountInterface } from '../../graphql/discount/typings'
import Block from '../../components/Block'

const useStyles = makeStyles((theme) => ({
  contentWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(5),
  },
  header: {
    color: theme.palette.text.primary,
    margin: theme.spacing(3.75, 0),
  },
}))

const Checkout: React.FC = (props) => {
  const classes = useStyles(props)

  const [billingDetails, setBillingDetails] = useState(null)
  const [shipping, setShipping] = useState(0)
  const [customerFormSubmitted, setSubmitCustomerForm] = useState(false)

  useEffect(() => {
    // Set local delivery fee as the initial state
    setShipping(6)
  }, [])

  const handleUpdateBillingDetail = (billingDetails) => {
    setSubmitCustomerForm(true)
    setBillingDetails(billingDetails)
  }

  const handleShippingFeeChange = (value) => {
    setShipping(Number(value))
  }

  const onSuccess = () => {
    Router.push('/order/success')
  }

  // Store Discount state
  const [discounts, setDiscounts] = useState<DiscountInterface[]>([])

  return (
    <Layout title="Checkout">
      <Block py={5} bgcolor="grey.50">
        <Container maxWidth="md">
          <Grid container spacing={3} className={classes.contentWrapper}>
            <Grid item xs={12} md={8}>
              {customerFormSubmitted ? (
                <PaymentDetailsForm
                  billingDetails={billingDetails}
                  discounts={discounts}
                  shipping={shipping}
                  onSuccess={onSuccess}
                />
              ) : (
                <CustomerDetailsForm
                  handleUpdateBillingDetail={handleUpdateBillingDetail}
                  handleShippingFeeChange={handleShippingFeeChange}
                />
              )}
            </Grid>

            <Grid item xs={12} md={4}>
              <OrderSummarySection onSubmitDiscounts={setDiscounts} discounts={discounts} shipping={shipping} />
            </Grid>
          </Grid>
        </Container>
      </Block>
    </Layout>
  )
}

export default Checkout
