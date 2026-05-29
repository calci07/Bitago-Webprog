const Article = require('../models/Article')

function slugify(value) {
  return String(value ?? '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

async function getArticles(req, res) {
  try {
    const query = req.query.available === 'true' ? { isAvailable: true } : {}
    const articles = await Article.find(query).sort({ createdAt: -1 })
    res.json(articles)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

async function createArticle(req, res) {
  try {
    const article = await Article.create({
      ...req.body,
      name: req.body.name || slugify(req.body.title),
    })

    res.status(201).json(article)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

async function updateArticle(req, res) {
  try {
    const payload = { ...req.body }

    if (!payload.name && payload.title) {
      payload.name = slugify(payload.title)
    }

    const article = await Article.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    })

    if (!article) {
      return res.status(404).json({ message: 'Article not found.' })
    }

    res.json(article)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

async function deleteArticle(req, res) {
  try {
    const article = await Article.findByIdAndDelete(req.params.id)

    if (!article) {
      return res.status(404).json({ message: 'Article not found.' })
    }

    res.json({ message: 'Article deleted successfully.' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  getArticles,
  createArticle,
  updateArticle,
  deleteArticle,
}
