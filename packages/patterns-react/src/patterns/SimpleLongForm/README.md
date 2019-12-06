# Simple Long Form

> The Simple Long Form pattern is to be utilized within IBM.com.

## Getting started

Here's a quick example to get you started.

```scss
// yourapplication.scss
@import '@carbon/type/scss/font-face/mono';
@import '@carbon/type/scss/font-face/sans';
@include carbon--font-face-mono();
@include carbon--font-face-sans();

@import '@carbon/ibmdotcom-styles/scss/patterns/simplelongform/simplelongform';
```

> 💡 Only import fonts once per usage

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { SimpleLongForm } from '@carbon/ibmdotcom-patterns-react';
import 'yourapplication.scss';

function App() {
  return (
    <SimpleLongForm
      title={title}
      copy={copy}
      linkType={linkType}
      border={true}
      link={link}
    />
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

> 💡 Don't forget to import the simplelongform styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

#### Feature Flags

To utilize the following features, set the following variable's to `true` within
your `.env` file or your application build settings.

```
DDS_SIMPLELONGFORM=true
```

> See
> [feature-flags.md](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/patterns-react/docs/feature-flags.md)
> and
> [.env.example](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/patterns-react/.env.example)
> for more information

## Props

| Name       | Required | Data Type | Default Value | Description                                 |
| ---------- | -------- | --------- | ------------- | ------------------------------------------- |
| `border`   | NO       | Boolean   | false         | Determines whether to render bottom border. |
| `copy`     | NO       | String    | null          | Short copy to support the title.            |
| `linkType` | NO       | String    | null          | Type of Link. See `linkType` below.         |
| `link`     | NO       | Object    | null          | Object with link details. See `link` below. |
| `theme`    | NO       | String    | 'white'       | Color theme for pattern. See `theme` below. |
| `title`    | YES      | String    | n/a           | Title of the Simple Long Form.              |

### linkType

| Name       | Data Type | Description                         |
| ---------- | --------- | ----------------------------------- |
| `none`     | String    | Render no link.                     |
| `cardLink` | String    | Render with CardLink component.     |
| `iconLink` | String    | Render with LinkWithIcon component. |

### link

| Name     | Data Type | Description                                                |
| -------- | --------- | ---------------------------------------------------------- |
| `href`   | String    | Url of link.                                               |
| `text`   | String    | Link text.                                                 |
| `target` | String    | Open within current tab or new tab ('\_self' or '\_blank') |

### theme (optional)

| Name    | Data Type | Description                  |
| ------- | --------- | ---------------------------- |
| `white` | String    | Carbon White theme           |
| `g100`  | String    | Carbon Gray 100 (g100) theme |

## Stable selectors

| Name                        | Description                   |
| --------------------------- | ----------------------------- |
| `dds--simplelongform`       | Pattern                       |
| `dds--simplelongform__link` | Simple Long Form link element |

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our
[Contributing Guide](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/.github/CONTRIBUTING.md)!
👀

## 📝 License

Licensed under the
[Apache 2.0 License](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/LICENSE).
