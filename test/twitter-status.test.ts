import { expect } from 'chai';
import 'mocha';
import * as moment from 'moment';
import { TwitterStatus } from '../src/twitter-status';

describe('<twitter-status>', () => {
  let component: TwitterStatus;

  describe('without properties', () => {
    beforeEach(() => {
      component = fixture('<twitter-status></twitter-status>');
    });

    it('renders default', () => {
      expect(component.$('#content').innerText).to.include('Loading...');
    });

    it('does not update timestamps', () => {
      expect(component.updateTimestamp).to.eq(false);
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

    it('renders text as short', () => {
      expect(component.$('#text.short')).to.exist;
    });

    it('renders date', () => {
      expect(component.$('#link').innerText).to.eq('21 Mar 2006');
    });

    it('renders links with Twitter color', () => {
      expect(getComputedStyle(component.$('#link a')).color).to.eq('rgb(28, 148, 224)');
    });

    it('renders border with Twitter color', () => {
      expect(getComputedStyle(component).borderColor).to.eq('rgb(28, 148, 224)');
    });

    it('renders profile image', () => {
      expect(component.$('#profile-image img').getAttribute('src')).to.include('https://pbs.twimg.com/profile_images/1115644092329758721/AFjOr-K8_normal.jpg');
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

  describe.skip('complex status', () => {
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

    it('renders text as tall', () => {
      expect(component.$('#text.short')).to.not.exist;
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

    it.skip('autoLinks hashtag', () => {
      expect(component.$$('#text a')[1].getAttribute('href')).to.eq('https://twitter.com/search?q=%23nature');
      expect(component.$$('#text a')[1].getAttribute('class')).to.include('tweet-url hashtag'); // Firefox ShadowDOM pollyfil adds additional classes
    });
  });

  describe('gif status', () => {
    beforeEach(async () => {
      component = fixture('<twitter-status></twitter-status>');
      let res = await fetch('./base/test/gif.json');
      component.status = await res.json();
    });

    it('renders an image', () => {
      expect(component.$('#media video').getAttribute('src')).to.eq('https://video.twimg.com/tweet_video/DhXcLaqUwAIbVwp.mp4');
    });

    it('autoLinks hashtag', () => {
      expect(component.$('#text').innerText.trim()).to
        .eq('Just finished proofreading a 🔥 @Web_Components blog post by @pblatteier! Can\'t wait till the rest of you can enjoy it.');
    });
  });

  describe('retweet status', () => {
    beforeEach(async () => {
      component = fixture('<twitter-status></twitter-status>');
      let res = await fetch('./base/test/retweet.json');
      component.status = await res.json();
    });

    it('renders retweet text', () => {
      expect(component.$('#retweet').innerText.trim()).to.eq('Abraham Williams Retweeted');
      expect(component.$('#retweet a').getAttribute('href')).to.eq('https://twitter.com/abraham');
    });
  });

  describe('html in text', () => {
    beforeEach(async () => {
      component = fixture('<twitter-status></twitter-status>');
      let res = await fetch('./base/test/script.json');
      component.status = await res.json();
    });

    it('renders correctly', () => {
      expect(component.$('#text').innerText.trim()).to.eq('<script>alert(\'thing\');</script>');
    });
  });

  describe('relative timestamp', () => {
    describe('15 seconds ago', () => {
      beforeEach(async () => {
        component = fixture('<twitter-status update-timestamp></twitter-status>');
        let res = await fetch('./base/test/simple.json');
        let status = await res.json();
        component.status = { ...status, created_at: formatDate(Date.now() - 15 * 1000) };
      });

      it('renders date', () => {
        expect(['15s', '16s'].includes(component.$('#link').innerText)).to.be.true;
      });

      it('enables updating timestamps', () => {
        expect(component.updateTimestamp).to.eq(true);
      });
    });

    describe('15 minutes ago', () => {
      beforeEach(async () => {
        component = fixture('<twitter-status></twitter-status>');
        let res = await fetch('./base/test/simple.json');
        let status = await res.json();
        component.status = { ...status, created_at: formatDate(Date.now() - 15 * 60 * 1000) };
      });

      it('renders date', () => {
        expect(component.$('#link').innerText).to.eq('15m');
      });
    });

    describe('15 hours ago', () => {
      beforeEach(async () => {
        component = fixture('<twitter-status></twitter-status>');
        let res = await fetch('./base/test/simple.json');
        let status = await res.json();
        component.status = { ...(status), created_at: formatDate(Date.now() - 15 * 60 * 60 * 1000) };
      });

      it('renders date', () => {
        expect(component.$('#link').innerText).to.eq('15h');
      });
    });

    describe('15 days ago', () => {
      const date = Date.now() - 15 * 60 * 60 * 24 * 1000;

      beforeEach(async () => {
        component = fixture('<twitter-status></twitter-status>');
        let res = await fetch('./base/test/simple.json');
        let status = await res.json();
        component.status = { ...status, created_at: formatDate(date) };
      });

      it('renders date', () => {
        expect(component.$('#link').innerText).to.eq(moment(date).format('D MMM'));
      });
    });
  });
});

function formatDate(date: number) {
  return moment(date).format('dd MMM DD HH:mm:ss ZZ YYYY');
}

function fixture(tag: string): TwitterStatus {
  function fixtureContainer(): HTMLElement {
    let div = document.createElement('div');
    div.classList.add('fixture');
    return div;
  }
  let fixture = document.body.querySelector('.fixture') || document.body.appendChild(fixtureContainer());
  fixture.innerHTML = tag;
  return fixture.children[0] as TwitterStatus;
}
