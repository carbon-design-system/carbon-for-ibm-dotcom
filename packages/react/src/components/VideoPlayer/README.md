# Video Player

> The Video Player component plays embedded videos using the Kaltura video
> platform. It can be used in inline patterns as well as modals. It is always
> the full width of its containing element and maintains an aspect ratio of
> 16:9.

## Getting started

Here's a quick example to get you started.

##### CSS

```css
// yourapplication.scss
@import '@carbon/type/scss/font-face/mono';
@import '@carbon/type/scss/font-face/sans';
@include carbon--font-face-mono();
@include carbon--font-face-sans();
@import '@carbon/ibmdotcom-styles/scss/components/video-player/_video-player.scss';
```

> 💡 Only import fonts once per usage

##### JS

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { VideoPlayer } from '@carbon/ibmdotcom-react';
import 'yourapplication.scss';

function App() {
  return (
    <VideoPlayer
      inverse={false}
      videoId="your-video-id"
      showDescription={true}
    />
  );
}
ReactDOM.render(<App />, document.querySelector('#app'));
```

Add the following line in your `.env` file at the root of your project.
[See more details](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/styles#usage).

```
  SASS_PATH=node_modules:src
```

> 💡 Don't forget to import the VideoPlayer styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

## Environment Variables

The partner ID and uiconf ID necessary to render videos from the Kaltura can be
set from the `.env` file.

example:

```
KALTURA_PARTNER_ID=243342
KALTURA_UICONF_ID=12905712
```

## Props

| Name              | Required | Data Type | Default Value | Description                                    |
| ----------------- | -------- | --------- | ------------- | ---------------------------------------------- |
| `videoId`         | YES      | String    | n/a           | Video ID from Kaltura video platform.          |
| `showDescription` | NO       | Boolean   | `true`        | Determines whether to show description or not. |
| `inverse`         | NO       | Boolean   | `false`       | Changes theme to inverse/default               |

## Stable selectors

| Name                                   | Description |
| -------------------------------------- | ----------- |
| `dds--video-player--{video-player-id}` | Component   |

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our
[Contributing Guide](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/.github/CONTRIBUTING.md)!
👀

## 📝 License

Licensed under the
[Apache 2.0 License](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/LICENSE).
