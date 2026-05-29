const express = require('express')
const {
  createUser,
  deleteUser,
  getUsers,
  loginUser,
  updateUser,
} = require('../controllers/userController')

const router = express.Router()

router.route('/').get(getUsers).post(createUser)
router.route('/:id').put(updateUser).delete(deleteUser)
router.post('/login', loginUser)

module.exports = router
