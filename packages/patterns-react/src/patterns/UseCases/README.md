# Use Cases

> The Use Cases pattern is to be utilized within IBM.com.

## Getting started

Here's a quick example to get you started.

```scss
// yourapplication.scss
@import '@carbon/type/scss/font-face/mono';
@import '@carbon/type/scss/font-face/sans';
@include carbon--font-face-mono();
@include carbon--font-face-sans();

@import '@carbon/ibmdotcom-styles/scss/patterns/usecases/index';
```

> 💡 Only import fonts once per usage

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { UseCases } from '@carbon/ibmdotcom-patterns-react';
import 'yourapplication.scss';

function App() {
  const title = 'Lorem Ipsum';
  const copy = 'Lorem Ipsum';
  const usecaseGroup = [
    {
      title: 'Aliquam condimentum interdum',
      image: {
        uri: {
          sm: 'https://via.placeholder.com/640x320',
          md: 'https://via.placeholder.com/768x384',
          lg: 'https://via.placeholder.com/1024x512',
        },
        alt: 'Place Holder Image',
      },
      lists: [
        {
          title: 'Nunc convallis lobortis',
          copy:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
        },
        {
          title: 'Interdum et malesuada',
          copy:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
        },
      ],
      link: {
        href: 'https://www.example.com',
        title: 'Vivamus interdum ligula',
        target: '_self',
      },
    },
  ];

  return (
    <UseCases
      title={title}
      copy={copy}
      border={true}
      usecaseGroup={usecaseGroup}
    />
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

> 💡 Don't forget to import the usecases styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

#### Feature Flags

To utilize the following features, set the following variable's to `true` within
your `.env` file or your application build settings.

```
USECASES=true
```

> See
> [feature-flags.md](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/patterns-react/docs/feature-flags.md)
> and
> [.env.example](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/patterns-react/.env.example)
> for more information

## Props

| Name           | Description                                                                                                                                   |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`        | Use Cases title `{title}`                                                                                                                     |
| `copy`         | Use Cases content `{copy}`                                                                                                                    |
| `border`       | Use Cases border `true|false`                                                                                                                 |
| `usecaseGroup` | Use Cases usecaseGroup `{usecaseGroup: [ {title, image: {uri: {sm, md, ls}, alt }, list: [{ title, copy }], link: {href, title, target} } ]}` |

## Stable selectors

| Name                  | Description |
| --------------------- | ----------- |
| `dds--usecases`       | Component   |
| `dds--usecases-group` | Component   |
| `dds--usecases-item`  | Component   |

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our
[Contributing Guide](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/.github/CONTRIBUTING.md)!
👀

## 📝 License

Licensed under the
[Apache 2.0 License](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/LICENSE).
