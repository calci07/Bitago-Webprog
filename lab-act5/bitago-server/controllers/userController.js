const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

function publicUser(user) {
  return {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    age: user.age,
    gender: user.gender,
    contactNumber: user.contactNumber,
    email: user.email,
    role: user.role,
    username: user.username,
    address: user.address,
    isActive: user.isActive,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  }
}

async function getUsers(req, res) {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 })
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

async function createUser(req, res) {
  try {
    const { email, username, password } = req.body

    if (!email || !username || !password) {
      return res.status(400).json({ message: 'Email, username, and password are required.' })
    }

    const duplicate = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { username: username.toLowerCase() }],
    })

    if (duplicate) {
      return res.status(409).json({ message: 'Email or username is already registered.' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({ ...req.body, password: hashedPassword })

    res.status(201).json(publicUser(user))
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

async function updateUser(req, res) {
  try {
    const payload = { ...req.body }

    if (payload.password) {
      payload.password = await bcrypt.hash(payload.password, 10)
    }

    const user = await User.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    }).select('-password')

    if (!user) {
      return res.status(404).json({ message: 'User not found.' })
    }

    res.json(user)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

async function deleteUser(req, res) {
  try {
    const user = await User.findByIdAndDelete(req.params.id)

    if (!user) {
      return res.status(404).json({ message: 'User not found.' })
    }

    res.json({ message: 'User deleted successfully.' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body
    const login = String(email).trim().toLowerCase()
    const user = await User.findOne({
      $or: [{ email: login }, { username: login }],
    })

    if (!user) {
      return res.status(404).json({ message: 'User not found.' })
    }

    if (user.role === 'viewer') {
      return res.status(403).json({ message: 'Viewer accounts do not have dashboard access.' })
    }

    if (!user.isActive) {
      return res.status(403).json({ message: 'Your account is inactive. Contact an administrator.' })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials.' })
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
    )

    res.json({
      message: 'Login successful.',
      token,
      user: publicUser(user),
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
}
