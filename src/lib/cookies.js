export function parseCookies(header = '') {
  if (!header)
    return {}

  return header.split(';').reduce((cookies, part) => {
    const [name, ...rest] = part.trim().split('=')
    if (!name)
      return cookies

    cookies[name] = decodeURIComponent(rest.join('=') || '')
    return cookies
  }, {})
}

export function serializeCookie(name, value, options = {}) {
  const {
    maxAge,
    path = '/',
    sameSite = 'Lax',
    secure = false,
    httpOnly = true,
  } = options

  let cookie = `${name}=${encodeURIComponent(value ?? '')}`

  if (maxAge !== undefined)
    cookie += `; Max-Age=${maxAge}`

  if (path)
    cookie += `; Path=${path}`

  if (sameSite)
    cookie += `; SameSite=${sameSite}`

  if (secure)
    cookie += '; Secure'

  if (httpOnly)
    cookie += '; HttpOnly'

  return cookie
}
