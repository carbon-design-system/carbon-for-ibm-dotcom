# Lead Space

> The Lead Space pattern is to be utilized within IBM.com.

## Getting started

Here's a quick example to get you started.

##### CSS

```css
// yourapplication.scss
@import '@carbon/type/scss/font-face/mono';
@import '@carbon/type/scss/font-face/sans';
@include carbon--font-face-mono();
@include carbon--font-face-sans();

@import '@carbon/ibmdotcom-styles/scss/patterns/sections/leadspace/leadspace';
```

> 💡 Only import fonts once per usage. Don't forget to import the Leadspace
> styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

##### JS

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { LeadSpace } from '@carbon/ibmdotcom-react';
import { ArrowRight20 } from '@carbon/icons-react';
import 'yourapplication.scss';

function App() {
  return (
    <LeadSpace
      type="default"
      theme="g100"
      title="Lorem Ipsum"
      copy="Lorem Ipsum Dolor"
      gradient={true}
      buttons={[
        {
          copy: 'Button 1',
          renderIcon: ArrowRight20,
          href: 'https://www.example.com',
        },
        {
          copy: 'Button 2',
          renderIcon: ArrowRight20,
          href: 'https://www.example.com',
        },
      ]}
      image={{
        sources: [
          { src: 'https://picsum.photos/id/1076/320/370', breakpoint: 'sm' },
          { src: 'https://picsum.photos/id/1076/672/400', breakpoint: 'md' },
        ],
        defaultSrc: 'https://picsum.photos/id/1076/1056/480',
        alt: 'lead space image',
      }}
    />
  );
}
ReactDOM.render(<App />, document.querySelector('#app'));
```

Add the following line on your `.env` file at the root of your project,
[see more details](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/styles#usage)

```
  SASS_PATH=node_modules:src
```

> 💡 Don't forget to import the leadspace styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

## Props

| Name       | Required | Data Type | Default Value | Description                                                                           |
| ---------- | -------- | --------- | ------------- | ------------------------------------------------------------------------------------- |
| `buttons`  | NO       | Array     | null          | Array of button objects to render (max 2). See `buttons` below.                       |
| `copy`     | NO       | String    | null          | Short copy of LeadSpace.                                                              |
| `gradient` | NO       | Boolean   | false         | Determines whether to render overlay gradient.                                        |
| `image`    | NO       | Object    | null          | Object with different ratio options for corresponding breakpoints. See `image` below. |
| `theme`    | NO       | String    | 'white'       | Color theme of LeadSpace. See `themes` below.                                         |
| `title`    | YES      | String    | n/a           | Title of LeadSpace.                                                                   |
| `type`     | NO       | String    | 'small'       | Sets the type of Leadspace layout. See `types` below.                                 |

### buttons (optional)

Visit the
[ButtonGroup storybook](https://ibmdotcom-react.mybluemix.net/?path=/story/patterns-sub-patterns-buttongroup--default)
for more details on the ButtonGroup component.

### image (optional)

Visit the
[Image storybook](https://ibmdotcom-react.mybluemix.net/?path=/story/components-imagewithcaption--default)
for more details on the ImageWithCaption component.

### themes (optional)

| Name    | Data Type | Description           |
| ------- | --------- | --------------------- |
| `white` | String    | Carbon White theme    |
| `g100`  | String    | Carbon Gray 100 theme |

### type (optional)

| Name              | Data Type | Description                                       |
| ----------------- | --------- | ------------------------------------------------- |
| `small`/`default` | String    | Left-aligned - small style of the leadspace title |
| `left`            | String    | Left-aligned - large style of the leadspace title |
| `centered`        | String    | Centered type of the LeadSpace                    |

## Stable selectors

| Name                    | Description                 |
| ----------------------- | --------------------------- |
| `dds--leadspace`        | Pattern                     |
| `dds--leadspace__desc`  | LeadSpace short description |
| `dds--leadspace__image` | LeadSpace background image  |
| `dds--leadspace__ctas`  | LeadSpace CTAs wrapper      |

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our
[Contributing Guide](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/.github/CONTRIBUTING.md)!
👀

## 📝 License

Licensed under the
[Apache 2.0 License](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/LICENSE).
