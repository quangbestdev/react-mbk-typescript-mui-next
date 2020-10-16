import React, { useEffect } from 'react'
import Link from 'next/link'
import { TextField } from '@onextech/gvs-kit/core'
import { Box, Grid, Typography } from '@material-ui/core'
import { Controller, useForm } from 'react-hook-form'
import Button from '../../components/Button'
import { useAuth } from '../../auth'
import { SHIPPING_LOCATION_OPTIONS } from './const'

const CustomerDetailsForm = (props) => {
  const { className, isEvent, handleUpdateBillingDetail, handleShippingFeeChange } = props
  const { user, updateUser } = useAuth()

  // Init Form
  const defaultValues = {
    email: user?.email,
    name: user?.name,
    mobile: user?.mobile,
    address: user?.address?.line1,
    state: user?.address?.line2,
    country: user?.address?.country,
    city: user?.address?.city,
    zip: user?.address?.zip,
    gift: false,
  }
  const { control, reset, getValues, formState, handleSubmit, watch } = useForm({ defaultValues })
  const { isSubmitting } = formState

  const shippingFee = watch('shippingFee')

  useEffect(() => {
    if (!isSubmitting) reset(defaultValues)
  }, [user])

  const onSubmit = () => {
    const values = getValues()
    updateUser(values)
    if (handleUpdateBillingDetail) handleUpdateBillingDetail(values)
  }

  return (
    <Box p={3} bgcolor="white">
      <form className={className} onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <Typography variant="h4">Account Information</Typography>

          {!user && (
            <Typography variant="body2">
              Already have an account? <Link href="/login">Log in</Link>
            </Typography>
          )}

          <Box mt={2}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  as={TextField}
                  control={control}
                  fullWidth
                  label="Email"
                  name="email"
                  placeholder="Enter your email"
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  as={TextField}
                  control={control}
                  fullWidth
                  name="name"
                  placeholder="Enter your name"
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  as={TextField}
                  control={control}
                  fullWidth
                  label="Phone Number"
                  name="mobile"
                  type="number"
                  placeholder="Enter your phone number"
                  required
                />
              </Grid>
            </Grid>
          </Box>
        </Box>

        <Box mt={6}>
          <Typography variant="h4">{isEvent ? 'Billing Address' : 'Delivery Address'}</Typography>

          <Typography variant="caption" color="textSecondary">
            *We deliver within 5 working days between 9am - 7pm
          </Typography>

          <Box mt={2}>
            <Controller
              as={TextField}
              control={control}
              fullWidth
              options={SHIPPING_LOCATION_OPTIONS}
              label="Shipping Location"
              name="shippingFee"
              required
              onChange={handleShippingFeeChange(shippingFee)}
            />
          </Box>

          <Box mt={2}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  as={TextField}
                  control={control}
                  fullWidth
                  label="Address"
                  name="address"
                  placeholder="Enter your address"
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  as={TextField}
                  control={control}
                  fullWidth
                  label="State"
                  name="state"
                  placeholder="Enter your postal code"
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  as={TextField}
                  control={control}
                  fullWidth
                  label="Country"
                  name="country"
                  placeholder="Enter your country"
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  as={TextField}
                  control={control}
                  fullWidth
                  label="City"
                  name="city"
                  placeholder="Enter your city"
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  as={TextField}
                  control={control}
                  fullWidth
                  label="Postal Code"
                  name="zip"
                  placeholder="Enter your state"
                  required
                />
              </Grid>
            </Grid>
          </Box>
        </Box>

        <Box mt={6} textAlign="right">
          <Button variant="contained" color="primary" type="submit" disabled={isSubmitting}>
            Continue
          </Button>
        </Box>
      </form>
    </Box>
  )
}

export default CustomerDetailsForm
