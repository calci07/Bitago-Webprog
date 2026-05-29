export const ARTICLES_KEY = 'roles-webapp-articles'

export const seedArticles = [
  {
    id: 1,
    name: 'dashboard-overview',
    title: 'Reading The Daily Picture',
    summary:
      'Use daily activity, profile, work style, and location signals to understand where the team stands right now.',
    body: [
      'A useful operations dashboard starts with the current picture. Total users, average profile details, flexible work patterns, and location signals give teams a quick sense of scale before they dig into individual records.',
      'Those first numbers are not meant to answer every question. They help leaders decide where to look next: a changing trend, a location with unusual activity, or a group of records that may need a follow-up conversation.',
      'The value comes from connecting signals. Metrics show the scale of what is happening, reports explain movement over time, and location context helps teams understand whether a pattern is isolated or part of a broader operational shift.',
    ],
    takeaways: [
      'Start with a clear baseline before interpreting deeper trends.',
      'Look for changes that point to a practical follow-up action.',
      'Use location and record details to confirm what the summary numbers suggest.',
    ],
    isAvailable: true,
  },
  {
    id: 2,
    name: 'reports-visualization',
    title: 'Turning Trends Into Decisions',
    summary:
      'Use trend views to understand whether performance signals are improving, slipping, or holding steady.',
    body: [
      'Daily summaries are useful, but trends show whether today is part of a pattern. Reporting helps teams compare activity over time, identify movement across groups, and separate normal variation from signals that deserve attention.',
      'Good reporting should create a short path from observation to decision. When a line rises, a distribution shifts, or a comparison widens, the next question should be clear: what changed, who is affected, and what should happen next?',
      'For teams reviewing operations regularly, reports also create a shared record of progress. They make it easier to discuss performance with the same facts in view and to return to the evidence behind earlier decisions.',
    ],
    takeaways: [
      'Use trends to distinguish a momentary change from a lasting pattern.',
      'Connect every chart back to a decision or follow-up question.',
      'Review reports consistently so performance conversations stay grounded.',
    ],
    isAvailable: true,
  },
  {
    id: 3,
    name: 'users-table-management',
    title: 'Following Up With The Right Records',
    summary:
      'Use a structured user directory to compare people, locations, and status signals when a closer review is needed.',
    body: [
      'When a metric changes, teams often need to know which records sit behind it. A structured directory gives reviewers a dependable place to compare names, teams, locations, ages, and status information without jumping between disconnected sources.',
      'The directory works best as a follow-up tool. Summary numbers point to a possible issue, reports explain the trend, and individual records help teams understand who may need outreach, clarification, or support.',
      'Clear record review reduces guesswork. When status language is consistent and key details are easy to scan, teams can spend less time hunting for context and more time deciding the right next step.',
    ],
    takeaways: [
      'Use the directory to verify the people or teams behind a signal.',
      'Compare records with the same fields so follow-up is consistent.',
      'Keep status labels clear enough to support quick action.',
    ],
    isAvailable: true,
  },
  {
    id: 4,
    name: 'approval-workflow',
    title: 'Preparing Access Reviews',
    summary:
      'Coordinate account reviews before publishing changes that affect who can view or manage platform records.',
    body: [
      'Access reviews should happen before permissions change hands. A short review gives administrators time to confirm status, role fit, and the business reason for the requested access.',
      'Keeping draft guidance out of the public article list protects teams from acting on instructions that still need approval.',
    ],
    takeaways: [
      'Review account status before changing permissions.',
      'Publish guidance only after the workflow is approved.',
    ],
    isAvailable: false,
  },
]

export const blankArticleForm = {
  title: '',
  summary: '',
  body: '',
  takeaways: '',
  isAvailable: true,
}

function slugify(value) {
  return String(value ?? '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function splitLines(value) {
  return Array.isArray(value)
    ? value.map((item) => String(item).trim()).filter(Boolean)
    : String(value ?? '')
        .split(/\n+/)
        .map((item) => item.trim())
        .filter(Boolean)
}

export function normalizeArticle(article, index = 0) {
  const title = String(article.title ?? '').trim()
  const id = article._id || article.id || index + 1

  return {
    ...article,
    id,
    mongoId: article._id || article.mongoId || id,
    name: slugify(article.name || title),
    title,
    summary: String(article.summary ?? '').trim(),
    body: splitLines(article.body),
    takeaways: splitLines(article.takeaways),
    isAvailable:
      typeof article.isAvailable === 'boolean' ? article.isAvailable : true,
  }
}

export function loadArticleDirectory() {
  try {
    const rawArticles = localStorage.getItem(ARTICLES_KEY)
    return rawArticles
      ? JSON.parse(rawArticles).map(normalizeArticle)
      : seedArticles.map(normalizeArticle)
  } catch {
    localStorage.removeItem(ARTICLES_KEY)
    return seedArticles.map(normalizeArticle)
  }
}

export function saveArticleDirectory(articles) {
  const normalizedArticles = articles.map(normalizeArticle)
  localStorage.setItem(ARTICLES_KEY, JSON.stringify(normalizedArticles))
  return normalizedArticles
}

export function publicArticleRows(articles = loadArticleDirectory()) {
  return articles.filter((article) => article.isAvailable)
}

export function filterArticleRows(articles, filters) {
  const query = String(filters.query ?? '').trim().toLowerCase()

  return articles.filter((article) => {
    const searchable = [article.title, article.summary, article.name]
      .join(' ')
      .toLowerCase()
    const matchesQuery = !query || searchable.includes(query)
    const matchesAvailability =
      filters.availability === 'all' ||
      !filters.availability ||
      (filters.availability === 'available'
        ? article.isAvailable
        : !article.isAvailable)

    return matchesQuery && matchesAvailability
  })
}

export function validateArticleForm(form) {
  const errors = {}

  if (!String(form.title).trim()) errors.title = 'Title is required.'
  if (String(form.summary).trim().length < 24) {
    errors.summary = 'Summary must be at least 24 characters.'
  }
  if (splitLines(form.body).length === 0) {
    errors.body = 'Add at least one article paragraph.'
  }
  if (splitLines(form.takeaways).length === 0) {
    errors.takeaways = 'Add at least one takeaway.'
  }

  return errors
}
