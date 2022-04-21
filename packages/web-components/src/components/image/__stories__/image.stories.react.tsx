/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { text, select, boolean } from '@storybook/addon-knobs';
import React from 'react';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import DDSImage from '@carbon/ibmdotcom-web-components/es/components-react/image/image';
import DDSImageItem from '@carbon/ibmdotcom-web-components/es/components-react/image/image-item';

import readme from './README.stories.react.mdx';
import imgLg2x1 from '../../../../../storybook-images/assets/720/fpo--2x1--720x360--005.jpg';
import imgLg16x9 from '../../../../../storybook-images/assets/720/fpo--16x9--720x405--005.jpg';
import imgSm2x1 from '../../../../../storybook-images/assets/320/fpo--2x1--320x160--005.jpg';
import imgMd2x1 from '../../../../../storybook-images/assets/480/fpo--2x1--480x240--005.jpg';
import imgSm16x9 from '../../../../../storybook-images/assets/320/fpo--16x9--320x180--005.jpg';
import imgMd16x9 from '../../../../../storybook-images/assets/480/fpo--16x9--480x270--005.jpg';

const images = {
  '2:1': imgLg2x1,
  '16:9': imgLg16x9,
};

const srcsets = {
  '2:1': [imgSm2x1, imgMd2x1, imgLg2x1],
  '16:9': [imgSm16x9, imgMd16x9, imgLg16x9],
};

export const Default = args => {
  const { alt, defaultSrc, border } = args?.Image ?? {};
  // TODO: See if we can fix unwanted `&` to `&amp` conversion upon changing the select knob
  const srcset = srcsets[defaultSrc?.replace(/&amp;/, '&')];
  return (
    <DDSImage alt={alt || undefined} defaultSrc={defaultSrc || undefined} border={border}>
      {!srcset ? (
        undefined
      ) : (
        <>
          <DDSImageItem media="(min-width: 672px)" srcset={srcset[2]} />
          <DDSImageItem media="(min-width: 400px)" srcset={srcset[1]} />
          <DDSImageItem media="(min-width: 320px)" srcset={srcset[0]} />
        </>
      )}
    </DDSImage>
  );
};

Default.story = {
  parameters: {
    knobs: {
      Image: () => ({
        alt: text('Alt text', 'Image alt text'),
        defaultSrc: select('Default image (default-src)', images, imgLg2x1),
        border: boolean('Border', false),
      }),
    },
  },
};

export default {
  title: 'Components/Image',
  decorators: [
    story => {
      return (
        <div className="bx--grid">
          <div className="bx--row">
            <div className="bx--col-sm-4 bx--col-lg-8">{story()}</div>
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
