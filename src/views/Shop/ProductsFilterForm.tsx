import React from 'react'
import Typography from '@material-ui/core/Typography'
import { Divider, List, ListItem, ListItemText, Box } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { useFilters } from '@onextech/gvs-kit/hooks'
import { useListCategories } from '../../graphql/category'
import { DEFAULT_BODY } from '../Home/constants'

interface ProductsFilterFormProps {
  filters?: ReturnType<typeof useFilters>[0]
  addFilter?: ReturnType<typeof useFilters>[1]
  isDrawer?: boolean
}

const useStyles = makeStyles(() => ({
  list: {
    '& .MuiDivider-root': {
      display: 'none',
    },
  },
  listItem: {
    '&.MuiListItem-gutters': {
      padding: 0,
    },
  },
}))

const ProductsFilterForm: React.FC<ProductsFilterFormProps> = (props) => {
  const classes = useStyles(props)
  const theme = useTheme()
  const { filters, addFilter, isDrawer } = props
  const { categories } = useListCategories()
  const [selectedCategory = null] = filters?.categories || []

  const handleChangeCategory = (category) => {
    addFilter({ categories: category ? [category] : null })
  }

  return (
    <Box>
      {!isDrawer && (
        <Typography variant="overline" color="textSecondary">
          Welcome to Mr. Bucket
        </Typography>
      )}
      <Typography variant="h3">Categories</Typography>
      {!isDrawer && (
        <>
          <Box color={theme.palette.text.light} mt={1.5}>
            <Typography variant="body2">{DEFAULT_BODY}</Typography>
          </Box>

          <Box my={3}>
            <Divider />
          </Box>
        </>
      )}

      {/* Product Types Filter */}
      <List className={classes.list}>
        {Boolean(categories.length) &&
          categories.map((category) => (
            <>
              <ListItem
                button
                key={category.id}
                className={classes.listItem}
                selected={selectedCategory && selectedCategory.id === category.id}
                onClick={() => handleChangeCategory(category)}
              >
                <Box clone color={theme.palette.text.light} letterSpacing={1}>
                  <ListItemText primaryTypographyProps={{ variant: 'button' }}>{category.title}</ListItemText>
                </Box>
              </ListItem>
            </>
          ))}
      </List>
    </Box>
  )
}

export default ProductsFilterForm
