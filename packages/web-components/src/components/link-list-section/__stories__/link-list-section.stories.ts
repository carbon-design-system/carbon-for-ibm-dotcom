/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import '../index';
import textNullable from '../../../../.storybook/knob-text-nullable';
import readme from './README.stories.mdx';

export const Default = (args) => {
  const { heading } = args?.LinkListSection ?? {};
  return html`
    <dds-link-list-section>
      <dds-link-list-heading>${heading}</dds-link-list-heading>
      <dds-link-list>
        <dds-link-list-item href="https://example.com" cta-type="local">
          Learn more about Kubernetes and automating deployment
        </dds-link-list-item>
        <dds-link-list-item href="https://example.com" cta-type="local">
          Containerization A Complete Guide
        </dds-link-list-item>
        <dds-link-list-item href="https://example.com" cta-type="local">
          Microservices and containers
        </dds-link-list-item>
        <dds-link-list-item href="https://example.com" cta-type="local">
          Learn more about Kubernetes
        </dds-link-list-item>
        <dds-link-list-item href="https://example.com" cta-type="local">
          Containerization A Complete Guide
        </dds-link-list-item>
        <dds-link-list-item href="https://example.com" cta-type="local">
          Microservices and containers
        </dds-link-list-item>
      </dds-link-list>
    </dds-link-list-section>
  `;
};

export default {
  title: 'Components/Link list section',
  decorators: [
    (story) => {
      return html` <div>${story()}</div> `;
    },
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
    knobs: {
      LinkListSection: () => {
        const heading = textNullable(
          'Link list section heading:',
          'Lorem ipsum dolor sit amet'
        );
        return {
          heading,
        };
      },
    },
    propsSet: {
      default: {
        LinkListSection: {
          heading: 'Lorem ipsum dolor sit amet',
        },
      },
    },
  },
};
