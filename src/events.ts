export const EVENT_NAME = 'timestamp';

export class Events {
  public target = document.createElement('div');
  private event = new Event(EVENT_NAME);
  private FIFTEEN_SECONDS = 15 * 1000;

  constructor() {
    this.dispatch = this.dispatch.bind(this);
    this.start();
  }

  private start() {
    setInterval(this.dispatch, this.FIFTEEN_SECONDS);
  }

  private dispatch() {
    this.target.dispatchEvent(this.event);
  }
}
