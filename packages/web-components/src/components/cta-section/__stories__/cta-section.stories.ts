/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { select } from '@storybook/addon-knobs';
import ArrowRight20 from 'carbon-web-components/es/icons/arrow--right/20';
import Launch20 from 'carbon-web-components/es/icons/launch/20';
import { html } from 'lit-element';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';
import '../../button-group/button-group-item';
import '../../link-list/link-list';
import '../../link-list/link-list-heading';
import '../../link-list/link-list-item';
import '../../cta-block/cta-block';
import '../cta-section';
import '../../cta-block/cta-block';
import '../../content-item/content-item';
import '../../content-item/content-item-copy';
import '../../content-item/content-item-heading';
import '../../content-block/content-block-heading';
import '../../content-block/content-block-copy';

const iconMap = {
  ArrowRight20: ArrowRight20({ slot: 'icon' }),
  Launch20: Launch20({ slot: 'icon' }),
};

const iconOptions = {
  Default: null,
  'Arrow Right': 'ArrowRight20',
  'External Launch': 'Launch20',
};

export const Default = ({ parameters }) => {
  const { heading, copy, renderIcon } = parameters?.props?.CTASection ?? {};

  return html`
    <dds-cta-section>
      <dds-content-section-heading>Optional title heading-01, color text-01</dds-content-section-heading>
      <dds-cta-block>
        <dds-content-block-heading>${ifNonNull(heading)}</dds-content-block-heading>
        <dds-content-block-copy>${copy}</dds-content-block-copy>
        <dds-text-cta slot="action" cta-type="local" icon-placement="right" href="example.com">Browse tutorials</dds-text-cta>
    </dds-cta-section>
  `;
};

export default {
  title: 'Components/CTA Section',
  decorators: [
    (story, { parameters }) => html`
      <div class="">
        ${story()}
      </div>
    `,
  ],
  parameters: {
    hasGrid: true,
    gridContentClasses: 'dds-ce-demo-devenv--simple-grid--content-layout',
    hasVerticalSpacingInComponent: true,
    knobs: {
      CTASection: ({ groupId }) => ({
        heading: textNullable('Heading (required)', 'Optional title heading-05 color text-01', groupId),
        copy: textNullable(
          'Copy text (copy)',
          'Optional text heading-03 color text-01, Lorem ipsum dolor sit amet, consecteture adipiscing elit sed dose. eiusmode tempor incididunt ut labore et dolore magnae aliqua. Ut enim ad minim veni',
          groupId
        ),
        renderIcon: iconMap[select(`Icon`, iconOptions, iconOptions.Default, groupId) ?? 0],
      }),
    },
    ...readme.parameters,
  },
};
