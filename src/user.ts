import { Entities } from './entities';

export class User {
  private _data: UserData;

  constructor(user: UserData) {
    this._data = user;
  }

  public get name(): string {
    return this._data.name;
  }

  public get screen_name(): string {
    return this._data.screen_name;
  }

  public get primaryColor(): string {
    return `#${this._data.profile_link_color}`;
  }

  public get url(): string {
    return `https://twitter.com/${this._data.screen_name}`;
  }

  public get profileImageUrl(): string {
    return this._data.profile_image_url_https;
  }

  public get verified(): boolean {
    return this._data.verified;
  }
}

export interface UserData {
  contributors: number[] | null,
  contributors_enabled: boolean,
  created_at: string,
  default_profile_image: boolean,
  default_profile: boolean,
  description: string,
  entities: Entities,
  favourites_count: number,
  follow_request_sent: boolean,
  followers_count: number,
  following: boolean,
  friends_count: number,
  geo_enabled: boolean,
  has_extended_profile: boolean,
  id_str: string,
  id: number,
  is_translation_enabled: boolean,
  is_translator: boolean,
  lang: string,
  listed_count: number,
  location: string,
  name: string,
  notifications: boolean,
  profile_background_color: string,
  profile_background_image_url_https: string,
  profile_background_image_url: string,
  profile_background_tile: boolean,
  profile_banner_url: string,
  profile_image_url_https: string,
  profile_image_url: string,
  profile_link_color: string,
  profile_sidebar_border_color: string,
  profile_sidebar_fill_color: string,
  profile_text_color: string,
  profile_use_background_image: boolean,
  protected: boolean,
  screen_name: string,
  statuses_count: number
  time_zone: string,
  translator_type: string,
  url: string,
  utc_offset: number,
  verified: boolean,
}
