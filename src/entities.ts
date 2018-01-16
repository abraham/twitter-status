export interface Entities {
  description: {
    urls: Url[]
  },
  hashtags: Hashtag[],
  media: Media[],
  symbols: Symbol[],
  urls: Url[],
  user_mentions: Mention[],
}

export interface Hashtag {
  indices: number[],
  text: string,
}

export interface Media {
  display_url: string,
  expanded_url: string,
  id_str: string,
  id: number,
  indices: number[],
  media_url_https: string,
  media_url: string,
  sizes: {
    thumb: {
      w: number,
      h: number,
      resize: string,
    },
    medium: {
      w: number,
      h: number,
      resize: string,
    },
    small: {
      w: number,
      h: number,
      resize: string,
    },
    large: {
      w: number,
      h: number,
      resize: string,
    }
  },
  type: string,
  url: string,
}

export interface Mention {
  id_str: string,
  id: number,
  indices: number[],
  name: string,
  screen_name: string,
}

export interface Symbol {}

export interface Url {
  display_url: string,
  expanded_url: string,
  indices: number[]
  url: string,
}
