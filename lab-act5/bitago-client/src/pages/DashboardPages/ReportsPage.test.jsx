import { describe, expect, it } from 'vitest'
import { createReportPrintMarkup } from './reportsPrint'

describe('createReportPrintMarkup', () => {
  it('creates printable report markup with copied styles and report content', () => {
    const markup = createReportPrintMarkup({
      stylesMarkup: '<style>.report-content{color:#111}</style>',
      reportContent: '<section class="report-content"><h1>Reports Summary</h1></section>',
      preparedAt: 'January 1, 2026',
    })

    expect(markup).toContain('<title>Reports Summary</title>')
    expect(markup).toContain('Prepared on January 1, 2026')
    expect(markup).toContain('<h1>Reports Summary</h1>')
    expect(markup).toContain('.report-content .MuiCard-root')
  })
})
