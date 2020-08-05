# Stable selectors (for analytics and integration/E2E testing) in Web Components

`@carbon/ibmdotcom-react`, etc. libraries have `data-autoid` attributes in several places, to convey better context for e.g. analytics libraries, when they capture bubbling events e.g. `click` on `<body>` and inspects `event.target`. `data-autoid` is more useful than having to inspect contents in raw HTML `<div>` tags, etc., because `data-autoid` augments raw `<div>` tags with the context of application structure where raw `<div>` tags themselves tend to only convey how the UI should look like. We call such `data-autoid` attributes "stable selectors".

`@carbon/ibmdotcom-web-components` being based on Web Components abstrats away such raw HTML `<div>`, etc. tags, into e.g. `<dds-header-logo>` (one for the IBM logo in masthead) and `<dds-masthead-search>` (one for the collapsible search box in masthead).

It means that in Web Components world, tag names and their attributes well convey application structure, without having to rely on "stable selectors". For example, analytics code can do something like:

```javascript
document.body.addEventListener('click', event => {
  if (event.target.tagName === 'DDS-MASTHEAD-LOGO') {
    // Code to send header logo click event to analytics...
  }
});
```

`<dds-masthead-search>` has more than one clickable buttons. Therefore, `<dds-masthead-search>` fires custom events e.g. `dds-masthead-search-toggled` to better convey the context wrt what action is take upon clicking. You can use it like:

```javascript
document.body.addEventListener('dds-masthead-search-toggled', event => {
  console.log('Search box new open state:', event.detail.active);
  // Code to send masthead search bar toggle event to analytics...
});
```

See Docs tab in each components in https://ibmdotcom-web-components.mybluemix.net/ to see more details on available custom events are available, available attributes/properties are for more context, etc.

## `data-autoid` support for partial backward compatibility

`@carbon/ibmdotcom-web-components` supports `data-autoid` stable selectors for some elements, to provide compatibility to and easier migration from `@carbon/ibmdotcom-react`. However, `document.querySelector('[data-autoid="stable-selector"]')` and `event.target.autoId` does not work with elements in shadow DOM, due to shadow DOM's nature. Therefore, `data-autoid` is _not_ provided for all elements.

See Stable selectors section in Docs tab in each components in https://ibmdotcom-web-components.mybluemix.net/ to see the list of supported `data-autoid` and their Web Components alternatives.
