# Lightbox Media Viewer

> The LightboxMediaViewer component is to be utilized within IBM.com.

## Getting started

Here's a quick example to get you started.

```scss
// yourapplication.scss
@import '@carbon/type/scss/font-face/mono';
@import '@carbon/type/scss/font-face/sans';
@include carbon--font-face-mono();
@include carbon--font-face-sans();
@import '@carbon/ibmdotcom-styles/scss/components/lightbox-media-viewer/_lightbox-media-viewer.scss';
```

> 💡 Only import font's once per usage

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { LightboxMediaViewer } from '@carbon/ibmdotcom-react';
import 'yourapplication.scss';

function App() {
  return (
    <LightboxMediaViewer
    title='Curabitur malesuada varius mi eu posuere'
    copy='Lorem ipsum dolor sit amet, consectetur adipiscing Aenean et ultricies est.'
    image = {
      defaultSrc: 'https://dummyimage.com/1024x512',
      alt: 'Image alt text',
    }
    open={true}
  />
  );
}
ReactDOM.render(<App />, document.querySelector('#app'));
```

> Don't forget to import the LightboxMediaViewer styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

#### Feature Flags

To utilize the following features, set the following variable's to `true` within
your `.env` file or your application build settings.

```
DDS_LightboxMediaViewer=true
```

> See
> [feature-flags.md](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/patterns-react/docs/feature-flags.md)
> and
> [.env.example](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/patterns-react/.env.example)
> for more information

## Props

| Name    | Required | Data Type | Default Value | Description                                                    |
| ------- | -------- | --------- | ------------- | -------------------------------------------------------------- |
| `title` | NO       | String    | null          | Title text for LightboxMediaViewer image                       |
| `copy`  | NO       | String    | null          | Short description text for LightboxMediaViewer image           |
| `image` | YES      | Object    | null          | See `../Image/README.md` file for more detail                  |
| `open`  | YES      | Boolean   | null          | sets `true | false` whether the LightboxMediaViewer open/close |

> 💡 See uri object structure above in `Getting started` section.

## Stable selectors

| Name                                         | Description |
| -------------------------------------------- | ----------- |
| `dds--Lightbox-media-viewer`                 | Component   |
| `dds--Lightbox-media-viewer__image`          | Interactive |
| `dds--Lightbox-media-viewer__content__title` | Interactive |
| `dds--Lightbox-media-viewer__content__desc`  | Interactive |

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our
[Contributing Guide](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/.github/CONTRIBUTING.md)!
👀

## 📝 License

Licensed under the
[Apache 2.0 License](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/LICENSE).
