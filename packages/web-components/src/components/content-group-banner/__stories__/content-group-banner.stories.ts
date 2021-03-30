/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import ArrowRight20 from 'carbon-web-components/es/icons/arrow--right/20';
import '../../content-group/content-group-heading';
import '../../link-list/link-list';
import '../content-group-banner';
// eslint-disable-next-line sort-imports
import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';

export const Default = ({ parameters }) => {
  const { heading: groupHeading } = parameters?.props?.ContentGroupBanner ?? {};
  return html`
    <dds-content-group-banner>
      <dds-content-group-heading>${groupHeading}</dds-content-group-heading>

      <dds-link-list type="vertical" slot="complementary">
        <dds-link-list-item icon-placement="right" href="https://example.com">
          Learn more about Kubernetes ${ArrowRight20({ slot: 'icon' })}
        </dds-link-list-item>
        <dds-link-list-item icon-placement="right" href="https://example.com">
          Containerization A Complete Guide ${ArrowRight20({ slot: 'icon' })}
        </dds-link-list-item>
      </dds-link-list>
    </dds-content-group-banner>
  `;
};

export default {
  title: 'Components/Content Group Banner',
  decorators: [
    story => html`
      <div class="dds-ce-demo-devenv--simple-grid dds-ce-demo-devenv--simple-grid--content-layout--with-complementary">
        ${story()}
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    hasGrid: true,
    hasVerticalSpacingInComponent: true,
    knobs: {
      ContentGroupBanner: ({ groupId }) => ({
        heading: textNullable('Heading (heading)', 'Accelerate application development efforts with IBM Product Name', groupId),
      }),
    },
  },
};
