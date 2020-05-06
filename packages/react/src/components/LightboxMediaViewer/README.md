# Lightbox Media Viewer

> The LightboxMediaViewer component is to be utilized within IBM.com.

## Getting started

Here's a quick example to get you started.

##### CSS

```css
// yourapplication.scss
@import '@carbon/type/scss/font-face/mono';
@import '@carbon/type/scss/font-face/sans';
@include carbon--font-face-mono();
@include carbon--font-face-sans();
@import '@carbon/ibmdotcom-styles/scss/components/lightbox-media-viewer/_lightbox-media-viewer.scss';
```

> 💡 Only import fonts once per usage. Don't forget to import the
> LightBoxMediaViewer styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

##### JS

##### Image Media

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
    media={
      src: select('Image', images, images['1280 x 720 (16:9)']),
      alt: 'Image alt text',
      title: text(
        'title (required)',
        'Curabitur malesuada varius mi eu posuere'
      ),
      description: text(
        'description (required)',
        `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est.Mauris iaculis eget dolor nec hendrerit.`
      ),
      type: 'image',
    }
    open={true}
  />
  );
}
ReactDOM.render(<App />, document.querySelector('#app'));
```

##### Video Media

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
    media={
      src: '0_uka1msg4',
      type: 'video',
    }
    open={true}
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

> Don't forget to import the LightboxMediaViewer styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

## Props

| Name    | Required | Data Type | Default Value | Description                                                    |
| ------- | -------- | --------- | ------------- | -------------------------------------------------------------- |
| `title` | NO       | String    | null          | Title text for LightboxMediaViewer image                       |
| `copy`  | NO       | String    | null          | Short description text for LightboxMediaViewer image           |
| `media` | YES      | Object    | null          | Object containing media info. See `media` below                |
| `open`  | YES      | Boolean   | null          | sets `true | false` whether the LightboxMediaViewer open/close |

> 💡 See uri object structure above in `Getting started` section.

## media

| Name          | Data Type | Description                                                           |
| ------------- | --------- | --------------------------------------------------------------------- |
| `type`        | String    | Determines whether to render `image` or `video`                       |
| `src`         | String    | Image link or video id                                                |
| `alt`         | String    | Alternate text for image. For video, this is generated from api call. |
| `title`       | String    | Title copy. For video, this is generated from api call.               |
| `description` | String    | Description copy. For video, this is generated from api call.         |

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
