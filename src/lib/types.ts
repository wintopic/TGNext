export interface ChannelReaction {
  count: string
  emoji: string
  emojiId?: string
  emojiImage?: string
  isPaid?: boolean
}

export interface ChannelPost {
  content: string
  datetime: string
  description?: string
  filtered?: boolean
  id: string
  reactions?: ChannelReaction[]
  tags: string[]
  text?: string
  title: string
  type?: string
}

export interface ChannelSeo {
  nofollow?: boolean
  noindex?: boolean
  text?: string
  title?: string
}

export interface ChannelInfo {
  avatar?: string
  description?: string
  descriptionHTML?: string
  posts: ChannelPost[]
  seo?: ChannelSeo
  title?: string
}

export interface LinkItem {
  href: string
  title: string
}
