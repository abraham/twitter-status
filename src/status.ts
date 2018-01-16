import { Entities } from './entities';
import { User } from './user';

export class Status {
  private _data: Status;
  private _user: User;

  constructor(status: Status) {
    this._user = new User(status.user);
    this._data = status;
  }

  public get user(): User {
    return this._user;
  }

  public get url(): string {
    return `https://twitter.com/${this._user.screen_name}/status/${this._data.id_str}`;
  }

  public get hasMedia(): boolean {
    return this._data.entities.media && this._data.entities.media.length > 0
  }

  public get mediaUrl(): string {
    return this._data.entities.media[0].media_url_https;
  }

  public get text(): string {
    return this._data.full_text;
  }

  public get entities(): Entities {
    return this._data.entities;
  }

  public get createdAt(): Date {
    return new Date(Date.parse(this._data.created_at));
  }

  public get replyUrl(): string {
    return `https://twitter.com/intent/tweet?in_reply_to=${this._data.id_str}`
  }

  public get retweetUrl(): string {
    return `https://twitter.com/intent/retweet?tweet_id=${this._data.id_str}`
  }

  public get likeUrl(): string {
    return `https://twitter.com/intent/like?tweet_id=${this._data.id_str}`
  }
}

export interface Status {
  contributors: null,
  coordinates: null,
  created_at: string,
  display_text_range: number[],
  entities: Entities,
  favorite_count: number,
  favorited: boolean,
  full_text: string,
  geo: null,
  id_str: string,
  id: number,
  in_reply_to_screen_name: string | null,
  in_reply_to_status_id_str: string | null,
  in_reply_to_status_id: number | null,
  in_reply_to_user_id_str: string | null,
  in_reply_to_user_id: number | null,
  is_quote_status: boolean,
  lang: string,
  place: null,
  possibly_sensitive_appealable: boolean,
  possibly_sensitive: boolean,
  retweet_count: number,
  retweeted: boolean,
  source: string,
  truncated: boolean,
  user: User,
}
