import { serializeCookie } from '../../lib/cookies'

export async function POST({ request }) {
  const formData = await request.formData()
  const hasChannel = formData.has('channel')
  const hasChannels = formData.has('channels')
  const hasKeywords = formData.has('keywords')

  const channelRaw = hasChannel ? (formData.get('channel') || '').toString().trim() : ''
  const channelsRaw = hasChannels ? (formData.get('channels') || '').toString().trim() : ''
  const keywords = hasKeywords ? (formData.get('keywords') || '').toString().trim() : ''

  const url = new URL(request.url)
  const isSecure = url.protocol === 'https:'
  const maxAge = 60 * 60 * 24 * 30

  const headers = new Headers()

  if (hasChannel || hasChannels) {
    const list = channelsRaw
      .split(/[\n,;]+/g)
      .map((value) => value.trim())
      .filter(Boolean)

    let channel = channelRaw
    if (!channel && list.length > 0) {
      channel = list[0]
    }
    if (channel && !list.some((item) => item.toLowerCase() === channel.toLowerCase())) {
      list.unshift(channel)
    }

    const channels = list.join(',')

    headers.append('Set-Cookie', serializeCookie('bc_channel', channel, {
      maxAge: channel ? maxAge : 0,
      secure: isSecure,
    }))
    headers.append('Set-Cookie', serializeCookie('bc_channels', channels, {
      maxAge: channels ? maxAge : 0,
      secure: isSecure,
    }))
  }

  if (hasKeywords) {
    headers.append('Set-Cookie', serializeCookie('bc_filter_keywords', keywords, {
      maxAge: keywords ? maxAge : 0,
      secure: isSecure,
    }))
  }
  headers.set('Location', '/settings?saved=1')

  return new Response(null, {
    status: 303,
    headers,
  })
}
