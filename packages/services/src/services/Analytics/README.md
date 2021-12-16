# AnalyticsAPI

> The Analytics API service sends metric data for various events. IBM uses IBM
> Digital Analytics (Coremetrics) to collect navigation and interaction within
> pages including page views, conversion events, mouse clicks, among other
> events.

## Getting started

Here's a quick example to get you started.

```javascript
import { AnalyticsAPI } from '@carbon/ibmdotcom-services';

function initVideoPlayerTrigger() {
  const data = {
    playerType: 'kaltura',
    title: 'Folgers Coffee',
    currentTime: 1,
    duration: 60,
    playerState: 1,
    videoId: '1_9h94wo6b',
  };

  AnalyticsAPI.videoPlayerStats(data);
}
```

> 💡 Visit the
> [Digital Analytics (Coremetrics) Documentation](https://pages.github.ibm.com/digital-behavior/docs/tms-instrumentation.html)
> for more details on enabling IBM Digital Analytics (Coremetrics).

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our
[Contributing Guide](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/main/.github/CONTRIBUTING.md)!
👀

## 📝 License

Licensed under the
[Apache 2.0 License](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/main/LICENSE).
