import {
  loadArticleDirectory,
  publicArticleRows,
} from '../DashboardPages/articleDashboardUtils'

export const publicArticles = publicArticleRows()

export function getPublicArticles() {
  return publicArticleRows(loadArticleDirectory())
}

export function getPublicArticle(name) {
  return getPublicArticles().find((article) => article.name === name)
}
