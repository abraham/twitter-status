&lt;twitter-status&gt;
====

[![Version Status](https://img.shields.io/npm/v/twitter-status.svg?style=flat&label=version&colorB=4bc524)](https://npmjs.com/package/twitter-status)
[![macOS Build Status](https://img.shields.io/circleci/project/github/abraham/twitter-status.svg?style=flat&label=macos)](https://circleci.com/gh/abraham/twitter-status)
[![Linux Build Status](https://img.shields.io/travis/abraham/twitter-status.svg?style=flat&label=linux)](https://travis-ci.org/abraham/twitter-status)
[![Windows Build Status](https://img.shields.io/appveyor/ci/abraham/twitter-status.svg?style=flat&label=windows)](https://ci.appveyor.com/project/abraham/twitter-status)
[![Dependency Status](https://david-dm.org/abraham/twitter-status.svg?style=flat)](https://david-dm.org/abraham/twitter-status)
[![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/twitter-status.svg?style=flat&colorB=4bc524)](https://bundlephobia.com/result?p=twitter-status)

Twitter Status Web Component

Examples
----

[Live demo](https://codepen.io/abraham/pen/eyLLWy)

Base example

![Example](/images/simple.png)

Example with attached image

![Example with image](/images/image.png)

Example with hyperlinked hashtags/mentions/URLs and links colored from profile settings.

![Example with image](/images/colors.png)

Install
----

Load directly from unpkg:

```html
<script async src="https://unpkg.com/twitter-status@latest/dist/twitter-status.min.js"></script>
```

Or installed as a dependency:

```sh
npm install twitter-status
```

And imported:

```js
import 'twitter-status';
```

Polyfill
----

twitter-status relies on the [shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM) and [custom elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) standards. You will likely need a [polyfill](https://github.com/webcomponents/webcomponentsjs) until browser support is more ubiquitous.

Polyfills can be loaded via unpkg directly.
```html
<script src="https://unpkg.com/@webcomponents/webcomponentsjs@2/bundles/webcomponents-sd-ce.js"></script>
```

Or installed as a dependency:

```sh
npm install @webcomponents/webcomponentsjs
```

And imported:

```js
import '@webcomponents/webcomponentsjs/bundles/webcomponents-sd-ce';
```

Usage
----

&lt;twitter-status&gt; takes a single value `status` that must be the full response of [GET statuses/show/:id](https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/get-statuses-show-id) with the parameters `include_entities=true` and `tweet_mode=extended`.

You can embed the tweet in the HTML as a JSON string:
```html
<twitter-status status="{\"id_str\":\"20\",...}"></twitter-status>
```

Or set the property in JS:
```html
<twitter-status></twitter-status>

<script>
  document.querySelector('twitter-status').status = { "id_str": "20", ... };
</script>
```

Theme
----

You can theme the borders. Here is an card example.

```html
<style>
  twitter-status.card {
    box-shadow: 0 3px 4px 1px rgba(0, 0, 0, .08), 0 1px 1px 1px rgba(0, 0, 0, .05);
    border-radius: 2px;
    border-width: 0;
  }
</style>
<twitter-status class="card" status="{\"id_str\":\"20\",...}"></twitter-status>
```

![Example with card edges](/images/card.png)

Reasons
----

**Why use &lt;twitter-status&gt; instead of Twitter's embedded tweets?**

- Open source - If you don't like something about it you can customize it to fit your exact needs.
- Lightweight
  - A minimal &lt;twitter-status&gt; [example](https://twitter-e9454.firebaseapp.com/twitter-status) comes in at **33KB** before compression. ([With more to save](https://github.com/abraham/twitter-status/issues/79))
  - A minimal [Twitter Embed](https://developer.twitter.com/en/docs/twitter-for-websites/embedded-tweets/overview.html) [example](https://twitter-e9454.firebaseapp.com/oembed) comes in at **121KB** before compression.
- Security - You can perform a security audit of &lt;twitter-status&gt; and know exactly what you are shipping. You don't have to worry about loading Twitter's JavaScript.
- Privacy - &lt;twitter-status&gt; only loads embedded images and videos from Twitter's CDN. You don't have to worry about loading Twitter's JavaScript.
- Native web component - &lt;twitter-status&gt; is built with standardized web APIs that will work out of the box with [most frameworks](https://custom-elements-everywhere.com/).
- No framework dependancies - Because it's based on native web components, it does not have a dependency on Angular, React, or any other framework.
- Custom URL handling ([coming soon](https://github.com/abraham/twitter-status/issues/48)) - When a user click on a #hashtag, @mention, etc, you can configure it that they stay within your site.
- Cached data - If you are a news organization or displaying tweets from politicians, you can continue displaying deleted tweets.
- Well tested - &lt;twitter-status&gt; as a nice suit of tests to make sure everything continues to render correctly.

**Limitations of &lt;twitter-status&gt;?**

- Web component polyfills - Shadow DOM and custom elements are [not supported in all browsers](https://developer.mozilla.org/en-US/docs/Web/Web_Components#Browser_support), if you are not already using web components the pollyfills may add additional data cost.
- Twitter cards - Twitter fetches data about links and embeds those in tweets. The data is not available via the API so &lt;twitter-status&gt; does not have access.
- Status object - &lt;twitter-status&gt; requires the full tweet object. If you only have an ID you'll have to make a request to the Twitter API before using the component.
- Activity counts - Because the status objects may be stale, like, retweet, and reply counts are not displayed.
- Open source - This project is not backed by any financing so work gets done as time permits. There are [known status types](https://github.com/abraham/twitter-status/issues) that are not supported yet.

**What other options are there?**

- [Twitter's official embedded tweets](https://developer.twitter.com/en/docs/twitter-for-websites/embedded-tweets/overview.html)
- [react-tweet-embed](https://github.com/capaj/react-tweet-embed)
- [react-tweet](https://github.com/mannynotfound/react-tweet)

&lt;twitter-user&gt;
----

Looking for a way to embed users? Check out [&lt;twitter-user&gt;](https://github.com/abraham/twitter-user).

Notes
----

TwitterStatus is released under an MIT license.

TwitterStatus is not affiliated Twitter, Inc.

Built, tested, and published with [Nutmeg](https://nutmeg.tools).
