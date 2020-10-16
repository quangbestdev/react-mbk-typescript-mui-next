import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link as MUILink, Typography, Theme } from '@material-ui/core'
import NextLink from 'next/link'
import { bodyFontFamily, overlineFontFamily } from '../../theme/typography'

interface NavLinkStyles {
  isFooter: boolean
}

interface NavLinkProps {
  label?: string
  href: string
  isFooter?: boolean
}

const useStyles = makeStyles<Theme, NavLinkStyles>(() => ({
  link: {
    fontFamily: ({ isFooter }) => (isFooter ? bodyFontFamily : overlineFontFamily),
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
}))

const NavLink: React.FC<NavLinkProps> = (props) => {
  const { label, href, children, isFooter } = props
  const classes = useStyles({ isFooter })

  return (
    <Typography className={classes.link} color="textPrimary" variant="subtitle2">
      <NextLink href={href} passHref>
        <MUILink color="inherit">{label || children}</MUILink>
      </NextLink>
    </Typography>
  )
}

export default NavLink
