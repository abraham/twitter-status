import { Entities } from './entities';
import { User, UserData } from './user';

const MINUTE_SECONDS = 60;
const HOUR_SECONDS = 3600;
const DAY_SECONDS = 86400;
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export class Status {
  public retweet?: Status;
  private _data: StatusData;
  private _user: User;

  constructor(parent: StatusData) {
    let status = { ...parent };
    if (status.retweeted_status) {
      let retweet = status;
      status = { ...status.retweeted_status };
      delete retweet.retweeted_status;
      this.retweet = new Status(retweet);
    }
    this._user = new User(status.user);
    this._data = status;
  }

  public get id_str(): string {
    return this._data.id_str;
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

  public get relativeCreatedAt(): string {
    return this.relativeDate(this.createdAt);
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

  private relativeDate(date: Date): string {
    const now = new Date();
    const delta = (now.getTime() - date.getTime()) / 1000;

    if (delta <= 604800) {
      return this.shortForm(delta);
    } else {
      const day = date.getDate();
      const month = MONTHS[date.getMonth()];
      const year = date.getFullYear() == now.getFullYear() ? '' :  ` ${date.getFullYear()}`;
      return `${day} ${month}${year}`;
    }
  }

  private shortForm(delta: number): string {
    if (delta < MINUTE_SECONDS) {
      return `${Math.round(delta)}s`;
    }
    if (delta < HOUR_SECONDS) {
      return `${Math.round(delta / MINUTE_SECONDS)}m`;
    }
    if (delta < DAY_SECONDS) {
      return `${Math.round(delta / HOUR_SECONDS)}h`;
    }
    return `${Math.round(delta / DAY_SECONDS)}d`;
  }
}

export interface StatusData {
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
  user: UserData,
  retweeted_status?: StatusData;
}
