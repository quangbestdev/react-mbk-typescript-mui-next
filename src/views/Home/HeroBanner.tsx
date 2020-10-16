import React from 'react'
import Link from 'next/link'
import Typography from '@material-ui/core/Typography'
import { Box, Button, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { DEFAULT_HORIZ_PADDING, HOME_DEFAULT_CONTENT } from './constants'

interface HeroBannerStyles {
  backgroundSrc: string
}

const defaultLink = '/shop'
const defaultBackground = '/home/home-hero.jpg'

const useStyles = makeStyles<Theme, HeroBannerStyles>((theme) => ({
  root: {
    backgroundImage: ({ backgroundSrc }) => (backgroundSrc ? `url('${backgroundSrc}')` : `url('${defaultBackground}')`),
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    [theme.breakpoints.down('sm')]: {
      height: 450,
    },
  },
  title: {
    lineHeight: 1,
  },
}))

const HeroBanner = (props) => {
  const { advertisement } = props
  const { title, subtitle, media, link } = advertisement || {}

  const classes = useStyles({ backgroundSrc: media?.[0].src })

  return (
    <Box px={DEFAULT_HORIZ_PADDING} display="flex" alignItems="center" height={754} className={classes.root}>
      <Box maxWidth={500}>
        <Typography color="textSecondary" variant="overline">
          {HOME_DEFAULT_CONTENT.overline}
        </Typography>

        <Typography className={classes.title} variant="h2">
          {title || HOME_DEFAULT_CONTENT.title}
        </Typography>

        <Box mt={3.375} mb={3.875}>
          <Typography variant="body1">{subtitle || HOME_DEFAULT_CONTENT.body}</Typography>
        </Box>

        <Link href={`${link || defaultLink}`} passHref>
          <Button variant="contained" color="primary">
            Shop Chocolates
          </Button>
        </Link>
      </Box>
    </Box>
  )
}

export default HeroBanner
