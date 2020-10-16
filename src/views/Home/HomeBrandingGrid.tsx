import React from 'react'
import Link from 'next/link'
import Typography from '@material-ui/core/Typography'
import { Box, Grid, Button, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { HOME_DEFAULT_CONTENT } from './constants'

// TODO Props and typing, rendering with data

const useStyles = makeStyles((theme: Theme) => ({
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
}))

// TODO: Should take in a array of advertisements
const HomeBrandingGrid = (props) => {
  const classes = useStyles()
  const { advertisements } = props

  return (
    <>
      <Box pr={{ xs: 0, md: 8 }} pl={{ xs: 0, md: 8 }}>
        <Box clone py={9.375}>
          <Grid container spacing={2}>
            <Grid container direction="column" justify="space-between" item xs={12} md={6}>
              <Typography variant="overline">{HOME_DEFAULT_CONTENT.overline}</Typography>
              <Typography variant="h3">{HOME_DEFAULT_CONTENT.title}</Typography>
            </Grid>
            <Grid container direction="column" justify="space-between" item xs={12} md={6}>
              <Box mb={{ xs: 1.5, md: 0 }}>
                <Typography variant="body1">{HOME_DEFAULT_CONTENT.body}</Typography>
              </Box>
              <Link href="/about" passHref>
                <Box alignSelf="flex-start" clone>
                  <Button variant="contained" color="secondary">
                    Learn More
                  </Button>
                </Box>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Img Grid */}
      <Grid container spacing={1}>
        <Grid item xs={6} md={8}>
          <img className={classes.image} src="/home/branding-1.jpg" alt="spirited chocolate box" />
        </Grid>
        <Grid item xs={6} md={4}>
          <img className={classes.image} src="/home/branding-2.jpg" alt="chocolate covered fruit" />
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <img className={classes.image} src="/home/branding-3.jpg" alt="chocolates on tray" />
        </Grid>
        <Grid item xs={4}>
          <img className={classes.image} src="/home/branding-4.jpg" alt="cocoa beans and chocolate bar" />
        </Grid>
        <Grid item xs={4}>
          <img className={classes.image} src="/home/branding-5.jpg" alt="chocolate dripping off of spoon" />
        </Grid>
      </Grid>
    </>
  )
}

export default HomeBrandingGrid
