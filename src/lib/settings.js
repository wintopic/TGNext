import { getEnv } from './env'
import { parseCookies } from './cookies'

function normalizeValue(value) {
  if (typeof value !== 'string')
    return ''
  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : ''
}

function parseList(raw = '') {
  return raw
    .split(/[\n,;]+/g)
    .map((value) => value.trim())
    .filter(Boolean)
}

function uniqueList(values = []) {
  const seen = new Set()
  const result = []
  values.forEach((value) => {
    const key = value.toLowerCase()
    if (!seen.has(key)) {
      seen.add(key)
      result.push(value)
    }
  })
  return result
}

export function getCookieValue(Astro, name) {
  const cookieHeader = Astro.request.headers.get('cookie') || ''
  const cookies = parseCookies(cookieHeader)
  return normalizeValue(cookies[name])
}

export function getEnvValue(Astro, name) {
  return normalizeValue(getEnv(import.meta.env, Astro, name))
}

export function getConfigValue(Astro, envName, cookieName) {
  const envValue = getEnvValue(Astro, envName)
  if (envValue) {
    return { value: envValue, source: 'env' }
  }

  const cookieValue = getCookieValue(Astro, cookieName)
  if (cookieValue) {
    return { value: cookieValue, source: 'cookie' }
  }

  return { value: '', source: 'default' }
}

export function getChannelSetting(Astro) {
  const setting = getConfigValue(Astro, 'CHANNEL', 'bc_channel')
  if (setting.value) {
    return setting
  }

  const channelsSetting = getChannelsSetting(Astro)
  const list = parseList(channelsSetting.value)
  if (list.length > 0) {
    return { value: list[0], source: 'default' }
  }

  return setting
}

export function getFilterKeywordsSetting(Astro) {
  return getConfigValue(Astro, 'FILTER_KEYWORDS', 'bc_filter_keywords')
}

export function getChannelsSetting(Astro) {
  return getConfigValue(Astro, 'CHANNELS', 'bc_channels')
}

export function getChannelOptions(Astro) {
  const channelSetting = getChannelSetting(Astro)
  const channelsSetting = getChannelsSetting(Astro)
  const current = channelSetting.value
  const list = parseList(channelsSetting.value)
  const merged = uniqueList([current, ...list].filter(Boolean))

  return {
    current,
    list: merged,
    source: channelsSetting.source,
  }
}
