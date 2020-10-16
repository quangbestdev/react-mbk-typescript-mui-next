import React from 'react'
import clsx from 'clsx'
import { BoxProps, Box, Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles<Theme, InfoCardProps>((theme) => ({
  infoCard: {
    width: 290,
    height: 360,
    background: ({ image }: InfoCardProps) =>
      `linear-gradient(to top, ${theme.palette.common.black}, rgba(0, 0, 0, 0) 86%), url('${image}')`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    borderRadius: 4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: theme.spacing(4),
    [theme.breakpoints.only('xs')]: {
      margin: '0 auto',
    },
    '&:hover': {
      background: ({ image }: InfoCardProps) =>
        `linear-gradient(to top, rgba(179, 78, 64, 0.8), rgba(179, 78, 64, 0.8)), url('${image}')`,
      justifyContent: 'flex-start',
      padding: theme.spacing(4),
      '& .MuiTypography-root': {
        fontWeight: 700,
      },
      '& #description': {
        display: 'inline',
      },
    },
  },
  title: {
    color: theme.palette.primary.contrastText,
  },
  subtitle: {
    color: theme.palette.primary.contrastText,
    marginBottom: theme.spacing(2),
  },
  description: {
    display: 'none',
    color: theme.palette.text.contrast,
    fontWeight: 700,
    lineHeight: 1.2,
  },
}))

interface InfoCardProps extends BoxProps {
  className?: string
  title?: string
  subtitle?: string
  description?: string
  image: string
}

const InfoCard: React.FC<InfoCardProps> = (props) => {
  const { className, title, subtitle, description } = props
  const classes = useStyles(props)

  return (
    <Box className={clsx(classes.infoCard, classes.className)}>
      <Typography variant="h6" className={classes.title}>
        {title}
      </Typography>
      <Typography variant="body2" className={classes.subtitle}>
        {subtitle}
      </Typography>
      <Typography variant="subtitle1" className={classes.description} id="description">
        {description}
      </Typography>
    </Box>
  )
}

export default InfoCard
