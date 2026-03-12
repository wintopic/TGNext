import { serializeCookie } from '../../lib/cookies'

function normalizePath(value = '') {
  if (typeof value !== 'string')
    return '/'
  const trimmed = value.trim()
  return trimmed.startsWith('/') ? trimmed : '/'
}

export async function POST({ request }) {
  const formData = await request.formData()
  const channel = (formData.get('channel') || '').toString().trim()
  const redirect = normalizePath((formData.get('redirect') || '').toString())

  const url = new URL(request.url)
  const isSecure = url.protocol === 'https:'
  const maxAge = 60 * 60 * 24 * 30

  const headers = new Headers()
  if (channel) {
    headers.append('Set-Cookie', serializeCookie('bc_channel', channel, {
      maxAge,
      secure: isSecure,
    }))
  }
  headers.set('Location', redirect || '/')

  return new Response(null, {
    status: 303,
    headers,
  })
}
