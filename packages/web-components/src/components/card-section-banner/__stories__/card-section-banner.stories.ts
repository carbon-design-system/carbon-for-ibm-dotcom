/**
 * @license
 *
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import ArrowRight20 from 'carbon-web-components/es/icons/arrow--right/20';
import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';
import '../../content-section/content-section';
import '../../content-section/content-section-heading';
import '../../content-group/content-group-heading';
import '../../link-list/link-list';
import '../../content-group-banner/content-group-banner';
import '../card-section-banner';

export const Default = ({ parameters }) => {
  const { sectionHeading, groupHeading } = parameters?.props?.CardSectionBanner ?? {};
  return html`
    <dds-card-section-banner>
      <dds-content-section-heading>${sectionHeading}</dds-content-section-heading>

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
    </dds-card-section-banner>
  `;
};

export default {
  title: 'Components/Card Section Banner',
  decorators: [
    story => html`
      <div class="bx--grid bx--content-group-story dds-ce-demo-devenv--grid--stretch">
        <div class="bx--row dds-ce-demo-devenv--grid-row">
          <div class="bx--col-sm-4">
            ${story()}
          </div>
        </div>
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    hasGrid: true,
    hasVerticalSpacingInComponent: true,
    knobs: {
      CardSectionBanner: ({ groupId }) => ({
        sectionHeading: textNullable('Section Heading (optional)', 'Section text headline', groupId),
        groupHeading: textNullable(
          'Heading (required)',
          'Accelerate application development efforts with IBM Product Name',
          groupId
        ),
      }),
    },
  },
};
