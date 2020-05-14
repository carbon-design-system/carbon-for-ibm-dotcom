# Lead Space Block

> The "Lead Space Block" pattern leverages the Content Block as the
> container of this pattern, and allows to select media with link lists 
> followed by a button.

## Getting started

Here's a quick example to get you started.

##### CSS

```css

@import '@carbon/ibmdotcom-styles/scss/patterns/blocks/leadspace-block/index';
```

##### JS

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { LeadSpaceBlock } from '@carbon/ibmdotcom-react';
import 'yourapplication.scss';

function App() {
  const title = 'Continuous delivery';
  
      const heading= text(
        'Heading (required)',
        'Innovate like a startup and scale for the enterprise '
      );
  
      const copy = `Automate your software release process with continuous delivery (CD)—the most 
      critical part of adopting DevOps. Build, test, and deploy code changes quickly, 
      ensuring software is always ready for deployment.`;
  
      const mediaType = select(
        'mediaType (optional)',
        ['image', 'video', 'none'],
        'image'
      );
  
      const video = {
        videoId: '0_uka1msg4',
        showDescription: true,
      };
  
      const image = {
        heading: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        image: {
          sources: [
            {
              src: 'https://dummyimage.com/320x180/ee5396/161616&text=16:9',
              breakpoint: 320,
            },
            {
              src: 'https://dummyimage.com/400x225/ee5396/161616&text=16:9',
              breakpoint: 400,
            },
            {
              src: 'https://dummyimage.com/672x378/ee5396/161616&text=16:9',
              breakpoint: 672,
            },
          ],
          alt: 'Image alt text',
          defaultSrc: 'https://dummyimage.com/672x378/ee5396/161616&text=16:9',
        },
      };
  
      const mediaData = mediaType === 'image' ? image : video;
  
      const linkListProps = {
        heading: text('link list heading:', 'Featured products'),
        items: object('link list items array', [
          {
            type: 'local',
            copy: 'IBM Cloud Continuous Delivery',
            cta: {
              href: 'https://ibm.com',
            },
          },
          {
            type: 'local',
            copy: 'UrbanCode',
            cta: {
              href: 'https://ibm.com',
            },
          },
          {
            type: 'local',
            copy: 'View all products',
            cta: {
              href: 'https://ibm.com',
            },
          },
        ]),
      };

  return (
    <LeadSpaceBlock title={title} 
                    heading={heading}
                    copy={copy}
                    mediaType={mediaType}
                    mediaData={mediaData} 
                    items={linkListProps}
                />
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

## Props

| Name        | Required | Data Type | Description                       |
| ---------   | -------- | --------- | ----------------------------------|
| `title  `   | YES      | String    | heading of the content block.     |
| `heading`   | YES      | String    | subheading of the content block.  |
| `copy`      | YES      | String    | Simple content item.              |
| `mediaType` | NO       | string    | Media Type [image, video or none] |
| `mediaData` | NO       | Object    | Media Data                        |
| `items`     | YES      | Object    | Link list items                   |
| `button`    | NO       | Object    | Button props                       |

### Stable selectors

| Name                             | Description |
| -------------------------------- | ----------- |
| `dds--lead-space-block`          | Pattern     |

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our
[Contributing Guide](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/.github/CONTRIBUTING.md)!
👀

## 📝 License

Licensed under the
[Apache 2.0 License](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/LICENSE).
