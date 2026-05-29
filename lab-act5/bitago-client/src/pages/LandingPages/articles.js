export const publicArticles = [
  {
    name: 'dashboard-overview',
    title: 'Reading The Daily Picture',
    summary:
      'How leaders can use daily activity, profile, work style, and location signals to understand where the team stands right now.',
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
  },
  {
    name: 'reports-visualization',
    title: 'Turning Trends Into Decisions',
    summary:
      'How trend views help teams move beyond one-day snapshots and understand whether performance signals are improving, slipping, or holding steady.',
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
  },
  {
    name: 'users-table-management',
    title: 'Following Up With The Right Records',
    summary:
      'How a structured user directory helps teams compare people, locations, and status signals when a closer review is needed.',
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
  },
]

export function getPublicArticle(name) {
  return publicArticles.find((article) => article.name === name)
}
