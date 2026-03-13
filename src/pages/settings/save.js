import { serializeCookie } from '../../lib/cookies'
import { getEnv } from '../../lib/env'
import { findListValue, parseList, uniqueList } from '../../lib/settings'

export async function POST(context) {
  const { request } = context
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
  const lockedChannel = (getEnv(import.meta.env, context, 'CHANNEL') || '').trim()
  const lockedChannels = uniqueList(parseList((getEnv(import.meta.env, context, 'CHANNELS') || '').trim()))
  const lockedKeywords = (getEnv(import.meta.env, context, 'FILTER_KEYWORDS') || '').trim()

  if (hasChannels && !lockedChannels.length) {
    const list = uniqueList(parseList(channelsRaw))
    const preferredChannel = channelRaw && !lockedChannel ? channelRaw : ''

    if (preferredChannel && !findListValue(list, preferredChannel)) {
      list.unshift(preferredChannel)
    }

    const channels = list.join(',')
    headers.append('Set-Cookie', serializeCookie('bc_channels', channels, {
      maxAge: channels ? maxAge : 0,
      secure: isSecure,
    }))
  }

  if (hasChannel && !lockedChannel) {
    const allowedList = lockedChannels.length > 0 ? lockedChannels : uniqueList(parseList(channelsRaw))
    let channel = channelRaw

    if (allowedList.length > 0) {
      channel = findListValue(allowedList, channelRaw) || allowedList[0]
    }

    headers.append('Set-Cookie', serializeCookie('bc_channel', channel, {
      maxAge: channel ? maxAge : 0,
      secure: isSecure,
    }))
  }

  if (hasKeywords && !lockedKeywords) {
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
