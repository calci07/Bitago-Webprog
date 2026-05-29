const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

function slugifyUsername(value) {
  return String(value ?? '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '')
}

function splitLines(value) {
  return Array.isArray(value)
    ? value.map((item) => String(item).trim()).filter(Boolean)
    : String(value ?? '')
        .split(/\n+/)
        .map((item) => item.trim())
        .filter(Boolean)
}

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.message || 'Request failed.')
  }

  return data
}

export function buildRegistrationPayload({ fullName, email, password }) {
  const normalizedEmail = String(email ?? '').trim().toLowerCase()
  const normalizedName = String(fullName ?? '').trim()
  const nameParts = normalizedName.split(/\s+/).filter(Boolean)
  const firstName = nameParts[0] || 'New'
  const lastName = nameParts.slice(1).join(' ') || 'User'
  const username = slugifyUsername(normalizedName || normalizedEmail.split('@')[0])

  return {
    firstName,
    lastName,
    age: 'N/A',
    gender: 'other',
    contactNumber: 'N/A',
    email: normalizedEmail,
    role: 'editor',
    username,
    password,
    address: 'N/A',
    isActive: true,
  }
}

export function buildArticlePayload(article) {
  return {
    name: String(article.name ?? '').trim() || undefined,
    title: String(article.title ?? '').trim(),
    summary: String(article.summary ?? '').trim(),
    body: splitLines(article.body),
    takeaways: splitLines(article.takeaways),
    isAvailable:
      typeof article.isAvailable === 'boolean' ? article.isAvailable : true,
  }
}

export function normalizeApiArticle(article, index = 0) {
  const id = article._id || article.id || index + 1

  return {
    ...article,
    id,
    mongoId: article._id || id,
    name: String(article.name ?? '').trim(),
    title: String(article.title ?? '').trim(),
    summary: String(article.summary ?? '').trim(),
    body: splitLines(article.body),
    takeaways: splitLines(article.takeaways),
    isAvailable:
      typeof article.isAvailable === 'boolean' ? article.isAvailable : true,
  }
}

export function registerUser(form) {
  return request('/users', {
    method: 'POST',
    body: JSON.stringify(buildRegistrationPayload(form)),
  })
}

export function loginUser({ login, password }) {
  return request('/users/login', {
    method: 'POST',
    body: JSON.stringify({
      email: String(login ?? '').trim().toLowerCase(),
      password,
    }),
  })
}

export function getArticles() {
  return request('/articles').then((articles) => articles.map(normalizeApiArticle))
}

export function createArticle(article) {
  return request('/articles', {
    method: 'POST',
    body: JSON.stringify(buildArticlePayload(article)),
  }).then(normalizeApiArticle)
}

export function updateArticle(id, article) {
  return request(`/articles/${id}`, {
    method: 'PUT',
    body: JSON.stringify(buildArticlePayload(article)),
  }).then(normalizeApiArticle)
}
