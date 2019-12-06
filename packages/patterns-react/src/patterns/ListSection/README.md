# List Section

> The List Section pattern is to be utilized within IBM.com.

## Getting started

Here's a quick example to get you started.

```scss
// yourapplication.scss
@import '@carbon/type/scss/font-face/mono';
@import '@carbon/type/scss/font-face/sans';
@include carbon--font-face-mono();
@include carbon--font-face-sans();

@import '@carbon/ibmdotcom-styles/scss/patterns/listsection/index';
```

> 💡 Only import fonts once per usage

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { ListSection } from '@carbon/ibmdotcom-patterns-react';
import 'yourapplication.scss';

function App() {
  return (
    <ListSection
      title={title}
      copy={copy}
      border={true}
      listGroup={listGroup}
    />
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

> 💡 Don't forget to import the leadspace styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

#### Feature Flags

To utilize the following features, set the following variable's to `true` within
your `.env` file or your application build settings.

```
DDS_LISTSECTION=true
```

> See
> [feature-flags.md](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/patterns-react/docs/feature-flags.md)
> and
> [.env.example](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/patterns-react/.env.example)
> for more information

## Props

| Name        | Required | Data Type | Default Value | Description                                                  |
| ----------- | -------- | --------- | ------------- | ------------------------------------------------------------ |
| `title`     | YES      | String    | n/a           | Title of ListSection                                         |
| `copy`      | NO       | String    | null          | Short copy of ListSection                                    |
| `border`    | NO       | Boolean   | false         | Determines whether to render border.                         |
| `listGroup` | NO       | Array     | null          | Array of listGroup objects to render. See `listGroup` below. |

### listGroup

| Name    | Data Type | Description                                         |
| ------- | --------- | --------------------------------------------------- |
| `title` | String    | Title of the List Group.                            |
| `lists` | Array     | Array of list objects to render. See `lists` below. |

### lists

| Name    | Data Type | Description                                                                            |
| ------- | --------- | -------------------------------------------------------------------------------------- |
| `title` | String    | Title of List                                                                          |
| `copy`  | String    | Short copy of List                                                                     |
| `link`  | Object    | Object with the href, text, and target properities of the List link. See `link` below. |

### link

| Name     | Data Type | Description                                                |
| -------- | --------- | ---------------------------------------------------------- |
| `href`   | String    | Url of List link.                                          |
| `text`   | String    | List link text.                                            |
| `target` | String    | Open within current tab or new tab ('\_self' or '\_blank') |

## Stable selectors

| Name                          | Description                    |
| ----------------------------- | ------------------------------ |
| `dds--listsection`            | Pattern                        |
| `dds--listsection-group`      | List section group component   |
| `dds--listsection-item`       | List section item component    |
| `dds--listsection-item__link` | List section item link element |

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our
[Contributing Guide](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/.github/CONTRIBUTING.md)!
👀

## 📝 License

Licensed under the
[Apache 2.0 License](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/LICENSE).
