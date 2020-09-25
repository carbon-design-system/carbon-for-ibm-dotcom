/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import { boolean } from '@storybook/addon-knobs';
import textNullable from '../../../../.storybook/knob-text-nullable';
import '../image-with-caption';
import readme from './README.stories.mdx';

export const Default = ({ parameters }) => {
  const { image, heading, copy, lightbox } = parameters?.props?.['dds-image-with-caption'] ?? {};
  return html`
    <dds-image-with-caption .image=${image} heading="${heading}" copy="${copy}" ?lightbox="${lightbox}" />
  `;
};

export default {
  title: 'Components/ImageWithCaption',
  parameters: {
    ...readme.parameters,
    knobs: {
      'dds-image-with-caption': ({ groupId }) => ({
        image: {
          alt: textNullable('Alt text', 'Image alt text', groupId),
          defaultSrc: textNullable('Default image', 'https://dummyimage.com/672x336/ee5396/161616&text=2x1', groupId),
        },
        lightbox: boolean('Lightbox', true, groupId),
        copy: textNullable('Copy', 'Lorem ipsum dolor sit amet', groupId),
        heading: textNullable('Heading', 'This is a heading', groupId),
      }),
    },
  },
};
