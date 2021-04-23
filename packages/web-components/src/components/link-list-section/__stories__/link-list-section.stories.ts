/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import ArrowRight20 from 'carbon-web-components/es/icons/arrow--right/20.js';
import '../link-list-section';
import '../../content-section/content-section-heading';
import '../../link-list/link-list';
import '../../link-list/link-list-item';
import textNullable from '../../../../.storybook/knob-text-nullable';
import readme from './README.stories.mdx';

export const Default = ({ parameters }) => {
  const { heading } = parameters?.props?.LinkListSection ?? {};
  return html`
    <dds-link-list-section>
      <dds-link-list-heading>${heading}</dds-link-list-heading>
      <dds-link-list>
        <dds-link-list-item href="https://example.com">
          Learn more about Kubernetes ${ArrowRight20({ slot: 'icon' })}
        </dds-link-list-item>
        <dds-link-list-item href="https://example.com">
          Containerization A Complete Guide ${ArrowRight20({ slot: 'icon' })}
        </dds-link-list-item>
        <dds-link-list-item href="https://example.com">
          Microservices and containers ${ArrowRight20({ slot: 'icon' })}
        </dds-link-list-item>
        <dds-link-list-item href="https://example.com">
          Learn more about Kubernetes ${ArrowRight20({ slot: 'icon' })}
        </dds-link-list-item>
        <dds-link-list-item href="https://example.com">
          Containerization A Complete Guide ${ArrowRight20({ slot: 'icon' })}
        </dds-link-list-item>
        <dds-link-list-item href="https://example.com">
          Microservices and containers ${ArrowRight20({ slot: 'icon' })}
        </dds-link-list-item>
      </dds-link-list>
    </dds-link-list-section>
  `;
};

export default {
  title: 'Components/Link list section',
  parameters: {
    ...readme.parameters,
    hasGrid: true,
    knobs: {
      LinkListSection: ({ groupId }) => {
        const heading = textNullable('Link list section heading:', 'Lorem ipsum dolor sit amet', groupId);
        return {
          heading,
        };
      },
    },
  },
  decorators: [
    story => {
      return html`
        <div>
          ${story()}
        </div>
      `;
    },
  ],
};
