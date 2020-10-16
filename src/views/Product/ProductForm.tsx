import React, { useMemo, useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Box, Button, Grid, Typography } from '@material-ui/core'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import { makeStyles } from '@material-ui/core/styles'
import RadioButtonsField from '../../components/RadioButtonsField'
import NumberStepper from '../../components/Form/NumberField/NumberStepper'
import { ProductInterface } from '../../graphql/product'
import { formatCurrency } from '../../utils/utils'
import { getVariantAttrsFromVariants, disableOptionValuesForUnavailableVariants } from './utils'
import { VariantInterface } from '../../graphql/variant'

interface ProductFormProps {
  handleAddToCart: (variant: VariantInterface, quantity: number) => void
  product?: ProductInterface
}

interface ProductFormValues {
  [key: string]: string | number
  quantity: number
}

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: theme.typography.button.fontSize,
    color: theme.palette.text.light,
    [theme.breakpoints.only('xs')]: {
      marginBottom: theme.spacing(2),
      textAlign: 'center',
    },
  },
  sectionWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1.5),
  },
  radioButtonsFieldWrapper: {
    '& > * > button': {
      marginRight: theme.spacing(1),
      [theme.breakpoints.only('xs')]: {
        margin: theme.spacing(0, 0, 1.5),
      },
    },
  },
  numberStepperWrapper: {
    [theme.breakpoints.only('xs')]: {
      display: 'flex',
      justifyContent: 'center',
    },
  },
  actionButtonWrapper: {
    display: 'flex',
    marginTop: theme.spacing(3.5),
    [theme.breakpoints.only('xs')]: {
      justifyContent: 'center',
    },
  },
  addToCartButton: {
    padding: theme.spacing(1, 3),
    [theme.breakpoints.only('xs')]: {
      padding: theme.spacing(1, 2),
    },
    '& .MuiButton-label .MuiSvgIcon-root': {
      color: theme.palette.common.white,
    },
  },
  icon: {
    color: theme.palette.icon,
  },
  formMessageText: {
    marginTop: theme.spacing(1),
    color: theme.palette.error.main,
    [theme.breakpoints.only('xs')]: {
      textAlign: 'center',
    },
  },
}))

const defaultValues = { quantity: 1 }

// TODO: Get variants using hook

const ProductForm: React.FC<ProductFormProps> = (props) => {
  const classes = useStyles()
  const { control, handleSubmit, formState, watch, errors } = useForm<ProductFormValues>({ defaultValues })
  const { isSubmitting } = formState
  const { product, handleAddToCart } = props

  const options = product?.options || []

  // const variants = product?.variants?.items || []
  // const variantAttrs = useMemo(() => getVariantAttrsFromVariants(variants), [variants])
  const values = watch()

  // const primaryVariant = variants?.find(({ isPrimary }) => isPrimary)
  // const chosenVariant =
  //   variants.find((variant) => {
  //     const { attrs } = variant
  //     return attrs && attrs.every(({ title, value }) => values[title] === value)
  //   }) || primaryVariant
  // const price = chosenVariant?.price ?? 0

  const [isBoughtLastStock, setIsBoughtLastStock] = useState(false)

  // const onSubmit = () => {
  //   handleAddToCart(chosenVariant, values.quantity)

  //   if (chosenVariant.stock - values.quantity < 1) {
  //     setIsBoughtLastStock(true)
  //   }
  // }

  const [isOutOfStock, setIsOutOfStock] = useState(false)
  const [formMessage, setFormMessage] = useState(null)

  // Check for stock when changing variant or quantity
  // useEffect(() => {
  //   if (!chosenVariant) return

  //   const cartedQuantity = chosenVariant.carted?.reduce((total, { quantity }) => total + quantity, 0) ?? 0
  //   const isNoStock = typeof chosenVariant.stock === 'number' && chosenVariant.stock - cartedQuantity < 1
  //   const isInsufficientStock = chosenVariant.stock && chosenVariant.stock - cartedQuantity - values?.quantity < 0

  //   setIsOutOfStock(false)
  //   setFormMessage(null)

  //   if (isNoStock || isInsufficientStock) {
  //     setIsOutOfStock(true)
  //   }
  //   if (!isBoughtLastStock && isNoStock) {
  //     return setFormMessage('Sorry, item is out of stock')
  //   }
  //   if (!isBoughtLastStock && isInsufficientStock) {
  //     return setFormMessage('Insufficient stock available, please reduce quantity')
  //   }
  // }, [chosenVariant, values])

  return (
    <form>
      {/* Options */}
      <Box mt={4}>
        {options?.map((option) => (
          <Grid container key={option.title} className={classes.sectionWrapper}>
            <Grid item xs={12} sm={2}>
              <Typography className={classes.title} variant="body1">
                {option.title}
              </Typography>
            </Grid>

            {/* <Grid item xs={12} sm={10} className={classes.radioButtonsFieldWrapper}>
              <Controller
                name={option.title}
                as={RadioButtonsField}
                control={control}
                rules={{ required: 'Required' }}
                options={disableOptionValuesForUnavailableVariants(option, variantAttrs, values)}
                error={Boolean(errors[option.title] && errors[option.title]?.message)}
                helperText={errors[option.title] && errors[option.title]?.message}
              />
            </Grid> */}
          </Grid>
        ))}
      </Box>

      {/* Quantity */}
      <Grid container className={classes.sectionWrapper}>
        <Grid item xs={12} sm={2}>
          <Typography className={classes.title} variant="body1">
            Quantity
          </Typography>
        </Grid>
        <Grid className={classes.numberStepperWrapper} item xs={12} sm={10}>
          <Controller name="quantity" as={NumberStepper} control={control} rules={{ required: 'Required' }} min={1} />
        </Grid>
        {formMessage && (
          <Grid item xs={12} sm={10}>
            <Typography className={classes.formMessageText}>{formMessage}</Typography>
          </Grid>
        )}
      </Grid>
      {/* Actions */}
      <Box className={classes.actionButtonWrapper}>
        <Button
          startIcon={<ShoppingCartIcon className={classes.icon} />}
          variant="contained"
          color="secondary"
          className={classes.addToCartButton}
          type="submit"
          disabled={isSubmitting || isOutOfStock}
        >
          Add To Cart
        </Button>
      </Box>
    </form>
  )
}

export default ProductForm
