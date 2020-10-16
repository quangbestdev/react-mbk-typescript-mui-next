import React from 'react'
import { Box, Grid, Typography, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Layout from '../../components/Layout/Layout'
import RegisterForm from './RegisterForm'

const useStyles = makeStyles((theme: Theme) => ({
  mobileTextWrapper: {
    margin: theme.spacing(5),
    maxWidth: '100%',
    [theme.breakpoints.up('xl')]: {
      margin: theme.spacing(10),
    },
  },
  workingWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(1.5),
  },
  subHeader: {
    marginBottom: theme.spacing(5.5),
    fontWeight: 400,
  },
  image: {
    maxHeight: '80vh',
    width: '100%',
    objectFit: 'cover',
  },
  form: {
    width: '100%',
  },
}))

const Register: React.FC = (props) => {
  const classes = useStyles(props)

  return (
    <Layout title="Register">
      <Grid container>
        <Grid item xs={12} md={4} className={classes.workingWrapper}>
          <Box maxWidth={355} className={classes.mobileTextWrapper}>
            <Typography variant="h3" className={classes.header}>
              Sign up
            </Typography>
            <Typography variant="body1" className={classes.subHeader}>
              Enter your details below to create your account.
            </Typography>
            <RegisterForm />
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <Box display="flex">
            <img src="/mood/chainmail_collection.jpg" className={classes.image} />
          </Box>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default Register
