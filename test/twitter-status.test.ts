import 'mocha';
import { expect } from 'chai';

describe('<twitter-status>', () => {
  let component;

  describe('without properties', () => {
    beforeEach(() => {
      component = fixture('<twitter-status></twitter-status>');
    });

    it('renders default', () => {
      expect(component.$('#content').innerText).to.include('Loading...');
    });
  });

  describe('simple status', () => {
    beforeEach(async () => {
      component = fixture('<twitter-status></twitter-status>');
      let res = await fetch('./base/test/simple.json');
      component.status = await res.json();
    });

    it('renders name', () => {
      expect(component.$('#header').innerText.trim()).to.eq('jack \n@jack');
    });

    it('renders verified badge', () => {
      expect(component.$('#header svg.verified').getAttribute('class')).to.include('verified'); // Firefox ShadowDOM pollyfil adds additional classes
    });

    it('renders text', () => {
      expect(component.$('#text').innerText.trim()).to.eq('just setting up my twttr');
    });

    it('renders date', () => {
      expect(component.$('#link').innerText).to.eq('21 Mar 2006');
    });

    it('renders profile image', () => {
      expect(component.$('#profile-image img').getAttribute('src')).to.include('https://pbs.twimg.com/profile_images/839863609345794048/mkpdB9Tf_normal.jpg');
    });

    it('has action links', () => {
      expect(component.$$('#actions a')[0].getAttribute('href')).to.include('https://twitter.com/intent/tweet?in_reply_to=20');
      expect(component.$$('#actions a')[1].getAttribute('href')).to.include('https://twitter.com/intent/retweet?tweet_id=20');
      expect(component.$$('#actions a')[2].getAttribute('href')).to.include('https://twitter.com/intent/like?tweet_id=20');
    });

    it('links to tweet', () => {
      expect(component.$('#logo a').getAttribute('href')).to.include('https://twitter.com/jack/status/20');
    });
  });

  describe('complex status', () => {
    beforeEach(async () => {
      component = fixture('<twitter-status></twitter-status>');
      let res = await fetch('./base/test/complex.json');
      component.status = await res.json();
    });

    it('autoLinks username', () => {
      expect(component.$$('#text a')[0].innerText).to.eq('travisci');
      expect(component.$$('#text a')[0].getAttribute('href')).to.eq('https://twitter.com/travisci');
      expect(component.$$('#text a')[0].getAttribute('class')).to.include('tweet-url username'); // Firefox ShadowDOM pollyfil adds additional classes
    });

    it('autoLinks list', () => {
      expect(component.$$('#text a')[1].innerText).to.eq('nutmeg/cli');
      expect(component.$$('#text a')[1].getAttribute('href')).to.eq('https://twitter.com/nutmeg/cli');
      expect(component.$$('#text a')[1].getAttribute('class')).to.include('tweet-url list-slug'); // Firefox ShadowDOM pollyfil adds additional classes
    });

    it('autoLinks url', () => {
      expect(component.$$('#text a')[2].innerText.replace(/\s/g,'')).to.eq('https://nutmeg.tools');
      expect(component.$$('#text a')[2].getAttribute('href')).to.eq('https://t.co/jWglafR6nl');
    });
  });

  describe('image status', () => {
    beforeEach(async () => {
      component = fixture('<twitter-status></twitter-status>');
      let res = await fetch('./base/test/image.json');
      component.status = await res.json();
    });

    it('renders an image', () => {
      expect(component.$('#media img').getAttribute('src')).to.eq('https://pbs.twimg.com/media/Bm54nBCCYAACwBi.jpg');
    });

    it('autoLinks hashtag', () => {
      expect(component.$$('#text a')[1].getAttribute('href')).to.eq('https://twitter.com/search?q=%23nature');
      expect(component.$$('#text a')[1].getAttribute('class')).to.include('tweet-url hashtag'); // Firefox ShadowDOM pollyfil adds additional classes
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
