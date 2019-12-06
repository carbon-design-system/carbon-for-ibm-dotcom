# Use Cases

> The Use Cases pattern is to be utilized within IBM.com.

## Getting started

Here's a quick example to get you started.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { UseCases } from '@carbon/ibmdotcom-patterns-react';
import '@carbon/ibmdotcom-styles/scss/patterns/usecases/index.scss';

function App() {
  return;
  <UseCases
    title={title}
    copy={copy}
    border="true"
    usecaseGroup={usecaseGroup}
  />;
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

| Name           | Required | Data Type | Default Value | Description                                                   |
| -------------- | -------- | --------- | ------------- | ------------------------------------------------------------- |
| `border`       | NO       | Boolean   | false         | Determines whether to render bottom border of pattern.        |
| `copy`         | NO       | String    | null          | Short copy to suppport title.                                 |
| `title`        | YES      | String    | n/a           | Main title of UseCase pattern                                 |
| `usecaseGroup` | NO       | Array     | null          | Array of useCase objects to render. See `usecaseGroup` below. |

### usecaseGroup

| Name    | Data Type | Description                                                                                       |
| ------- | --------- | ------------------------------------------------------------------------------------------------- |
| `image` | Object    | Image of Use Case including different aspect ratios for different breakpoints. See `image` below. |
| `lists` | Array     | Array of list objects to render within the use case. See `lists` below.                           |
| `link`  | Object    | Object with the href, text, and target properities of the use case link. See `link` below.        |
| `title` | String    | Title of Use Case.                                                                                |

### image

| Name  | Data Type | Description                                                                           |
| ----- | --------- | ------------------------------------------------------------------------------------- |
| `alt` | String    | Alt description of image.                                                             |
| `uri` | Object    | Image object containing urls to the image for different breakpoints. See `uri` below. |

### uri

| Name | Data Type | Description                                               |
| ---- | --------- | --------------------------------------------------------- |
| `sm` | String    | Image with aspect ration (640 x 320) for `sm` breakpoint  |
| `md` | String    | Image with aspect ration (768 x 384) for `md` breakpoint  |
| `lg` | String    | Image with aspect ration (1024 x 512) for `lg` breakpoint |

### lists

| Name    | Data Type | Description                  |
| ------- | --------- | ---------------------------- |
| `copy`  | String    | Copy of Use Case list item.  |
| `title` | String    | Title of Use Case list item. |

### link

| Name     | Data Type | Description                                                |
| -------- | --------- | ---------------------------------------------------------- |
| `href`   | String    | Url of use case link.                                      |
| `text`   | String    | Use case link text.                                        |
| `target` | String    | Open within current tab or new tab ('\_self' or '\_blank') |

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
