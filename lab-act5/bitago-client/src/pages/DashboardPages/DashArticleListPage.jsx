import { useEffect, useMemo, useState } from 'react'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import Switch from '@mui/material/Switch'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid'
import {
  blankArticleForm,
  filterArticleRows,
  loadArticleDirectory,
  normalizeArticle,
  saveArticleDirectory,
  validateArticleForm,
} from './articleDashboardUtils'
import { createArticle, getArticles, updateArticle } from '../../api/client'

function articleToForm(article) {
  return {
    title: article.title,
    summary: article.summary,
    body: article.body.join('\n\n'),
    takeaways: article.takeaways.join('\n'),
    isAvailable: article.isAvailable,
  }
}

function DashArticleListPage() {
  const [articles, setArticles] = useState(() => loadArticleDirectory())
  const [query, setQuery] = useState('')
  const [availability, setAvailability] = useState('all')
  const [form, setForm] = useState(blankArticleForm)
  const [errors, setErrors] = useState({})
  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formMessage, setFormMessage] = useState('')
  const [pageMessage, setPageMessage] = useState('')

  const persistArticles = (nextArticles) => {
    const savedArticles = saveArticleDirectory(nextArticles)
    setArticles(savedArticles)
  }

  useEffect(() => {
    let isMounted = true

    async function loadMongoArticles() {
      try {
        const mongoArticles = await getArticles()

        if (!isMounted) return

        if (mongoArticles.length > 0) {
          persistArticles(mongoArticles)
          return
        }

        const migratedArticles = await Promise.all(
          articles.map((article) => createArticle(article)),
        )

        if (isMounted) {
          persistArticles(migratedArticles)
        }
      } catch (error) {
        if (isMounted) {
          setPageMessage(
            error.message || 'Unable to load articles from MongoDB.',
          )
        }
      }
    }

    loadMongoArticles()

    return () => {
      isMounted = false
    }
    // Run once to hydrate local seed data into MongoDB when the collection is empty.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const rows = useMemo(
    () => filterArticleRows(articles, { query, availability }),
    [articles, availability, query],
  )

  const handleFieldChange = (field) => (event) => {
    const value =
      field === 'isAvailable' ? event.target.checked : event.target.value

    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => {
      const next = { ...current }
      delete next[field]
      return next
    })
  }

  const openAddDialog = () => {
    setForm(blankArticleForm)
    setErrors({})
    setEditingId(null)
    setFormMessage('')
    setOpen(true)
  }

  const openEditDialog = (article) => {
    setForm(articleToForm(article))
    setErrors({})
    setEditingId(article.mongoId || article.id)
    setFormMessage('')
    setOpen(true)
  }

  const closeDialog = () => {
    setOpen(false)
    setErrors({})
    setFormMessage('')
  }

  const saveArticle = async () => {
    const nextErrors = validateArticleForm(form)

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      return
    }

    try {
      if (editingId) {
        const savedArticle = await updateArticle(editingId, form)
        persistArticles(
          articles.map((article) =>
          (article.mongoId || article.id) === editingId
            ? normalizeArticle(savedArticle)
            : article,
          ),
        )
      } else {
        const savedArticle = await createArticle(form)
        persistArticles([...articles, normalizeArticle(savedArticle)])
      }

      closeDialog()
    } catch (error) {
      setFormMessage(error.message || 'Unable to save the article.')
    }
  }

  const toggleAvailability = async (id) => {
    const article = articles.find((item) => item.id === id)

    if (!article) return

    try {
      const savedArticle = await updateArticle(article.mongoId || article.id, {
        ...article,
        isAvailable: !article.isAvailable,
      })

      persistArticles(
        articles.map((item) =>
          item.id === id ? normalizeArticle(savedArticle) : item,
        ),
      )
    } catch (error) {
      setFormMessage(error.message || 'Unable to update the article.')
    }
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Title', minWidth: 220, flex: 1 },
    { field: 'summary', headerName: 'Summary', minWidth: 320, flex: 1.3 },
    {
      field: 'isAvailable',
      headerName: 'Status',
      width: 130,
      renderCell: (params) => (
        <Chip
          label={params.value ? 'Available' : 'Unavailable'}
          color={params.value ? 'success' : 'default'}
          size="small"
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      filterable: false,
      minWidth: 190,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button size="small" variant="outlined" onClick={() => openEditDialog(params.row)}>
            Edit
          </Button>
          <Button
            size="small"
            variant="contained"
            color={params.row.isAvailable ? 'warning' : 'success'}
            onClick={() => toggleAvailability(params.row.id)}
          >
            {params.row.isAvailable ? 'Unpublish' : 'Publish'}
          </Button>
        </Stack>
      ),
    },
  ]

  return (
    <Stack spacing={3}>
      {pageMessage ? <Alert severity="warning">{pageMessage}</Alert> : null}

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        spacing={2}
      >
        <Stack spacing={0.5}>
          <Typography variant="h4">Articles</Typography>
          <Typography color="text.secondary">
            Manage the guides that appear on the public article list.
            Unavailable articles remain saved for review.
          </Typography>
        </Stack>
        <Button variant="contained" onClick={openAddDialog}>
          Add Article
        </Button>
      </Stack>

      <Card sx={{ borderRadius: 4 }}>
        <CardContent>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 2 }}>
            <TextField
              label="Search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Title, summary, or slug"
              sx={{ flex: 1 }}
            />
            <FormControl sx={{ minWidth: 190 }}>
              <InputLabel id="availability-filter-label">Availability</InputLabel>
              <Select
                labelId="availability-filter-label"
                label="Availability"
                value={availability}
                onChange={(event) => setAvailability(event.target.value)}
              >
                <MenuItem value="all">All articles</MenuItem>
                <MenuItem value="available">Available</MenuItem>
                <MenuItem value="unavailable">Unavailable</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          <Box sx={{ height: 520, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              disableRowSelectionOnClick
              pageSizeOptions={[5, 10]}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
            />
          </Box>
          {rows.length === 0 ? (
            <Alert severity="info" sx={{ mt: 2 }}>
              No articles match the current search or availability filter.
            </Alert>
          ) : null}
        </CardContent>
      </Card>

      <Dialog open={open} onClose={closeDialog} fullWidth maxWidth="md">
        <DialogTitle>{editingId ? 'Edit Article' : 'Add Article'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ pt: 1 }}>
            {formMessage ? <Alert severity="warning">{formMessage}</Alert> : null}
            <TextField
              label="Title"
              value={form.title}
              onChange={handleFieldChange('title')}
              error={Boolean(errors.title)}
              helperText={errors.title || ' '}
              fullWidth
            />
            <TextField
              label="Summary"
              value={form.summary}
              onChange={handleFieldChange('summary')}
              error={Boolean(errors.summary)}
              helperText={errors.summary || 'Shown on the public article list.'}
              fullWidth
            />
            <TextField
              label="Body"
              value={form.body}
              onChange={handleFieldChange('body')}
              error={Boolean(errors.body)}
              helperText={errors.body || 'Use a blank line between paragraphs.'}
              multiline
              minRows={5}
              fullWidth
            />
            <TextField
              label="Takeaways"
              value={form.takeaways}
              onChange={handleFieldChange('takeaways')}
              error={Boolean(errors.takeaways)}
              helperText={errors.takeaways || 'Enter one takeaway per line.'}
              multiline
              minRows={3}
              fullWidth
            />
            <FormControlLabel
              control={
                <Switch
                  checked={form.isAvailable}
                  onChange={handleFieldChange('isAvailable')}
                />
              }
              label={
                form.isAvailable
                  ? 'Article is available on the public list'
                  : 'Article is saved as unavailable'
              }
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button variant="contained" onClick={saveArticle}>
            {editingId ? 'Save Article' : 'Add Article'}
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  )
}

export default DashArticleListPage
