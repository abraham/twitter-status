import { User as UserData } from 'twitter-d';

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
