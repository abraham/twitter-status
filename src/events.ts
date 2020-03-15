export const EVENT_NAME = 'timestamp';
const FIFTEEN_SECONDS = 15 * 1000;

export class Events {
  public static target = document.createElement('div');

  private static event = new Event(EVENT_NAME);
  private static started = false;

  public static start() {
    if (!Events.started) {
      setInterval(Events.dispatch, FIFTEEN_SECONDS);
      Events.started = true;
    }
  }

  private static dispatch() {
    Events.target.dispatchEvent(Events.event);
  }
}
