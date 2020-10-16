import React from 'react'
import { Theme, Typography, Button, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt'
import Link from 'next/link'
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
      alignItems: 'center',
      [theme.breakpoints.down('sm')]: {
        alignItems: 'center',
      },
    },
  },
  button: {
    backgroundColor: theme.palette.common.white,
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

const HeroBanner: React.FC = () => {
  const classes = useStyles()

  return (
    <Hero background={{ src: '/mtj_hero.jpg' }} className={classes.hero}>
      <Typography variant="overline" gutterBottom>
        The Official Store
      </Typography>

      <Typography variant="h1">MTJ</Typography>

      <Typography variant="subtitle1">By Marilyn Tan</Typography>

      <Box mt={4}>
        <Link href="/shop" passHref>
          <Button variant="contained" className={classes.button} endIcon={<ArrowRightAltIcon />}>
            Explore
          </Button>
        </Link>
      </Box>
    </Hero>
  )
}

export default HeroBanner
