import React from 'react'
import Link from 'next/link'
import Typography from '@material-ui/core/Typography'
import { Box, Button, ButtonProps, Grid, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { HOME_BLOCK_VERT_SPACING_SM, HOME_BLOCK_VERT_SPACING_MD } from './constants'

interface FooterBannerProps {
  image: string
  overline: string
  title: string
  body: string
  buttons: { color: ButtonProps['color']; label: string; href: string }[]
}

const IMAGE_WIDTH_HEIGHT = 400
const IMAGE_WIDTH_HEIGHT_XS = 200

const useStyles = makeStyles((theme: Theme) => ({
  image: {
    width: IMAGE_WIDTH_HEIGHT,
    height: IMAGE_WIDTH_HEIGHT,
    objectFit: 'cover',
    [theme.breakpoints.down('xs')]: {
      width: IMAGE_WIDTH_HEIGHT_XS,
      height: IMAGE_WIDTH_HEIGHT_XS,
    },
  },
  buttonWrapper: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
}))

const FooterBanner: React.FC<FooterBannerProps> = (props) => {
  const classes = useStyles()
  const { image, overline, title, body, buttons } = props || {}

  return (
    <Box
      mt={{ xs: HOME_BLOCK_VERT_SPACING_SM, md: HOME_BLOCK_VERT_SPACING_MD }}
      mb={{ xs: HOME_BLOCK_VERT_SPACING_SM, md: HOME_BLOCK_VERT_SPACING_MD }}
    >
      <Grid container spacing={3}>
        <Grid item container justify="center" alignItems="center" xs={12} md={6}>
          <img className={classes.image} src={image} alt={title} />
        </Grid>
        <Box clone display="flex" flexDirection="column" justifyContent="center">
          <Grid item xs={12} md={6}>
            <Typography variant="overline">{overline}</Typography>
            <Typography variant="h3">{title}</Typography>
            <Box maxWidth={500} my={3}>
              <Typography variant="body1">{body}</Typography>
            </Box>
            <Box display="flex" className={classes.buttonWrapper}>
              {buttons?.map((button) => (
                <Box mr={2} mb={1}>
                  <Link href={button.href} passHref>
                    <Button variant="contained" color={button.color}>
                      {button.label}
                    </Button>
                  </Link>
                </Box>
              ))}
            </Box>
          </Grid>
        </Box>
      </Grid>
    </Box>
  )
}

export default FooterBanner
