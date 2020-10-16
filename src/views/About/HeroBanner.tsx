import React from 'react'
import { Theme, Typography, ButtonBase, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Hero from '../../components/Hero'

const useStyles = makeStyles((theme: Theme) => ({
  hero: {
    height: 520,
    [theme.breakpoints.up('md')]: {
      height: 720,
    },
    '& .MuiContainer-root': {
      height: '100%',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      [theme.breakpoints.down('sm')]: {
        alignItems: 'center',
      },
    },
  },
  button: {
    width: 100,
    height: 100,
    [theme.breakpoints.down('sm')]: {
      width: 50,
      height: 50,
    },
  },
  image: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
  },
}))

interface HeroBannerProps {
  title?: string
}

const HeroBanner: React.FC<HeroBannerProps> = (props) => {
  const { title = 'How it all began' } = props
  const classes = useStyles(props)

  return (
    <Hero background={{ src: '/mtj_hero.jpg' }} className={classes.hero}>
      <Box maxWidth={620} mb={{ xs: 5, md: 13 }} textAlign="center">
        <Typography variant="h2" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          The MTJ brand is more than a name. It is a set of values and attributes expressed through a visual identity
          that reflects the spirit of the organisation.
        </Typography>
      </Box>
    </Hero>
  )
}

export default HeroBanner
