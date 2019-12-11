# Lead Space Centered

> The Lead Space Centered pattern is to be utilized within IBM.com.

## Getting started

Here's a quick example to get you started.

```scss
// yourapplication.scss
@import '@carbon/type/scss/font-face/mono';
@import '@carbon/type/scss/font-face/sans';
@include carbon--font-face-mono();
@include carbon--font-face-sans();

@import '@carbon/ibmdotcom-styles/scss/patterns/leadspace-centered/leadspace-centered';
```

> 💡 Only import fonts once per usage

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { LeadSpaceCentered } from '@carbon/ibmdotcom-patterns-react';
import 'yourapplication.scss';

function App() {
  return <LeadSpaceCentered title="title" />;
}
ReactDOM.render(<App />, document.querySelector('#app'));
```

> 💡 Don't forget to import the leadspace styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

#### Feature Flags

To utilize the following features, set the following variable's to `true` within
your `.env` file or your application build settings.

```
DDS_LEADSPACE_CENTERED=true
```

> See
> [feature-flags.md](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/patterns-react/docs/feature-flags.md)
> and
> [.env.example](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/patterns-react/.env.example)
> for more information

## Props

| Name       | Required | Data Type | Default Value | Description                                                                           |
| ---------- | -------- | --------- | ------------- | ------------------------------------------------------------------------------------- |
| `buttons`  | NO       | Array     | null          | Array of button objects to render (max 2). See `buttons` below.                       |
| `copy`     | NO       | String    | null          | Short copy of LeadSpace.                                                              |
| `gradient` | NO       | Boolean   | false         | Determines whether to render overlay gradient.                                        |
| `image`    | NO       | Object    | null          | Object with different ratio options for corresponding breakpoints. See `image` below. |
| `theme`    | NO       | String    | 'white'       | Color theme of LeadSpace. See `themes` below.                                         |
| `title`    | YES      | String    | n/a           | Title of LeadSpace.                                                                   |

### buttons (optional)

| Name         | Data Type | Description                                                                                                                    |
| ------------ | --------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `link`       | String    | Url of the CTA                                                                                                                 |
| `copy`       | String    | CTA's text                                                                                                                     |
| `renderIcon` | Object    | Provide an optional icon for the CTA from [Carbon's icon library](https://www.carbondesignsystem.com/guidelines/icons/library) |

### image (optional)

| Name      | Data Type | Description                                                 |
| --------- | --------- | ----------------------------------------------------------- |
| `mobile`  | String    | Image with aspect ratio (320 x 370) for mobile breakpoint   |
| `tablet`  | String    | Image with aspect ratio (672 x 400) for tablet breakpoint   |
| `default` | String    | Image with aspect ratio (1056 x 480) for desktop breakpoint |
| `alt`     | String    | Alt description of the image                                |

### themes (optional)

| Name    | Data Type | Description                  |
| ------- | --------- | ---------------------------- |
| `white` | String    | Carbon White theme           |
| `g100`  | String    | Carbon Gray 100 (g100) theme |

## Stable selectors

| Name                                      | Description                          |
| ----------------------------------------- | ------------------------------------ |
| `dds--leadspace--centered`                | Pattern                              |
| `dds--leadspace--centered__desc`          | Leadspace centered short description |
| `dds--leadspace--centered--mobile__image` | Leadspace centered mobile image      |

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our
[Contributing Guide](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/.github/CONTRIBUTING.md)!
👀

## 📝 License

Licensed under the
[Apache 2.0 License](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/LICENSE).
