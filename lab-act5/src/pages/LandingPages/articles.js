export const publicArticles = [
  {
    name: 'dashboard-overview',
    title: 'Executive Dashboard Design',
    summary:
      'How the dashboard brings together high-level metrics, visual reporting, record-level detail, and location context in a single decision surface.',
    body: [
      'The dashboard serves as the primary operating surface for the platform. It combines top-line metrics, chart-driven reporting, tabular records, and geographic context so users can move from signal to detail without leaving the page.',
      'The opening summary row is designed for rapid orientation. It answers immediate questions around volume, average profile characteristics, and flexible or remote activity, giving teams a stable baseline before they inspect deeper trends.',
      'Visual modules add interpretation without overwhelming the layout. Comparative charts surface movement and distribution, while the map anchors the data in a real-world location, helping the overall experience feel grounded and actionable.',
    ],
    takeaways: [
      'Lead with metrics that establish context quickly.',
      'Use charts to explain movement, not to repeat raw tables.',
      'Keep location and record detail close when they support the same decision flow.',
    ],
  },
  {
    name: 'reports-visualization',
    title: 'Reporting Experience Strategy',
    summary:
      'Why the reporting route separates trend analysis from the main dashboard and gives comparative views room to breathe.',
    body: [
      'The reports area is built for deeper analysis. While the main dashboard focuses on rapid orientation, the reporting route gives trend lines, comparisons, and performance summaries enough space to support interpretation instead of just display.',
      'That separation improves both readability and pacing. Comparative visuals can become noisy when they compete with every other module on the page, so moving them into a dedicated route keeps the main dashboard lighter and the reporting experience more deliberate.',
      'From a product perspective, it also improves maintenance. Teams can evolve reporting views independently without disrupting the operational screen that users rely on for day-to-day monitoring.',
    ],
    takeaways: [
      'Keep primary dashboards focused on orientation.',
      'Use secondary routes for analysis and narrative.',
      'Let reporting evolve without destabilizing the main workspace.',
    ],
  },
  {
    name: 'users-table-management',
    title: 'User Directory Experience',
    summary:
      'Why the directory experience is centered on a structured data grid and how that supports faster review across people, teams, and status signals.',
    body: [
      'The users route is intentionally directory-first. A data grid is the most effective pattern when the core task is comparing records across several fields such as identity, team, location, age, and current status.',
      'This route complements the summary dashboard by exposing a fuller reference view. Rather than compressing every detail into charts, it treats the grid as the source of truth for structured record review and supports it with lightweight status summaries.',
      'A production-ready directory should prioritize legibility, stable columns, and status cues that help someone act quickly without reading every row in sequence.',
    ],
    takeaways: [
      'Use a grid when cross-record comparison is the primary task.',
      'Add concise rollups above dense datasets.',
      'Keep labels and status language consistent across the product.',
    ],
  },
]

export function getPublicArticle(name) {
  return publicArticles.find((article) => article.name === name)
}
