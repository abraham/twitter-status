import { FullUser, isFullUser, User as UserData } from 'twitter-d';

export class User {
  private data: FullUser;

  constructor(user: UserData) {
    if (!isFullUser(user)) {
      throw new Error('Twitter user must be a full user object');
    }
    this.data = user;
  }

  public get name(): string {
    return this.data.name;
  }

  public get screen_name(): string {
    return this.data.screen_name;
  }

  public get url(): string {
    return `https://twitter.com/${this.data.screen_name}`;
  }

  public get profileImageUrl(): string {
    return this.data.profile_image_url_https;
  }

  public get verified(): boolean {
    return this.data.verified;
  }
}
