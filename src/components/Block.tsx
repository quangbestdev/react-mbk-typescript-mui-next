import React from 'react'
import clsx from 'clsx'
import { Box, BoxProps, Container, Theme } from '@material-ui/core'
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles<Theme, BlockStyleProps>((theme) => ({
  root: {
    color: ({ dark }) => (dark ? theme.palette.common.white : 'inherit'),
  },
  background: {
    backgroundRepeat: 'no-repeat',
    backgroundImage: ({ background = {} }) => (background.src ? `url(${background.src})` : ''),
    backgroundPosition: ({ background = {} }) => background.position || 'center',
    backgroundSize: ({ background = {} }) => background.size || 'cover',
    backgroundColor: ({ background = {} }) => background.color || '',
    // Adding overlay to background image @link: https://stackoverflow.com/a/36679903
    boxShadow: ({ background = {} }) => (background.overlay ? 'inset 0 0 0 50vw rgba(0, 0, 0, 0.4)' : 'unset'),
  },
}))

interface BlockStyleProps {
  dark?: boolean
  background?: {
    src?: string
    size?: string
    position?: string
    overlay?: boolean
    color?: string
  }
}

export interface BlockProps extends BoxProps, BlockStyleProps {
  container?: boolean | Partial<React.ComponentProps<typeof Container>>
}

const Block: React.FC<BlockProps> = (props) => {
  const { container, background, children, className, dark, ...rest } = props
  const classes = useStyles({ background, dark })

  const wrapperProps = {
    px: { xs: 0.75, md: 0 },
    className: clsx(classes.root, background && classes.background, className),
    ...rest,
  }

  const content = container ? (
    <Container {...container}>
      <>{children}</>
    </Container>
  ) : (
    children
  )

  return <Box {...wrapperProps}>{content}</Box>
}

export default Block
