import { serializeCookie } from '../../lib/cookies'

export async function POST({ request }) {
  const formData = await request.formData()
  const channel = (formData.get('channel') || '').toString().trim()
  const channels = (formData.get('channels') || '').toString().trim()
  const keywords = (formData.get('keywords') || '').toString().trim()

  const url = new URL(request.url)
  const isSecure = url.protocol === 'https:'
  const maxAge = 60 * 60 * 24 * 30

  const headers = new Headers()
  headers.append('Set-Cookie', serializeCookie('bc_channel', channel, {
    maxAge: channel ? maxAge : 0,
    secure: isSecure,
  }))
  headers.append('Set-Cookie', serializeCookie('bc_channels', channels, {
    maxAge: channels ? maxAge : 0,
    secure: isSecure,
  }))
  headers.append('Set-Cookie', serializeCookie('bc_filter_keywords', keywords, {
    maxAge: keywords ? maxAge : 0,
    secure: isSecure,
  }))
  headers.set('Location', '/settings?saved=1')

  return new Response(null, {
    status: 303,
    headers,
  })
}
