import { serializeCookie } from '../../lib/cookies'
import { findListValue, getChannelOptions, getChannelSetting } from '../../lib/settings'

function normalizePath(value = '') {
  if (typeof value !== 'string')
    return '/'
  const trimmed = value.trim()
  if (!trimmed.startsWith('/') || trimmed.startsWith('//'))
    return '/'
  return trimmed
}

export async function POST(context) {
  const { request } = context
  const formData = await request.formData()
  const requestedChannel = (formData.get('channel') || '').toString().trim()
  const redirect = normalizePath((formData.get('redirect') || '').toString())
  const { list } = getChannelOptions(context)
  const channelSetting = getChannelSetting(context)
  const channel = list.length > 0 ? findListValue(list, requestedChannel) : requestedChannel

  const url = new URL(request.url)
  const isSecure = url.protocol === 'https:'
  const maxAge = 60 * 60 * 24 * 30

  const headers = new Headers()
  if (channelSetting.source !== 'env' && channel) {
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
