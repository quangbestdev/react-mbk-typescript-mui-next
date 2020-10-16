import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Box, Drawer, List, ListItem, ListItemText, Theme, Typography } from '@material-ui/core'
import NavLink from './NavLink'

interface NavDrawerProps {
  open: boolean
  onClose: () => void
  links: any
}

const useStyles = makeStyles<Theme>((theme) => ({
  drawer: {
    backgroundColor: theme.palette.background.light,
  },
}))

const NavDrawer: React.FC<NavDrawerProps> = (props) => {
  const classes = useStyles()
  const { open, onClose, links } = props

  const renderNavLink = (navLink) => {
    const { href, render, ...rest } = navLink
    return href ? <NavLink {...rest} href={href} key={navLink.href} /> : render
  }

  return (
    <Drawer open={open} anchor="left" onClose={onClose} classes={{ paper: classes.drawer }}>
      <Box role="presentation" width={469} padding={1.5}>
        <List dense>
          {links.map((navLink) => (
            <ListItem key={navLink.label}>
              <ListItemText>{renderNavLink(navLink)}</ListItemText>
            </ListItem>
          ))}
        </List>
        <ListItem>
          <Typography color="textSecondary" variant="body2">
            v{process.env.npm_package_version}
          </Typography>
        </ListItem>
      </Box>
    </Drawer>
  )
}

export default NavDrawer
