# Lightbox

> The Lightbox component is to be utilized within IBM.com.

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
import { LightBox } from '@carbon/ibmdotcom-react';
import '@carbon/ibmdotcom-styles/scss/components/lightbox/_lightbox.scss';
import 'yourapplication.scss';

function App() {
  return;
  <LightBox
    title='Curabitur malesuada varius mi eu posuere'
    copy='Lorem ipsum dolor sit amet, consectetur adipiscing Aenean et ultricies est.'
    image={
        uri: {
          sm: 'https://via.placeholder.com/640x320',
          md: 'https://via.placeholder.com/768x384',
          lg: 'https://via.placeholder.com/1024x512',
        },
        alt: 'Placeholder Image',
      }
    open={true}
    onClose={() => alert('<<< model closed >>>')}
  />;
}
ReactDOM.render(<App />, document.querySelector('#app'));
```

> Don't forget to import the Lightbox styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

#### Feature Flags

To utilize the following features, set the following variable's to `true` within
your `.env` file or your application build settings.

```
DDS_LIGHTBOX=true
```

> See
> [feature-flags.md](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/patterns-react/docs/feature-flags.md)
> and
> [.env.example](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/patterns-react/.env.example)
> for more information

## Props

| Name      | Required | Data Type | Default Value | Description                                             |
| --------- | -------- | --------- | ------------- | ------------------------------------------------------- |
| `title`   | NO       | String    | null          | Title text for lightbox image                           |
| `copy`    | NO       | String    | null          | Short description text for lightbox image               |
| `image`   | YES      | Object    | null          | Image object for lightbox. see `Image` below for detail |
| `open`    | YES      | Boolean   | null          | sets `true | false` whether the lightbox is open/close  |
| `onClose` | NO       | Function  | null          | Run the function to do something on close               |

### Image

| Name  | Data Type | Description                 |
| ----- | --------- | --------------------------- |
| `uri` | object    | Urls for images             |
| `alt` | String    | Alternative text for images |

> 💡 uri is valid if minimum one url is provided for sm, md or, lg in uri
> object. 💡 See uri object structure above in `Getting started` section.

## Stable selectors

| Name                            | Description |
| ------------------------------- | ----------- |
| `dds--lightbox`                 | Component   |
| `dds--lightbox__image`          | Interactive |
| `dds--lightbox__content__title` | Interactive |
| `dds--lightbox__content__desc`  | Interactive |

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our
[Contributing Guide](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/.github/CONTRIBUTING.md)!
👀

## 📝 License

Licensed under the
[Apache 2.0 License](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/LICENSE).
