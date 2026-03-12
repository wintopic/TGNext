import { getEnv } from './env'
import { parseCookies } from './cookies'

function normalizeValue(value) {
  if (typeof value !== 'string')
    return ''
  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : ''
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
  return getConfigValue(Astro, 'CHANNEL', 'bc_channel')
}

export function getFilterKeywordsSetting(Astro) {
  return getConfigValue(Astro, 'FILTER_KEYWORDS', 'bc_filter_keywords')
}
