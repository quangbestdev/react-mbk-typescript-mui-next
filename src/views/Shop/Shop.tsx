import React, { useState } from 'react'
import { Box, Button, Chip, Drawer, Grid, Theme, Typography, useMediaQuery } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { getFilterChips, getGraphQLFilter } from '@onextech/gvs-kit/utils'
import { useFilters } from '@onextech/gvs-kit/hooks'
import Layout from '../../components/Layout/Layout'
import ProductsFilterForm from './ProductsFilterForm'
import ProductCard from './ProductCard'
import { useListProducts } from '../../graphql/product'
import Block from '../../components/Block'
import { DEFAULT_HORIZ_PADDING } from '../Home/constants'

const useStyles = makeStyles((theme: Theme) => ({
  topBarButton: {
    color: theme.palette.common.white,
    letterSpacing: 1,
    opacity: 0.5,
    '&:active': {
      opacity: 1,
    },
  },
  drawerPaper: {
    width: 300,
    padding: theme.spacing(3),
  },
  filterWrapper: {
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
}))

const productFilterFields = {
  categories: { op: 'eq', key: 'id', filterKey: 'categoryID' },
}

const Shop: React.FC = (props) => {
  const classes = useStyles(props)
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }

  // Filters
  const [filters, addFilter, removeFilter] = useFilters()
  const filter = getGraphQLFilter(productFilterFields)(filters)

  // Chips
  const filterChips = getFilterChips(filters)

  const { products } = useListProducts({ variables: { filter } })

  return (
    <Layout title="Shop">
      <Block
        container={{ maxWidth: 'md' }}
        background={{ src: '/shop/shop-hero.jpg', position: 'center bottom' }}
        dark
        pt={10}
        pb={17}
      >
        <Typography align="center" variant="h2">
          Delightful Chocolate Treats
        </Typography>
      </Block>

      {/* TODO: How will this filter work? */}
      <Box
        className={classes.filterWrapper}
        px={DEFAULT_HORIZ_PADDING}
        py={4}
        bgcolor={theme.palette.secondary.main}
      >
        <Button className={classes.topBarButton}>All</Button>
        <Button className={classes.topBarButton}>Bon Bons</Button>
        <Button className={classes.topBarButton}>Chocolate Bars</Button>
        <Button className={classes.topBarButton}>Drinking Chocolate</Button>
      </Box>

      <Box py={7} px={DEFAULT_HORIZ_PADDING}>
        <Grid container spacing={4}>
          {/* Filter Section */}
          <Grid item xs={12} md={3}>
            {isSmallScreen ? (
              <Box display="flex" justifyContent="center">
                <Button variant="contained" color="primary" onClick={toggleDrawer}>
                  Show Filters
                </Button>
              </Box>
            ) : (
              <ProductsFilterForm filters={filters} addFilter={addFilter} />
            )}
          </Grid>

          {/* Product Cards Section */}
          <Grid item xs={12} md={9}>
            <Box className={classes.filterWrapper} mb={2}>
              {filterChips.map((item) => (
                <Box clone ml={{ xs: 0, md: 1 }}>
                  <Chip
                    color="primary"
                    key={item.label}
                    label={`${item.name}: ${item.label}`}
                    onDelete={() => removeFilter({ key: item.key })}
                  />
                </Box>
              ))}
            </Box>
            <Grid container spacing={3}>
              {products.map((product) => (
                <Grid key={product.id} item xs={12} sm={6} md={4}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>

      {/* Drawer - for screen sizes SM and below */}
      <Drawer
        open={isDrawerOpen}
        anchor="left"
        onClose={toggleDrawer}
        classes={{ paper: classes.drawerPaper }}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <ProductsFilterForm isDrawer filters={filters} addFilter={addFilter} />
      </Drawer>
    </Layout>
  )
}

export default Shop
