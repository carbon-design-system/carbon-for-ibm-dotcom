/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import { select } from '@storybook/addon-knobs';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
/* eslint-disable max-len */
// @ts-ignore
import DDSContentItemHorizontal from '@carbon/ibmdotcom-web-components/es/components-react/content-item-horizontal/content-item-horizontal';
/* eslint-disable max-len */
// @ts-ignore
import DDSContentItemHorizontalCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-item-horizontal/content-item-horizontal-copy';
/* eslint-disable max-len */
// @ts-ignore
import DDSContentItemHorizontalEyebrow from '@carbon/ibmdotcom-web-components/es/components-react/content-item-horizontal/content-item-horizontal-eyebrow';
/* eslint-disable max-len */
// @ts-ignore
import DDSContentItemHorizontalMedia from '@carbon/ibmdotcom-web-components/es/components-react/content-item-horizontal/content-item-horizontal-media';
/* eslint-disable max-len */
// @ts-ignore
import DDSContentItemHorizontalMediaFeatured from '@carbon/ibmdotcom-web-components/es/components-react/content-item-horizontal/content-item-horizontal-media-featured';
/* eslint-disable max-len */
// @ts-ignore
import DDSContentItemHorizontalMediaCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-item-horizontal/content-item-horizontal-media-copy';
/* eslint-disable max-len */
// @ts-ignore
import DDSContentItemHorizontalMediaVideo from '@carbon/ibmdotcom-web-components/es/components-react/content-item-horizontal/content-item-horizontal-media-video';
/* eslint-disable max-len */
// @ts-ignore
import DDSContentItemHorizontalThumbnailCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-item-horizontal/content-item-horizontal-thumbnail-copy';
// @ts-ignore
import DDSContentItemHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-heading';
// @ts-ignore
import DDSTextCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/text-cta';
// @ts-ignore
import DDSImage from '@carbon/ibmdotcom-web-components/es/components-react/image/image';

import { MEDIA_ALIGN, MEDIA_TYPE } from '../defs';
import readme from './README.stories.react.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';
import imgMd4x3 from '../../../../../storybook-images/assets/480/fpo--4x3--480x360--004.jpg';
import imgLg16x9 from '../../../../../storybook-images/assets/720/fpo--16x9--720x405--001.jpg';

const mediaAlign = {
  [`Left`]: MEDIA_ALIGN.LEFT,
  [`Right`]: MEDIA_ALIGN.RIGHT,
};

const mediaType = {
  [`Image`]: MEDIA_TYPE.IMAGE,
  [`Video`]: MEDIA_TYPE.VIDEO,
};

const bodyCopy = `Lorem ipsum *dolor* sit amet, [consectetur adipiscing](https://www.ibm.com) elit.
Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.
Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Aenean et ultricies est.
`;

const shortBodyCopy = `Lorem ipsum *dolor* sit amet, [consectetur adipiscing](https://www.ibm.com) elit.
Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.`;

const bodyCopyWithFeaturedMedia = `Lorem ipsum *dolor* sit amet, [consectetur adipiscing](https://www.ibm.com) elit.
Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
id est laborum.`;

export const Default = args => {
  const { eyebrow, heading, copy, withMedia } = args?.ContentItemHorizontal ?? {};

  return (
    <DDSContentItemHorizontal>
      <DDSContentItemHorizontalEyebrow>{eyebrow}</DDSContentItemHorizontalEyebrow>
      <DDSContentItemHeading>{heading}</DDSContentItemHeading>
      <DDSContentItemHorizontalCopy>{copy}</DDSContentItemHorizontalCopy>
      <DDSTextCTA slot="footer" href="https://www.ibm.com" cta-type="local">
        Learn more
      </DDSTextCTA>
      {withMedia === MEDIA_TYPE.IMAGE ? <DDSImage slot="media" alt="image alt text" default-src={imgLg16x9}></DDSImage> : ''}
      {withMedia === MEDIA_TYPE.VIDEO ? (
        <DDSContentItemHorizontalMediaVideo video-id="1_9h94wo6b"></DDSContentItemHorizontalMediaVideo>
      ) : (
        ''
      )}
    </DDSContentItemHorizontal>
  );
};

Default.story = {
  parameters: {
    gridContentClasses: 'bx--col-lg-12 bx--no-gutter',
    knobs: {
      ContentItemHorizontal: () => ({
        eyebrow: textNullable('Eyebrow (eyebrow):', 'Lorem ipsum'),
        heading: textNullable('Heading (heading):', 'Aliquam condimentum'),
        withMedia: select('Media type', { ...mediaType, None: null }, null),
        copy: bodyCopy,
      }),
    },
  },
};

