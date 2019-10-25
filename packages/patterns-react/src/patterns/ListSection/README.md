# List Section

> The List Section pattern is to be utilized within IBM.com.

## Getting started

Here's a quick example to get you started.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { ListSection } from '@carbon/ibmdotcom-patterns-react';
import '@carbon/ibmdotcom-styles/scss/patterns/listsection/index.scss';

function App() {
  return <ListSection title={title} copy={copy} listGroup={listGroup} />;
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

> 💡 Don't forget to import the leadspace styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

#### Feature Flags

To utilize the following features, set the following variable's to `true` within
your `.env` file or your application build settings.

```
LISTSECTION=true
```

> See
> [feature-flags.md](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/patterns-react/docs/feature-flags.md)
> and
> [.env.example](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/patterns-react/.env.example)
> for more information

## Props

| Name        | Description                                                                    |
| ----------- | ------------------------------------------------------------------------------ |
| `title`     | List section title `{title}`                                                   |
| `copy`      | List section content `{copy}`                                                  |
| `listGroup` | List section listGroup `{listGroup: [ {title, copy, link: {href, target} } ]}` |

## Stable selectors

| Name               | Description |
| ------------------ | ----------- |
| `dds--listsection` | Component   |
| `dds--listgroup`   | Component   |
| `dds--list`        | Component   |

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our
[Contributing Guide](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/.github/CONTRIBUTING.md)!
👀

## 📝 License

Licensed under the
[Apache 2.0 License](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/LICENSE).
