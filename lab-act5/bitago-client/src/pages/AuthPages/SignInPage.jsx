import { useState } from 'react'
import { Alert, Button, Stack, TextField, Typography } from '@mui/material'
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom'
import { authenticateLocalUser, saveLocalSession } from '../../auth/localAuth'
import { loginUser } from '../../api/client'

function SignInPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [values, setValues] = useState({
    login: '',
    password: '',
  })
  const [errors, setErrors] = useState({})
  const [formMessage, setFormMessage] = useState('')

  const handleChange = (field) => (event) => {
    const nextValue = event.target.value

    setValues((current) => ({
      ...current,
      [field]: nextValue,
    }))

    setErrors((current) => ({
      ...current,
      [field]: '',
    }))
    setFormMessage('')
  }

  const validate = () => {
    const nextErrors = {}

    if (!values.login.trim()) {
      nextErrors.login = 'Username or email is required.'
    } else if (/\s/.test(values.login)) {
      nextErrors.login = 'Username must not contain spaces.'
    }

    if (!values.password.trim()) {
      nextErrors.password = 'Password is required.'
    } else if (values.password.length < 8) {
      nextErrors.password = 'Password must be at least 8 characters.'
    }

    return nextErrors
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const nextErrors = validate()

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      setFormMessage(
        nextErrors.login === 'Username must not contain spaces.'
          ? 'Username must not contain spaces.'
          : 'Enter your username/email and password to continue.',
      )
      return
    }

    try {
      const result = await loginUser(values)
      saveLocalSession(result.user)
      navigate(location.state?.from?.pathname || '/dashboard')
    } catch (error) {
      const localResult = authenticateLocalUser(values)

      if (!localResult.ok) {
        setFormMessage(error.message || localResult.message)
        return
      }

      saveLocalSession(localResult.user)
      navigate(location.state?.from?.pathname || '/dashboard')
    }
  }

  return (
    <Stack component="form" spacing={2.5} onSubmit={handleSubmit} noValidate>
      <Typography color="text.secondary">
        Use your username or email to pick up where you left off.
      </Typography>

      {formMessage ? <Alert severity="warning">{formMessage}</Alert> : null}

      <TextField
        label="Username or Email"
        fullWidth
        value={values.login}
        onChange={handleChange('login')}
        error={Boolean(errors.login)}
        helperText={errors.login || 'Use your assigned account credentials.'}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        value={values.password}
        onChange={handleChange('password')}
        error={Boolean(errors.password)}
        helperText={errors.password || ' '}
      />
      <Button type="submit" variant="contained" size="large">
        Sign In
      </Button>
      <Button component={RouterLink} to="/auth/signup" variant="text">
        Need an account? Sign up
      </Button>
    </Stack>
  )
}

export default SignInPage
