<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of contents

- [Stable selectors (for analytics and integration/E2E testing) in Web Components](#stable-selectors-for-analytics-and-integratione2e-testing-in-web-components)
  - [`data-autoid` support for partial backward compatibility](#data-autoid-support-for-partial-backward-compatibility)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Stable selectors (for analytics and integration/E2E testing) in Web Components

`@carbon/ibmdotcom-react`, etc. libraries have `data-autoid` attributes in several places, to convey better context for example in analytics libraries when they capture bubbling events (e.g. `click` on `<body>` and inspect `event.target`). `data-autoid` is more useful than having to inspect contents in raw HTML `<div>` tags, etc., because `data-autoid` augments raw `<div>` tags with the context of application structure whereas raw `<div>` tags themselves tend to only convey how the UI should look. We call such `data-autoid` attributes "stable selectors".

`@carbon/ibmdotcom-web-components`, being based on Web Components, abstracts away such raw HTML `<div>`, etc. tags, into e.g. `<dds-header-logo>` (one for the IBM logo in masthead) and `<dds-masthead-search>` (one for the collapsible search box in masthead).

It means that in Web Components world, tag names and their attributes will convey application structure, without having to rely on "stable selectors". For example, analytics code can do something like:

```javascript
document.body.addEventListener('click', event => {
  if (event.target.tagName === 'DDS-MASTHEAD-LOGO') {
    // Code to send header logo click event to analytics...
  }
});
```

`<dds-masthead-search>` has more than one clickable button. Therefore, `<dds-masthead-search>` fires custom events e.g. `dds-masthead-search-toggled` to better convey the context with respect to what action is taken upon clicking. You can use it like:

```javascript
document.body.addEventListener('dds-masthead-search-toggled', event => {
  console.log('Search box new open state:', event.detail.active);
  // Code to send masthead search bar toggle event to analytics...
});
```

Refer to the Docs tab in each component in https://www.ibm.com/standards/carbon/web-components/ to see more details on available custom events, available attributes/properties, etc.

## `data-autoid` support for partial backward compatibility

`@carbon/ibmdotcom-web-components` supports `data-autoid` stable selectors for some elements, to provide compatibility to and easier migration from `@carbon/ibmdotcom-react`. However, `document.querySelector('[data-autoid="stable-selector"]')` and `event.target.autoId` does not work with elements in shadow DOM, due to shadow DOM's nature. Therefore, `data-autoid` is _not_ provided for all elements.

See the Stable selectors section in the Docs tab in each component in https://www.ibm.com/standards/carbon/web-components/ for the list of supported `data-autoid` and their Web Components alternatives.
