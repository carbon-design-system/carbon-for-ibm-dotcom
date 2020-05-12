# Content Block

> The Content Block is a core sub-pattern used to help you build more complex
> patterns by being placed within Content Sections.

## Getting started

Here's a quick example to get you started.

##### CSS

```css
// yourapplication.scss
@import '@carbon/type/scss/font-face/mono';
@import '@carbon/type/scss/font-face/sans';
@include carbon--font-face-mono();
@include carbon--font-face-sans();
@import '@carbon/ibmdotcom-styles/scss/patterns/sub-patterns/content-block/_content-block.scss';
```

> 💡 Only import fonts once per usage. Don't forget to import the ContentBlock
> styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

### Base example

This is the base example of 'ContentBlock'.

##### JS

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { ContentBlock } from '@carbon/ibmdotcom-react';
import 'yourapplication.scss';

function App() {
  const heading = 'This heading is optional';
  const copy = 'This copy text is optional';
  const content = 'This is the Content Block children.';
  const cta = {
    style: 'card',
    type: 'external',
    copy: 'This CTA is optional',
    cta: {
      href: 'https://www.example.com',
    },
  };

  return (
    <ContentBlock inverse={false} heading={heading} copy={copy} cta={cta}>
      {content}
    </ContentBlock>
  );
}
ReactDOM.render(<App />, document.querySelector('#app'));
```

Add the following line in your `.env` file at the root of your project.
[See more details](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/styles#usage).

```
  SASS_PATH=node_modules:src
```

> 💡 Only import fonts once per usage. 💡

### Example with ContentBlock passing in components into the right panel

This example passes in elements into the `aside` prop to render components in
the right panel of ContentBlock as well as option to set border at the bottom.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { ContentBlock, LinkList } from '@carbon/ibmdotcom-react';
import 'yourapplication.scss';

function App() {
  const heading = 'This heading is optional';
  const copy = 'This copy text is optional';
  const content = 'This is the Content Block children.';
  const cta = {
    style: 'card',
    type: 'external',
    copy: 'This CTA is optional',
    cta: {
      href: 'https://www.example.com',
    },
  };

  const linkListProps = {
    heading: 'Tutorials',
    items: [
      {
        type: 'local',
        copy: 'Containerization A Complete Guide',
        cta: {
          href: 'https://ibm.com',
        },
      },
      {
        type: 'external',
        copy: 'Why should you use microservices and containers',
        cta: {
          href: 'https://ibm.com',
        },
      },
    ],
  };

  const aside = {
    items: <LinkList {...linkListProps} />,
    border: true, //option to set bottom border here
  };

  return (
    <ContentBlock heading={heading} copy={copy} cta={cta} aside={aside}>
      {content}
    </ContentBlock>
  );
}
ReactDOM.render(<App />, document.querySelector('#app'));
```

> Don't forget to import the content block styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

## Props

| Name              | Required | Data Type | Default Value | Description                                                                                                |
| ----------------- | -------- | --------- | ------------- | ---------------------------------------------------------------------------------------------------------- |
| `aside`           | NO       | Object    | null          | Object containing elements to be rendered within `<aside>` html element on right panel. See `aside` below. |
| `copy`            | NO       | String    | null          | Copy text.                                                                                                 |
| `children`        | YES      | Element   | null          | Children elements passed into `ContentBlock` to be rendered.                                               |
| `cta`             | NO       | Object    | null          | CTA object.                                                                                                |
| `customClassName` | NO       | String    | null          | Custom className to wrap the `ContentBlock` component.                                                     |
| `heading`         | NO       | String    | null          | Heading text.                                                                                              |
| `inverse`         | NO       | Boolean   | `false`       | Changes theme to inverse/default                                                                           |

### aside

| Name     | Data Type | Description                                                |
| -------- | --------- | ---------------------------------------------------------- |
| `items`  | Element   | Elements/Components to be rendered on the right panel.     |
| `border` | Boolean   | Determines whether bottom border of `ContentBlock` is set. |

Visit the
[CTA documentation](https://ibmdotcom-react.mybluemix.net/?path=/story/components-cta--default)
to for more details on the CTA props.

## Stable selectors

| Name                           | Description                                          |
| ------------------------------ | ---------------------------------------------------- |
| `dds--content-block`           | `ContentBlock` wrapper layer                         |
| `dds--content-block__heading`  | heading element                                      |
| `dds--content-block__children` | children elements rendered within the `ContentBlock` |
| `dds--content-block__cta`      | cta element                                          |

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our
[Contributing Guide](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/.github/CONTRIBUTING.md)!
👀

## 📝 License

Licensed under the
[Apache 2.0 License](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/LICENSE).
