import React from 'react'
import { Box, Button, Typography, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import config from '../../config'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 200,
    margin: theme.spacing(2, 0, 5.5),
  },
}))

const Landing: React.FC = (props) => {
  const classes = useStyles(props)

  return (
    <Box className={classes.root}>
      <Typography align="center" variant="h4">
        Coming Soon
      </Typography>
      <img className={classes.image} src="/mbk-logo.png" alt="mbk-logo" />
      <Button href={config.waitlist} variant="contained" color="primary">
        Join The Waitlist
      </Button>
    </Box>
  )
}

export default Landing
