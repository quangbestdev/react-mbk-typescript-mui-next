import React from 'react'
import Link from 'next/link'
import { Box } from '@material-ui/core'
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles(() => ({
  root: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
}))

const Logo = () => {
  const classes = useStyles()

  return (
    <Link passHref href="/">
      <Box display="flex" className={classes.root}>
        <img height={54} src="/logo.png" alt="logo" />
      </Box>
    </Link>
  )
}

export default Logo
