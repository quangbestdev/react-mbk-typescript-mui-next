import React from 'react'
import clsx from 'clsx'
import Link from 'next/link'
import Typography from '@material-ui/core/Typography'
import { Box, Container, Divider, Link as MUILink, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { S3Image } from '@onextech/gvs-kit/core'
import { formatCurrency } from '../../utils/utils'
import { ListProductInterface } from '../../graphql/product'
import { useListVariantsByProduct } from '../../graphql/variant'

const CARD_IMAGE_HEIGHT = 200

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
  image: {
    objectFit: 'contain',
  },
  bottomRowDetails: {
    fontWeight: 600,
    fontSize: theme.typography.subtitle2.fontSize,
  },
  price: {
    letterSpacing: 1,
  },
}))

interface ProductCardProps {
  product: ListProductInterface
}

const ProductCard: React.FC<ProductCardProps> = (props) => {
  const { product } = props
  const { slug } = product
  const classes = useStyles()

  const { variants } = useListVariantsByProduct({
    variables: {
      productID: product?.id,
    },
    skip: !product?.id,
    fetchPolicy: 'cache-and-network',
  })

  return (
    <Link href="/shop/[slug]" as={`/shop/${slug}`} passHref>
      <Box className={classes.root}>
        {product?.media?.[0]?.src ? (
          <S3Image
            width="100%"
            height={CARD_IMAGE_HEIGHT}
            className={classes.image}
            src={product?.media?.[0]?.src}
            alt={product?.title}
          />
        ) : (
          <Box height={CARD_IMAGE_HEIGHT} display="flex" alignItems="center" justifyContent="center" bgcolor="grey.100">
            <Typography>No Image Found</Typography>
          </Box>
        )}

        <Container maxWidth="xs">
          <Box clone fontWeight={600}>
            <Typography align="center">{product?.title}</Typography>
          </Box>

          <Box mt={4} display="flex" justifyContent="center">
            <Typography className={clsx(classes.bottomRowDetails, classes.price)}>
              {formatCurrency(variants?.[0]?.price).replace('.00', '')}
            </Typography>
            <Box display="flex" mx={3}>
              <Divider flexItem orientation="vertical" />
            </Box>
            <Typography className={classes.bottomRowDetails} color="primary">
              <Link href="/shop/[slug]" as={`/shop/${slug}`} passHref>
                <MUILink>Shop now</MUILink>
              </Link>
            </Typography>
          </Box>
        </Container>
      </Box>
    </Link>
  )
}

export default ProductCard
