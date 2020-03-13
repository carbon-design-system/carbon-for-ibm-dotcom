# Video Player

> The Video Player component plays embedded videos using the Kaltura video
> platform. It can be used in inline patterns as well as modals. It is always
> the full width of its containing element and maintains an aspect ratio of
> 16:9.

## Getting started

Here's a quick example to get you started.

```scss
// yourapplication.scss
@import '@carbon/type/scss/font-face/mono';
@import '@carbon/type/scss/font-face/sans';
@include carbon--font-face-mono();
@include carbon--font-face-sans();
@import '@carbon/ibmdotcom-styles/scss/components/video-player/_video-player.scss';
```

> 💡 Only import fonts once per usage

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { VideoPlayer } from '@carbon/ibmdotcom-react';
import 'yourapplication.scss';

function App() {
  return <VideoPlayer videoId="your-video-id" showDescription={true} />;
}
ReactDOM.render(<App />, document.querySelector('#app'));
```

> 💡 Don't forget to import the video player styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

## Props

| Name              | Required | Data Type | Default Value | Description                                    |
| ----------------- | -------- | --------- | ------------- | ---------------------------------------------- |
| `videoId`         | YES      | String    | n/a           | Video ID from Kaltura video platform.          |
| `showDescription` | NO       | Boolean   | `true`        | Determines whether to show description or not. |

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
