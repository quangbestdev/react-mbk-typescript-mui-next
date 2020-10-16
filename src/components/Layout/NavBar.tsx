import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import kebabCase from 'lodash/kebabCase'
import MenuIcon from '@material-ui/icons/Menu'
import PersonIcon from '@material-ui/icons/Person'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { AppBar, Box, Button, Grid, IconButton, Theme, Toolbar, Typography } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import Logo from './Logo'
import CartPopperMenu from './CartPopperMenu'
import NavLink from './NavLink'
import NavDrawer from './NavDrawer'
import { useAuth } from '../../auth'
import { NAVLINKS } from './constants'

interface NavBarProps {
  onBackBtnClick?: () => void
}

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    background: theme.palette.background.primary,
  },
  navBarMdUp: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  navBarSmDown: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  buttonText: {
    lineHeight: 1,
  },
  hamburgerButton: {
    padding: theme.spacing(1.5, 0),
  },
}))

const NavBar: React.FC<NavBarProps> = () => {
  const router = useRouter()
  const { user, signOut } = useAuth()
  const classes = useStyles()
  const theme = useTheme()

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen)

  const hamburgerNavLinks = [
    {
      label: 'Close',
      render: (
        <IconButton
          className={classes.hamburgerButton}
          color="primary"
          onClick={toggleDrawer}
          aria-label="close drawer"
        >
          <CloseIcon fontSize="large" />
        </IconButton>
      ),
    },
    {
      label: 'Home',
      href: '/',
    },
    ...NAVLINKS,
    user
      ? {
          label: 'Sign Out',
          render: (
            <Box mt={1}>
              <Button color="primary" className={classes.hamburgerButton} onClick={handleSignOut}>
                Sign Out
              </Button>
            </Box>
          ),
        }
      : {
          label: 'Log In',
          render: (
            <Box mt={1}>
              <Link href="/login" passHref>
                <Button color="primary" className={classes.hamburgerButton}>
                  Log In
                </Button>
              </Link>
            </Box>
          ),
        },
  ]

  const renderLoginButton = (user) => {
    if (user)
      return (
        <Box color={theme.palette.icon}>
          <Button color="inherit" onClick={handleSignOut} startIcon={<ExitToAppIcon />}>
            <Typography className={classes.buttonText} color="textPrimary" variant="subtitle2">
              Sign Out
            </Typography>
          </Button>
        </Box>
      )
    return (
      <Link href="/login" passHref>
        <Box color={theme.palette.icon}>
          <Button color="inherit" startIcon={<PersonIcon />}>
            <Typography className={classes.buttonText} color="textPrimary" variant="subtitle2">
              Sign In
            </Typography>
          </Button>
        </Box>
      </Link>
    )
  }

  const renderNavLink = (navLink) => {
    const { href, render, ...rest } = navLink
    return href ? <NavLink {...rest} href={href} key={navLink.href} /> : render
  }

  const renderMenuButton = ({ onClick }) => {
    return (
      <Box
        minWidth={80}
        bgcolor={theme.palette.secondary.main}
        display="flex"
        alignSelf="stretch"
        alignItems="center"
        justifyContent="center"
      >
        <Box color={theme.palette.primary.contrastText}>
          <IconButton onClick={onClick} color="inherit">
            <MenuIcon color="inherit" />
          </IconButton>
        </Box>
      </Box>
    )
  }

  return (
    <AppBar classes={{ root: classes.appBar }} position="static" elevation={0}>
      <Toolbar component="div" disableGutters>
        {/* Nav Links @ SM and below */}
        <Grid container className={classes.navBarSmDown}>
          <Grid container item xs={3}>
            {renderMenuButton({ onClick: () => toggleDrawer() })}
          </Grid>

          <Grid item xs={6}>
            <Box display="flex" alignItems="center" justifyContent="center" py={1.5}>
              <Logo />
            </Box>
          </Grid>

          <Grid container justify="center" item xs={3}>
            <CartPopperMenu />
          </Grid>
        </Grid>

        {/* Nav Links @ MD and above */}
        <Box width="100%" height="100%" display="flex" alignItems="center" className={classes.navBarMdUp}>
          <Box
            minWidth={180}
            bgcolor={theme.palette.secondary.light}
            display="flex"
            alignItems="center"
            justifyContent="center"
            py={1}
          >
            <Logo />
          </Box>

          {/* TODO: Not sure what the menu button on md is meant to do? */}
          {renderMenuButton({ onClick: () => toggleDrawer() })}

          <Grid container wrap="nowrap">
            <Grid container item md={8}>
              {NAVLINKS.map((navLink) => {
                return (
                  <Box ml={5} display="flex" alignItems="center" key={kebabCase(navLink.label)}>
                    {renderNavLink(navLink)}
                  </Box>
                )
              })}
            </Grid>

            <Box clone pr={8}>
              <Grid container justify="flex-end" alignItems="center" item md={4}>
                {renderLoginButton(user)}
                <CartPopperMenu />
              </Grid>
            </Box>
          </Grid>
        </Box>

        {/* Nav Drawer */}
        <NavDrawer open={isDrawerOpen} onClose={toggleDrawer} links={hamburgerNavLinks} />
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
