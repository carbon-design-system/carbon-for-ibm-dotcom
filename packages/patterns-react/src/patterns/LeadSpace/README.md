# Lead Space

> The Lead Space pattern is to be utilized within IBM.com.

## Getting started

Here's a quick example to get you started.

```scss
// yourapplication.scss
@import '@carbon/type/scss/font-face/mono';
@import '@carbon/type/scss/font-face/sans';
@include carbon--font-face-mono();
@include carbon--font-face-sans();
```

> 💡 Only import font's once per usage

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { LeadSpace } from '@carbon/ibmdotcom-patterns-react';
import 'yourapplication.scss';
import '@carbon/ibmdotcom-styles/scss/patterns/leadspace/index.scss';
function App() {
  return <LeadSpace />;
}
ReactDOM.render(<App />, document.querySelector('#app'));
```

> 💡 Don't forget to import the leadspace styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

#### Feature Flags

To utilize the following features, set the following variable's to `true` within
your `.env` file or your application build settings.

```
DDS_LEADSPACE=true
```

> See
> [feature-flags.md](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/patterns-react/docs/feature-flags.md)
> and
> [.env.example](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/patterns-react/.env.example)
> for more information

## Props

| Name        | Required | Data Type | Default Value | Description                                                                           |
| ----------- | -------- | --------- | ------------- | ------------------------------------------------------------------------------------- |
| `buttons`   | NO       | Array     | null          | Array of button objects to render (max 2). See `buttons` below.                       |
| `copy`      | NO       | String    | null          | Short copy of LeadSpace.                                                              |
| `gradient`  | NO       | Boolean   | false         | Determines whether to render overlay gradient.                                        |
| `image`     | NO       | Object    | null          | Object with different ratio options for corresponding breakpoints. See `image` below. |
| `theme`     | NO       | String    | 'white'       | Color theme of LeadSpace. See `themes` below.                                         |
| `title`     | YES      | String    | n/a           | Title of LeadSpace.                                                                   |
| `variation` | NO       | String    | 'expressive'  | Variation of LeadSpace title. See `variations` below.                                 |

### buttons (optional)

| Name         | Data Type | Description                                                                                                                    |
| ------------ | --------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `link`       | String    | Url of the CTA                                                                                                                 |
| `copy`       | String    | CTA's text                                                                                                                     |
| `renderIcon` | String    | Provide an optional icon for the CTA from [Carbon's icon library](https://www.carbondesignsystem.com/guidelines/icons/library) |

### image (optional)

| Name      | Data Type | Description                                                 |
| --------- | --------- | ----------------------------------------------------------- |
| `mobile`  | String    | Image with aspect ratio (320 x 370) for mobile breakpoint   |
| `tablet`  | String    | Image with aspect ratio (672 x 400) for tablet breakpoint   |
| `default` | String    | Image with aspect ratio (1056 x 480) for desktop breakpoint |
| `alt`     | String    | Alt description of the image                                |

### themes (optional)

| Name    | Data Type | Description           |
| ------- | --------- | --------------------- |
| `white` | String    | Carbon White theme    |
| `g100`  | String    | Carbon Gray 100 theme |

### variations (optional)

| Name                   | Data Type | Description                             |
| ---------------------- | --------- | --------------------------------------- |
| `expressive`/`default` | String    | Expressive style of the leadspace title |
| `productive`           | String    | Productive style of the leadspace title |

## Stable selectors

| Name                    | Description                |
| ----------------------- | -------------------------- |
| `dds--leadspace`        | Pattern                    |
| `dds--leadspace__image` | LeadSpace background image |
| `dds--leadspace__cta`   | LeadSpace CTAs             |

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our
[Contributing Guide](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/.github/CONTRIBUTING.md)!
👀

## 📝 License

Licensed under the
[Apache 2.0 License](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/LICENSE).
