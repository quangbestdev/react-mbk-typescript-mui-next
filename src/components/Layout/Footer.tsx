import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Box, Divider, Grid, IconButton, Typography, Theme } from '@material-ui/core'
import FacebookIcon from '@material-ui/icons/Facebook'
import InstagramIcon from '@material-ui/icons/Instagram'
import TwitterIcon from '@material-ui/icons/Twitter'
import NavLink from './NavLink'
import config from '../../config'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  linksWrapper: {
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  imageWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center',
      marginTop: theme.spacing(1),
    },
  },
  bottomRowWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      textAlign: 'center',
    },
  },
}))

const Footer: React.FC = () => {
  const classes = useStyles()
  const theme = useTheme()

  const navLinks = [
    { label: 'Shop', href: '/shop', isFooter: true },
    { label: 'About Us', href: '/about', isFooter: true },
    { label: 'Contact', href: '/contact', isFooter: true },
    { label: 'Terms', href: '/terms', isFooter: true },
    { label: 'Privacy', href: '/privacy', isFooter: true },
  ]

  const renderNavLink = (navLink) => {
    const { href, render, ...rest } = navLink
    return href ? <NavLink {...rest} href={href} key={navLink.href} /> : render
  }

  return (
    <footer className={classes.root}>
      <Box px={10} py={4}>
        <Grid container alignItems="center">
          <Grid item md={3} />
          <Grid className={classes.linksWrapper} item xs={12} md={6}>
            {navLinks.map((navBarLink) => {
              return (
                <Box mr={{ xs: 0, md: 5 }} mb={{ xs: 1, md: 0 }} key={navBarLink.label}>
                  {renderNavLink(navBarLink)}
                </Box>
              )
            })}
          </Grid>
          <Grid className={classes.imageWrapper} item xs={12} md={3}>
            <img height={24} src="/payment.png" alt="payment logos" />
          </Grid>
        </Grid>
        <Box my={4}>
          <Divider />
        </Box>
        <Box className={classes.bottomRowWrapper} letterSpacing={3} color={theme.palette.text.light}>
          <Typography color="inherit" variant="caption">
            © 2020 {config.app.companyName}
          </Typography>
          <Box>
            <IconButton color="inherit" href={config.socialProfileLinks.facebook}>
              <FacebookIcon color="inherit" fontSize="small" />
            </IconButton>
            <IconButton href={config.socialProfileLinks.instagram}>
              <InstagramIcon fontSize="small" />
            </IconButton>
            <IconButton href={config.socialProfileLinks.twitter}>
              <TwitterIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </footer>
  )
}

export default Footer
