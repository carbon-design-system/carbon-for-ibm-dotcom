/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '../../card/card-heading';
import '../feature-card';
import '../feature-card-footer';

import ArrowRight20 from 'carbon-web-components/es/icons/arrow--right/20.js';
import { html } from 'lit-element';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import imgLg1x1 from '../../../../../storybook-images/assets/720/fpo--1x1--720x720--004.jpg';
import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';

export const Default = ({ parameters }) => {
  const { heading, defaultSrc, alt, href } = parameters?.props?.['dds-feature-card'] ?? {};
  return html`
    <dds-feature-card href=${ifNonNull(href || undefined)}>
      <dds-image slot="image" alt="${ifNonNull(alt)}" default-src="${ifNonNull(defaultSrc)}"></dds-image>
      <dds-card-heading>${heading}</dds-card-heading>
      <dds-feature-card-footer>
        ${ArrowRight20({ slot: 'icon' })}
      </dds-feature-card-footer>
    </dds-feature-card>
  `;
};

export default {
  title: 'Components/Feature Card',
  decorators: [
    story => html`
      <div class="dds-ce-demo-devenv--simple-grid dds-ce-demo-devenv--simple-grid--card">
        ${story()}
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    hasGrid: true,
    knobs: {
      'dds-feature-card': () => ({
        heading: textNullable('Card Heading (heading):', 'Explore AI use cases in all industries'),
        defaultSrc: textNullable('Image src (defaultSrc):', imgLg1x1),
        alt: textNullable('Image alt text (alt):', 'Image alt text'),
        href: textNullable('Card Href (href):', 'https://example.com'),
      }),
    },
  },
};
