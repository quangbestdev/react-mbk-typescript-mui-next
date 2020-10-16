import React from 'react'
import kebabCase from 'lodash/kebabCase'
import { Box, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import NavLink from './NavLink'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'fixed',
    top: 0,
    right: theme.spacing(3),
    transform: 'rotate(90deg)',
  },
}))

interface VerticalNavBarProps {}

const navLinks = [
  {
    label: 'Reservations',
    href: '/shop',
  },
  {
    label: 'Store Information',
    href: '/collections',
  },
]

const renderNavLink = (navLink) => {
  const { href, render, ...rest } = navLink
  return href ? <NavLink {...rest} href={href} key={navLink.href} /> : render
}

const VerticalNavBar: React.FC<VerticalNavBarProps> = (props) => {
  const classes = useStyles(props)

  return (
    <div className={classes.root}>
      <Box alignItems="center" justifyContent="center" position="absolute" display="flex" width="100vh">
        {navLinks.map((navLink, i) => {
          return (
            <Box mr={4} key={kebabCase(navLink.label)}>
              {renderNavLink(navLink)}
            </Box>
          )
        })}
      </Box>
    </div>
  )
}

export default VerticalNavBar
