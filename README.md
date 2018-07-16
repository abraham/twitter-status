&lt;twitter-status&gt;
====

[![Version Status](https://img.shields.io/npm/v/twitter-status.svg?style=flat&label=version&colorB=4bc524)](https://npmjs.com/package/twitter-status)
[![macOS Build Status](https://img.shields.io/circleci/project/github/abraham/twitter-status.svg?style=flat&label=macos)](https://circleci.com/gh/abraham/twitter-status)
[![Linux Build Status](https://img.shields.io/travis/abraham/twitter-status.svg?style=flat&label=linux)](https://travis-ci.org/abraham/twitter-status)
[![Windows Build Status](https://img.shields.io/appveyor/ci/abraham/twitter-status.svg?style=flat&label=windows)](https://ci.appveyor.com/project/abraham/twitter-status)
[![Dependency Status](https://david-dm.org/abraham/twitter-status.svg?style=flat)](https://david-dm.org/abraham/twitter-status)

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

twiter-status takes a single value `status` that must be the full response of [GET statuses/show/:id](https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/get-statuses-show-id) with the parameters `include_entities=true` and `tweet_mode=extended`.

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


&lt;twitter-user&gt;
----

Looking for a way to embed users? Check out [&lt;twitter-user&gt;](https://github.com/abraham/twitter-user).

Notes
----

TwitterStatus is released under an MIT license.

TwitterStatus is not affiliated Twitter, Inc.

Built, tested, and published with [Nutmeg](https://nutmeg.tools).
