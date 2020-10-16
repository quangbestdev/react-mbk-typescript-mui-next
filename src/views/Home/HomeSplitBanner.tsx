import React from 'react'
import Link from 'next/link'
import Typography from '@material-ui/core/Typography'
import { Box, Button, ButtonProps, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { HOME_BLOCK_VERT_SPACING_SM, HOME_BLOCK_VERT_SPACING_MD, DEFAULT_HORIZ_PADDING } from './constants'

interface HomeSplitBannerProps {
  image: string
  overline: string
  title: string
  body: string
  button: { color: ButtonProps['color']; label: string; href: string }
  reverse?: boolean
  backgroundColor?: string
}

const useStyles = makeStyles(() => ({
  image: {
    width: '100%',
    objectFit: 'cover',
  },
}))

const HomeSplitBanner: React.FC<HomeSplitBannerProps> = (props) => {
  const { image, overline, title, body, button, reverse, backgroundColor } = props || {}
  const classes = useStyles({ backgroundColor })

  return (
    <Box
      bgcolor={backgroundColor || 'transparent'}
      mt={{ xs: HOME_BLOCK_VERT_SPACING_SM, md: HOME_BLOCK_VERT_SPACING_MD }}
      mb={{ xs: HOME_BLOCK_VERT_SPACING_SM, md: HOME_BLOCK_VERT_SPACING_MD }}
      mx={backgroundColor ? -DEFAULT_HORIZ_PADDING : 'initial'}
      px={backgroundColor ? DEFAULT_HORIZ_PADDING : 'initial'}
      py={backgroundColor ? 4 : 'initial'}
    >
      <Grid container direction={reverse ? 'row-reverse' : 'row'} spacing={3}>
        <Box clone display="flex" flexDirection="column" justifyContent="center">
          <Grid item xs={12} md={5}>
            <Typography variant="overline">{overline}</Typography>
            <Typography variant="h3">{title}</Typography>
            <Box maxWidth={500} my={3}>
              <Typography variant="body1">{body}</Typography>
            </Box>
            <Link href={button.href} passHref>
              <Box alignSelf="flex-start" clone>
                <Button variant="contained" color={button.color}>
                  {button.label}
                </Button>
              </Box>
            </Link>
          </Grid>
        </Box>
        <Grid item xs={12} md={7}>
          <img className={classes.image} src={image} alt={title} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default HomeSplitBanner
