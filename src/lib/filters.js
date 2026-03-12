export function parseKeywords(raw = '') {
  return raw
    .split(/[\n,;]+/g)
    .map(value => value.trim())
    .filter(Boolean)
}

export function normalizeKeywords(raw = '') {
  return parseKeywords(raw).map(value => value.toLowerCase())
}

export function isPostFiltered(post, keywords) {
  if (!post || !keywords.length)
    return false

  const tagText = Array.isArray(post.tags) ? post.tags.join(' ') : ''
  const haystack = `${post.title ?? ''} ${post.text ?? ''} ${tagText}`.toLowerCase()

  return keywords.some(keyword => haystack.includes(keyword))
}
