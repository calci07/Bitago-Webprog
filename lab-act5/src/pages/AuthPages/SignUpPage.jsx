import { useState } from 'react'
import { Alert, Button, Stack, TextField, Typography } from '@mui/material'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { saveLocalSession } from '../../auth/localAuth'
import { registerUser } from '../../api/client'

const emailPattern = /\S+@\S+\.\S+/

function SignUpPage() {
  const navigate = useNavigate()
  const [values, setValues] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
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

    if (!values.fullName.trim()) {
      nextErrors.fullName = 'Full name is required.'
    }

    if (!values.email.trim()) {
      nextErrors.email = 'Email is required.'
    } else if (!emailPattern.test(values.email)) {
      nextErrors.email = 'Enter a valid email address.'
    }

    if (!values.password.trim()) {
      nextErrors.password = 'Password is required.'
    }

    if (!values.confirmPassword.trim()) {
      nextErrors.confirmPassword = 'Confirm your password.'
    } else if (values.password !== values.confirmPassword) {
      nextErrors.confirmPassword = 'Password and confirm password must match.'
    }

    return nextErrors
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const nextErrors = validate()

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)

      if (nextErrors.confirmPassword === 'Password and confirm password must match.') {
        setFormMessage('Password and confirm password must match.')
      } else if (nextErrors.email === 'Enter a valid email address.') {
        setFormMessage('Provide a valid email address before continuing.')
      } else {
        setFormMessage('Complete all required fields before creating an account.')
      }

      return
    }

    try {
      const user = await registerUser(values)
      saveLocalSession(user)
      navigate('/dashboard')
    } catch (error) {
      setFormMessage(error.message || 'Unable to create account.')
    }
  }

  return (
    <Stack component="form" spacing={2.5} onSubmit={handleSubmit} noValidate>
      <Typography color="text.secondary">
        Request access with your work email. After your details are confirmed,
        you can sign in with an approved account.
      </Typography>

      {formMessage ? <Alert severity="warning">{formMessage}</Alert> : null}

      <TextField
        label="Full name"
        fullWidth
        value={values.fullName}
        onChange={handleChange('fullName')}
        error={Boolean(errors.fullName)}
        helperText={errors.fullName || ' '}
      />
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
      <TextField
        label="Confirm password"
        type="password"
        fullWidth
        value={values.confirmPassword}
        onChange={handleChange('confirmPassword')}
        error={Boolean(errors.confirmPassword)}
        helperText={errors.confirmPassword || ' '}
      />
      <Button type="submit" variant="contained" size="large">
        Create Account
      </Button>
      <Button component={RouterLink} to="/auth/signin" variant="text">
        Already have an account? Sign in
      </Button>
    </Stack>
  )
}

export default SignUpPage
