<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of contents

- [Markdown contents](#markdown-contents)
  - [Using `<dds-content-*-copy>`](#using-dds-content--copy)
  - [Rendering markdown on server](#rendering-markdown-on-server)
  - [Use raw HTML](#use-raw-html)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Markdown contents

In most cases, `<dds-content-*>` is used with its "copy" content. There are several ways to specify the copy content.

### Using `<dds-content-*-copy>`

`<dds-content-*-copy>` are Web Components that automatically renders the given markdown content to HTML. It takes either `content` property (_not_ attribute) or child text node as the markdown content. The markdown content will be converted to HTML with sanitization.

Given the nature of child text node, some extra caution is required to use child text node as the markdown content:

- After-initialization change of markdown content via child text node is not supported.
- Don't put any extra whitespace, e.g. line feeds, between the start/end tag and the markdown content.
- HTML-escape the content as needed.

### Rendering markdown on server

While `<dds-content-*-copy>` provides an easy way to use markdown for `<dds-content-*>`, it requires markdown parser and HTML sanitizer has to be downloaded and run in browser. To reduce the cost of downloading and running, especially if the target network and device environment is limiting, rendering markdown on server is often helpful.

For example, a Handlebars helper that works with the Carbon for IBM.com [`markdownToHtml` utility](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.12.0/packages/utilities/src/utilities/markdownToHtml/markdownToHtml.js) can be defined to convert generated HTML from markdown content:

```javascript
const Handlebars = require('handlebars');
const { default: markdownToHtml } = require('@carbon/ibmdotcom-utilities/lib/utilities/markdownToHtml/markdownToHtml');

...

Handlebars.registerHelper('markdown', options => {
  return new Handlebars.SafeString(markdownToHtml(options.fn(this)));
});
```

Such Handlebars helper can be used like:

```handlebars
<div class="bx--content-item__copy">
  {{{{markdown}}}}
Lorem ipsum *dolor* sit amet, consectetur adipiscing elit. Aenean et ultricies est.
Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales
nulla quis, *consequat* libero. Here are
some common categories:

- [list item](https://www.ibm.com)
  - list item 1a
1. list item 2
  1. list item 2a
  {{{{/markdown}}}}
</div>
```

> 💡 Make sure loading the Sass code for the corresponding CSS class for the "copy" content. For example, one for `bx--content-item__copy` class is defined in `@carbon/ibmdotcom-styles/scss/internal/content-item/content-item`.

> 💡 Check our
> [CodeSandbox](https://githubbox.com/carbon-design-system/carbon-for-ibm-dotcom/tree/main/packages/web-components/examples/codesandbox/usage/markdown-handlebars)
> example implementation.

[![Edit @carbon/ibmdotcom-web-components](https://codesandbox.io/static/img/play-codesandbox.svg)](https://githubbox.com/carbon-design-system/carbon-for-ibm-dotcom/tree/main/packages/web-components/examples/codesandbox/usage/markdown-handlebars)

### Use raw HTML

Another way to define the "copy" content is using raw HTML:

```html
<div class="bx--content-item__copy">
  <p>
    Lorem ipsum <em>dolor</em> sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec
    hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, <em>consequat</em> libero. Here are some common categories:
  </p>
  <ul class="bx--list--unordered">
    <li class="bx--list__item">
      <a href="https://www.ibm.com" class="bx--link">list item</a>
      <ol class="bx--list--ordered">
        <li class="bx--list__item">list item 1a</li>
      </ol>
    </li>
  </ul>
  <ol class="bx--list--ordered">
    <li class="bx--list__item">
      list item 2
      <ul class="bx--list--unordered">
        <li class="bx--list__item">list item 2a</li>
      </ul>
    </li>
  </ol>
</div>
```

> 💡 Make sure loading the Sass code for the corresponding CSS class for the "copy" content. For example, one for `bx--content-item__copy` class is defined in `@carbon/ibmdotcom-styles/scss/internal/content-item/content-item`.
