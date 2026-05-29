export function createReportPrintMarkup({ stylesMarkup, reportContent, preparedAt }) {
  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Reports Summary</title>
        ${stylesMarkup}
        <style>
          @page {
            size: A4;
            margin: 16mm;
          }

          * {
            box-sizing: border-box;
          }

          body {
            margin: 0;
            font-family: Arial, Helvetica, sans-serif;
            background: #fff;
            color: #1f2937;
          }

          .report-shell {
            padding: 28px;
          }

          .report-print-header {
            margin-bottom: 24px;
            padding-bottom: 14px;
            border-bottom: 1px solid #d5d5d5;
          }

          .report-print-header h1 {
            margin: 0 0 6px;
            font-size: 26px;
            font-weight: 800;
          }

          .report-print-header p {
            margin: 0;
            font-size: 14px;
            color: #64748b;
            line-height: 1.5;
          }

          .report-content .MuiCard-root {
            box-shadow: none !important;
            border: 1px solid #d5d5d5;
            break-inside: avoid;
            page-break-inside: avoid;
          }

          .report-content .MuiCardContent-root {
            padding: 20px;
          }

          .report-content svg {
            max-width: 100%;
          }
        </style>
      </head>
      <body>
        <main class="report-shell">
          <header class="report-print-header">
            <h1>Reports Summary</h1>
            <p>Analytics overview for generated reports, category breakdown, and completion performance.</p>
            <p>Prepared on ${preparedAt}</p>
          </header>
          <section class="report-content">
            ${reportContent}
          </section>
        </main>
      </body>
    </html>
  `
}