export const withThumbnail = args => {
  const { alt, heading, copy } = args?.ContentItemHorizontal ?? {};
  return (
    <DDSContentItemHorizontal thumbnail>
      <DDSContentItemHeading>{heading}</DDSContentItemHeading>
      <DDSContentItemHorizontalThumbnailCopy>{copy}</DDSContentItemHorizontalThumbnailCopy>
      <DDSTextCTA slot="footer" href="https://www.ibm.com" cta-type="local">
        Learn more
      </DDSTextCTA>
      <DDSImage slot="thumbnail" alt={alt || undefined} default-src={imgMd4x3}></DDSImage>
    </DDSContentItemHorizontal>
  );
};

withThumbnail.story = {
  name: 'With thumbnail',
  parameters: {
    gridContentClasses: 'bx--col-lg-12 bx--no-gutter',
    knobs: {
      ContentItemHorizontal: () => ({
        heading: textNullable('Heading (heading):', 'Aliquam condimentum'),
        copy: shortBodyCopy,
        alt: textNullable('Image alt text', 'Image alt text'),
      }),
    },
  },
};

export const withMedia = args => {
  const { align, type, alt, heading, eyebrow, copy } = args?.ContentItemHorizontal ?? {};
  return (
    <DDSContentItemHorizontalMedia align={align}>
      {type === MEDIA_TYPE.IMAGE ? <DDSImage slot="media" alt={alt || undefined} default-src={imgLg16x9}></DDSImage> : ''}
      {type === MEDIA_TYPE.VIDEO ? (
        <DDSContentItemHorizontalMediaVideo video-id="1_9h94wo6b"></DDSContentItemHorizontalMediaVideo>
      ) : (
        ''
      )}
      <DDSContentItemHorizontalEyebrow>{eyebrow}</DDSContentItemHorizontalEyebrow>
      <DDSContentItemHeading>{heading}</DDSContentItemHeading>
      <DDSContentItemHorizontalMediaCopy>{copy}</DDSContentItemHorizontalMediaCopy>
      <DDSTextCTA slot="footer" href="https://www.ibm.com" cta-type="local">
        Learn more
      </DDSTextCTA>
    </DDSContentItemHorizontalMedia>
  );
};

withMedia.story = {
  name: 'With media',
  parameters: {
    gridContentClasses: 'bx--col-lg-12 bx--no-gutter',
    knobs: {
      ContentItemHorizontal: () => ({
        align: select('Alignment', mediaAlign, MEDIA_ALIGN.RIGHT),
        type: select('Media type', mediaType, MEDIA_TYPE.IMAGE),
        alt: textNullable('Image alt text', 'Image alt text'),
        heading: textNullable('Heading (heading):', 'Aliquam condimentum'),
        eyebrow: textNullable('Eyebrow label:', 'Lorem Ipsum'),
        copy: shortBodyCopy,
      }),
    },
  },
};

export const withFeaturedMedia = args => {
  const { type, heading, eyebrow, copy } = args?.ContentItemHorizontal ?? {};
  return (
    <DDSContentItemHorizontalMediaFeatured>
      {type === MEDIA_TYPE.IMAGE ? (
        <DDSImage slot="media" alt="Image alt text" default-src={imgLg16x9} heading="Lorem ipsum dolor sit amet"></DDSImage>
      ) : (
        ''
      )}
      {type === MEDIA_TYPE.VIDEO ? (
        <DDSContentItemHorizontalMediaVideo video-id="1_9h94wo6b"></DDSContentItemHorizontalMediaVideo>
      ) : (
        ''
      )}
      <DDSContentItemHorizontalEyebrow>{eyebrow}</DDSContentItemHorizontalEyebrow>
      <DDSContentItemHeading>{heading}</DDSContentItemHeading>
      <DDSContentItemHorizontalMediaCopy>{copy}</DDSContentItemHorizontalMediaCopy>
      <DDSTextCTA slot="footer" href="https://www.ibm.com" cta-type="local">
        Learn more
      </DDSTextCTA>
    </DDSContentItemHorizontalMediaFeatured>
  );
};

withFeaturedMedia.story = {
  name: 'With featured media',
  parameters: {
    gridContentClasses: 'bx--col-lg-12',
    knobs: {
      ContentItemHorizontal: () => ({
        type: select('Media type', mediaType, MEDIA_TYPE.IMAGE),
        eyebrow: textNullable('Eyebrow:', 'Lorem Ipsum'),
        heading: textNullable('Heading:', 'Aliquam condimentum'),
        copy: bodyCopyWithFeaturedMedia,
      }),
    },
  },
};

export default {
  title: 'Components/Content item horizontal',
  decorators: [
    (story, { parameters }) => {
      return (
        <div className="bx--grid">
          <div className="bx--row">
            <div className={parameters.gridContentClasses}>{story()}</div>
          </div>
        </div>
      );
    },
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
  },
};
