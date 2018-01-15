import 'mocha';
import { expect } from 'chai';

describe('<twitter-status>', () => {
  let component;

  describe('without properties', () => {
    beforeEach(() => {
      component = fixture('<twitter-status></twitter-status>');
    });

    it('renders default', () => {
      expect(component.$('.content').innerText).to.include('Welcome to <twitter-status>');
    });
  });

  
  describe('status', () => {
    beforeEach(() => {
      component = fixture('<twitter-status></twitter-status>');      /** Set typical complex property. */
      // component.status = Status
    });

    it('is rendered', () => {
      // expect(component.$('.content').innerText).to.include('status: ');
    });
  });


  describe('slot', () => {
    beforeEach(() => {
      component = fixture('<twitter-status>slot content</twitter-status>');
    });

    it('is rendered', () => {
      // Firefox has different output so testing for inclusion instead of exact match.
      expect(component.$('slot').assignedNodes()[0].wholeText).to.include('slot content');
      // TODO: Switch to simpler test when Firefox is no longer polyfilled.
      // expect(component.innerText).equal('slot content');
    });
  });

  describe('--twitter-status-background-color', () => {
    describe('with default', () => {
      beforeEach(() => {
        component = fixture('<twitter-status></twitter-status>');
      });

      it('is set', () => {
        expect(getComputedStyle(component.$('.content')).backgroundColor).equal('rgb(250, 250, 250)');
      });
    });

    describe('with outside value', () => {
      beforeEach(() => {
        component = fixture(`
          <div>
            <style>
              twitter-status.blue {
                --twitter-status-background-color: #03A9F4;
              }
            </style>
            <twitter-status class="blue"></twitter-status>
          </div>
        `).querySelector('twitter-status');
      });

      it('is set', () => {
        expect(getComputedStyle(component.$('.content')).backgroundColor).equal('rgb(3, 169, 244)');
      });
    });
  });
});

function fixture(tag: string): HTMLElement {
  function fixtureContainer(): HTMLElement {
    let div = document.createElement('div');
    div.classList.add('fixture');
    return div;
  }
  let fixture = document.body.querySelector('.fixture') || document.body.appendChild(fixtureContainer());
  fixture.innerHTML = tag;
  return fixture.children[0] as HTMLElement;
}
