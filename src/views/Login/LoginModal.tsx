import React from 'react'
import { Box, Typography } from '@material-ui/core'
import PortalModal from '../../components/PortalModal'
import LoginForm from './LoginForm'
import { useAuth } from '../../auth'

type LoginModalProps = React.ComponentProps<typeof PortalModal>

const LoginModal: React.FC<LoginModalProps> = (props) => {
  const { closeLoginModal } = useAuth()

  const onLoginSuccess = () => {
    closeLoginModal()
  }

  return (
    <PortalModal open close={closeLoginModal}>
      <Box p={4}>
        <Typography variant="h4" gutterBottom>
          Welcome back
        </Typography>
        <Typography variant="body2">Enter your details below to access your shopping cart.</Typography>

        <Box mt={4}>
          <LoginForm isModal onLoginSuccess={onLoginSuccess} />
        </Box>
      </Box>
    </PortalModal>
  )
}

export default LoginModal
