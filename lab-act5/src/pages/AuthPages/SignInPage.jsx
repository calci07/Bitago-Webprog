import { useState } from 'react'
import { Alert, Button, Stack, TextField, Typography } from '@mui/material'
import { Link as RouterLink, useNavigate } from 'react-router-dom'

const emailPattern = /\S+@\S+\.\S+/

function SignInPage() {
  const navigate = useNavigate()
  const [values, setValues] = useState({
    email: '',
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

    if (!values.email.trim()) {
      nextErrors.email = 'Email is required.'
    } else if (!emailPattern.test(values.email)) {
      nextErrors.email = 'Enter a valid email address.'
    }

    if (!values.password.trim()) {
      nextErrors.password = 'Password is required.'
    }

    return nextErrors
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const nextErrors = validate()

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      setFormMessage(
        nextErrors.email === 'Enter a valid email address.'
          ? 'Provide a valid email address to continue.'
          : 'Enter your email and password to continue.',
      )
      return
    }

    navigate('/dashboard')
  }

  return (
    <Stack component="form" spacing={2.5} onSubmit={handleSubmit} noValidate>
      <Typography color="text.secondary">
        Sign in with a valid email and a non-empty password to access the
        dashboard routes.
      </Typography>

      {formMessage ? <Alert severity="warning">{formMessage}</Alert> : null}

      <TextField
        label="Email"
        type="email"
        fullWidth
        value={values.email}
        onChange={handleChange('email')}
        error={Boolean(errors.email)}
        helperText={errors.email || ' '}
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
