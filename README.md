&lt;twitter-status&gt;
====

Install
----

Polyfill tags if you need them. This will include ShadowDOM and Custom Elements support.

```
<script src="https://unpkg.com/@webcomponents/webcomponentsjs@latest/webcomponents-sd-ce.js"></script>
```

Loading this component. It would be a good idea to use a specific version instead of `latest`.

```
<script src="https://unpkg.com/twitter-status@latest/dist/twitter-status.min.js"></script>
```

Usage
----

```
<twitter-status></twitter-status>

<twitter-status></twitter-status>

<twitter-status>Slot content</twitter-status>
```

```
document.querySelector('<twitter-status>').status = Status;

```

License
----

TwitterStatus is released under an MIT license.

Built, tested, and published with [Nutmeg](https://nutmeg.tools).
