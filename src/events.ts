export class Events {
  public target = new EventTarget();
  private timestampEvent = new CustomEvent('timestamp');
  private FIFTEEN_SECONDS = 15 * 1000;

  constructor() {
    this.dispatch = this.dispatch.bind(this);
    this.start();
  }

  private start() {
    setInterval(this.dispatch, this.FIFTEEN_SECONDS);
  }

  private dispatch() {
    this.target.dispatchEvent(this.timestampEvent);
  }
}
