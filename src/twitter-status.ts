import { html, property, Seed, svg, TemplateResult } from '@nutmeg/seed';
import Autolinker, { AutolinkerConfig } from 'autolinker';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import { Events, EVENT_NAME } from './events';
import { Status } from './status';
import { User } from './user';

export class TwitterStatus extends Seed {
  @property({ type: Object }) public status!: import('twitter-d').Status;
  @property({ type: Boolean }) public updateTimestamp = false;

  private eventTarget = Events.target;

  constructor() {
    super();
  }

  private get _user(): User {
    return this._status && this._status.user;
  }

  private get _status(): Status {
    return this.status && new Status(this.status);
  }

  private get _retweet(): Status | undefined {
    return this._status.retweet;
  }

  /** The component instance has been inserted into the DOM. */
  public connectedCallback() {
    super.connectedCallback();
    if (this.updateTimestamp) {
      this.eventTarget.addEventListener(EVENT_NAME, () => this.render());
      Events.start();
    }
  }

  /** The component instance has been removed from the DOM. */
  public disconnectedCallback() {
    super.disconnectedCallback()
  }

  /** Watch for changes to these attributes. */
  public static get observedAttributes(): string[] {
    return super.observedAttributes;
  }

  /** Rerender when the observed attributes change. */
  public attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    super.attributeChangedCallback(name, oldValue, newValue)
  }

  /** Styling for the component. */
  public get styles(): TemplateResult {
    return html`
      <style>
        :host {
          --twitter-status-link-color: #1c94e0;
          border: 1px solid var(--twitter-status-link-color);
          border-radius: 8px;
          overflow: hidden;
        }

        * {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
        }

        #container {
          background-color: #fff;
        }

        #retweet {
          font-size: 0.75em;
          padding: 0 0 8px 44px;
          color: #657786;
        }

        #retweet a {
          color: #657786;
        }

        #retweet svg {
          width: 14px;
          height: 14px;
          vertical-align: middle;
          margin-bottom: 2px;
        }

        #content {
          padding: 24px 24px 20px 24px;
        }

        #profile-image {
          padding-right: 16px;
        }

        #profile-image img {
          border-radius: 50%;
          width: 48px;
          height: 48px;
        }

        #names {
          overflow: hidden;
        }

        #name {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          padding-right: 4px;
          font-size: 18px;
          font-weight: bold;
          line-height: 24px;
        }

        #media img, #media video {
          width: 100%;
          max-height: 400px;
          object-fit: cover;
          object-position: center;
        }

        #header {
          display: flex;
          justify-content: space-between;
        }

        #header-content {
          display: flex;
          overflow: hidden;
        }

        #text {
          white-space: pre-line;
          margin-top: -16px;
          margin-bottom: 24px;
          font-size: 1.5em;
          line-height: 32px;
          letter-spacing: .01em;
          overflow-wrap: break-word;
        }

        #text.short {
          font-size: 2em;
        }

        #footer {
          display: flex;
          justify-content: space-between;
        }

        #footer #link {
          display: block;
          line-height: 24px;
        }

        #names {
          display: inline-flex;
          flex-direction: column;
        }

        #actions a {
          padding-right: 16px;
        }

        .icon {
          width: 20px;
          height: 20px;
        }

        a {
          color: var(--twitter-status-link-color);
          text-decoration: none;
          outline: 0;
        }

        a:visited {
          color: var(--twitter-status-link-color);
          text-decoration: none;
          outline: 0;
        }

        #actions svg {
          width: 20px;
          height: 20px;
        }

        #names svg {
          width: 18px;
          height: 18px;
        }

        #logo svg {
          width: 30px;
          height: 30px;
        }
      </style>
    `;
  }

  /** HTML Template for the component. */
  public get template(): TemplateResult {
    return html`
      <div id="container">
        ${this._status ? this.statusTemplate : this.loadingTemplate}
      </div>
    `;
  }

  private get timestamp(): string {
    return this._status.relativeCreatedAt;
  }

  private get verifiedBadge() {
    return this._user.verified ? this.verifiedIcon : '';
  }

  private get autoLinkOptions(): AutolinkerConfig {
    // TODO: Implement display text for t.co URLs.
    return {};
  }

  private get linkedText() {
    return unsafeHTML(Autolinker.link(this._status.text, this.autoLinkOptions));
  }

  private get textClass(): string {
    return this._status.text.length < 100 ? 'short' : '';
  }

  private get logoTemplate(): TemplateResult {
    return svg`<svg id="Logo_FIXED" data-name="Logo — FIXED" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><defs><style>.cls-1{fill:none;}.cls-2{fill:#1da1f2;}</style></defs><title>Twitter_Logo_Blue</title><rect class="cls-1" width="400" height="400"/><path class="cls-2" d="M153.62,301.59c94.34,0,145.94-78.16,145.94-145.94,0-2.22,0-4.43-.15-6.63A104.36,104.36,0,0,0,325,122.47a102.38,102.38,0,0,1-29.46,8.07,51.47,51.47,0,0,0,22.55-28.37,102.79,102.79,0,0,1-32.57,12.45,51.34,51.34,0,0,0-87.41,46.78A145.62,145.62,0,0,1,92.4,107.81a51.33,51.33,0,0,0,15.88,68.47A50.91,50.91,0,0,1,85,169.86c0,.21,0,.43,0,.65a51.31,51.31,0,0,0,41.15,50.28,51.21,51.21,0,0,1-23.16.88,51.35,51.35,0,0,0,47.92,35.62,102.92,102.92,0,0,1-63.7,22A104.41,104.41,0,0,1,75,278.55a145.21,145.21,0,0,0,78.62,23"/></svg>`;
  }

  private get replyIcon(): TemplateResult {
    return svg`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path class="icon" fill="#657786" d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.045.286.12.403.143.225.385.347.633.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.368-3.43-7.788-7.8-7.79zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.334-.75-.75-.75h-.395c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"/></svg>`;
  }

  private get retweetIcon(): TemplateResult {
    return svg`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#657786" d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z"/></svg>`;
  }

  private get likeIcon(): TemplateResult {
    return svg`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#657786" d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.813-1.148 2.353-2.73 4.644-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.375-7.454 13.11-10.037 13.156H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.035 11.596 8.55 11.658 1.52-.062 8.55-5.917 8.55-11.658 0-2.267-1.822-4.255-3.902-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.015-.03-1.426-2.965-3.955-2.965z"/></svg>`;
  }

  private get verifiedIcon(): TemplateResult {
    return svg`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 72" class="verified"><path fill="none" d="M0 0h64v72H0z"/><path fill="#1da1f2" d="M3 37.315c0 4.125 2.162 7.726 5.363 9.624-.056.467-.09.937-.09 1.42 0 6.103 4.72 11.045 10.546 11.045 1.295 0 2.542-.234 3.687-.686C24.22 62.4 27.827 64.93 32 64.93c4.174 0 7.782-2.53 9.49-6.213 1.148.45 2.39.685 3.69.685 5.826 0 10.546-4.94 10.546-11.045 0-.483-.037-.953-.093-1.42C58.83 45.04 61 41.44 61 37.314c0-4.37-2.42-8.15-5.933-9.946.427-1.203.658-2.5.658-3.865 0-6.104-4.72-11.045-10.545-11.045-1.302 0-2.543.232-3.69.688-1.707-3.685-5.315-6.216-9.49-6.216-4.173 0-7.778 2.53-9.492 6.216-1.146-.455-2.393-.688-3.688-.688-5.827 0-10.545 4.94-10.545 11.045 0 1.364.23 2.662.656 3.864C5.42 29.163 3 32.944 3 37.314z"/><path fill="#FFF" d="M17.87 39.08l7.015 6.978c.585.582 1.35.873 2.116.873.77 0 1.542-.294 2.127-.883.344-.346 15.98-15.974 15.98-15.974 1.172-1.172 1.172-3.07 0-4.243-1.17-1.17-3.07-1.172-4.242 0l-13.87 13.863-4.892-4.868c-1.174-1.168-3.074-1.164-4.242.01-1.168 1.176-1.163 3.075.01 4.244z"/></svg>`;
  }

  private get mediaTemplate(): TemplateResult {
    if (this._status.mediaType === 'photo') {
      return html`
        <div id="media">
          <img src="${this._status.mediaUrl}" alt="media embeded in tweet" />
        </div>
      `;
    } else if (this._status.mediaType === 'animated_gif') {
      return html`
        <div id="media">
          <video autoplay repeat
            muted
            loop
            poster="${this._status.fallbackMediaUrl}"
            src="${this._status.mediaUrl}">
            <img src="${this._status.fallbackMediaUrl}" alt="media embeded in tweet" />
          </video>
        </div>
      `;
    } else {
      return html``;
    }
  }

  private get headerTemplate(): TemplateResult {
    return html`
      <div id="header">
        <a id="header-content" href="${this._user.url}" target="_blank" rel="noopener">
          <span id="profile-image"><img src="${this._user.profileImageUrl}" alt="${this._user.screen_name}'s avatar'"/></span>
          <span id="names">
            <span id="name">${this._user.name} ${this.verifiedBadge}</span>
            <span>@${this._user.screen_name}</span>
          </span>
        </a>
        <div id="logo"><a href="${this._status.url}" target="_blank" rel="noopener">${this.logoTemplate}</a></div>
      </div>
    `;
  }

  private get retweetTemplate(): TemplateResult {
    if (!this._retweet) { return html``; }
    return html`
      <div id="retweet">
        ${this.retweetIcon}
        <a href="${this._retweet.user.url}" target="_blank" rel="noopener">
          ${this._retweet.user.name}
        </a> Retweeted
      </div>
    `;
  }

  private get textTemplate(): TemplateResult {
    return html`
      <div id="text" class="${this.textClass}">
        ${this.linkedText}
      </div>
    `;
  }

  private get footerTemplate(): TemplateResult {
    return html`
      <div id="footer">
        <div id="actions">
          <a href="${this._status.replyUrl}" target="_blank" rel="noopener" title="reply">${this.replyIcon}</a>
          <a href="${this._status.retweetUrl}" target="_blank" rel="noopener" title="retweet">${this.retweetIcon}</a>
          <a href="${this._status.likeUrl}" target="_blank" rel="noopener" title="like">${this.likeIcon}</a>
        </div>
        <div id="link">
          <a href="${this._status.url}" target="_blank" rel="noopener">${this.timestamp}</a>
        </div>
      </div>
    `;
  }

  private get statusTemplate(): TemplateResult {
    return html`
      ${this.mediaTemplate}
      <div id="content">
        ${this.retweetTemplate}
        ${this.headerTemplate}
        ${this.textTemplate}
        ${this.footerTemplate}
      </div>
    `;
  }

  private get loadingTemplate(): TemplateResult {
    return html`
      <div id="content">
        <p>Loading...</p>
      </div>
    `;
  }
}

window.customElements.define('twitter-status', TwitterStatus);
