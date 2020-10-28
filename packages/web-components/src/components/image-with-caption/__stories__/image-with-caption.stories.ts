/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import { boolean, select } from '@storybook/addon-knobs';
import textNullable from '../../../../.storybook/knob-text-nullable';
import '../image-with-caption';
import readme from './README.stories.mdx';

const images = {
  '2:1': 'https://dummyimage.com/672x336/ee5396/161616&text=2:1',
  '16:9': 'https://dummyimage.com/672x378/ee5396/161616&text=16:9',
};

const srcsets = {
  'https://dummyimage.com/672x336/ee5396/161616&text=2:1': [
    'https://dummyimage.com/320x160/ee5396/161616&text=2:1',
    'https://dummyimage.com/400x200/ee5396/161616&text=2:1',
    'https://dummyimage.com/672x336/ee5396/161616&text=2:1',
  ],
  'https://dummyimage.com/672x378/ee5396/161616&text=16:9': [
    'https://dummyimage.com/320x180/ee5396/161616&text=16:9',
    'https://dummyimage.com/400x225/ee5396/161616&text=16:9',
    'https://dummyimage.com/672x378/ee5396/161616&text=16:9',
  ],
};

export const Default = ({ parameters }) => {
  const { alt, defaultSrc, heading, copy, lightbox } = parameters?.props?.['dds-image-with-caption'] ?? {};
  // TODO: See if we can fix unwanted `&` to `&amp` conversion upon changing the select knob
  const srcset = srcsets[defaultSrc?.replace(/&amp;/, '&')];
  return html`
    <dds-image-with-caption alt="${alt}" default-src="${defaultSrc}" heading="${heading}" copy="${copy}" ?lightbox="${lightbox}">
      ${!srcset
        ? undefined
        : html`
            <dds-image-item media="(min-width: 672px)" srcset="${srcset[2]}"> </dds-image-item>
            <dds-image-item media="(min-width: 400px)" srcset="${srcset[1]}"> </dds-image-item>
            <dds-image-item media="(min-width: 320px)" srcset="${srcset[0]}"> </dds-image-item>
          `}
    </dds-image-with-caption>
  `;
};

export default {
  title: 'Components/Image With Caption',
  parameters: {
    ...readme.parameters,
    knobs: {
      'dds-image-with-caption': ({ groupId }) => ({
        alt: textNullable('Alt text (alt)', 'Image alt text', groupId),
        defaultSrc: select(
          'Default image (default-src)',
          images,
          'https://dummyimage.com/672x336/ee5396/161616&text=2:1',
          groupId
        ),
        lightbox: boolean('Lightbox (lightbox)', true, groupId),
        copy: textNullable('Copy (copy)', 'Lorem ipsum dolor sit amet', groupId),
        heading: textNullable('Heading (heading)', 'This is a heading', groupId),
      }),
    },
  },
};
