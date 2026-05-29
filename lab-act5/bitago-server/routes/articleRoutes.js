const express = require('express')
const {
  createArticle,
  deleteArticle,
  getArticles,
  updateArticle,
} = require('../controllers/articleController')

const router = express.Router()

router.route('/').get(getArticles).post(createArticle)
router.route('/:id').put(updateArticle).delete(deleteArticle)

module.exports = router
