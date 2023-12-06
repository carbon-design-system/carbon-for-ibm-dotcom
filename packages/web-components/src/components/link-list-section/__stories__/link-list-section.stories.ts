/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import ArrowRight20 from '../../../internal/vendor/@carbon/web-components/icons/arrow--right/20';
import '../index';
import textNullable from '../../../../.storybook/knob-text-nullable';
import readme from './README.stories.mdx';

export const Default = (args) => {
  const { heading } = args?.LinkListSection ?? {};
  return html`
    <c4d-link-list-section>
      <c4d-link-list-heading>${heading}</c4d-link-list-heading>
      <c4d-link-list>
        <c4d-link-list-item href="https://example.com">
          Learn more about Kubernetes and automating deployment
          ${ArrowRight20({ slot: 'icon' })}
        </c4d-link-list-item>
        <c4d-link-list-item href="https://example.com">
          Containerization A Complete Guide ${ArrowRight20({ slot: 'icon' })}
        </c4d-link-list-item>
        <c4d-link-list-item href="https://example.com">
          Microservices and containers ${ArrowRight20({ slot: 'icon' })}
        </c4d-link-list-item>
        <c4d-link-list-item href="https://example.com">
          Learn more about Kubernetes ${ArrowRight20({ slot: 'icon' })}
        </c4d-link-list-item>
        <c4d-link-list-item href="https://example.com">
          Containerization A Complete Guide ${ArrowRight20({ slot: 'icon' })}
        </c4d-link-list-item>
        <c4d-link-list-item href="https://example.com">
          Microservices and containers ${ArrowRight20({ slot: 'icon' })}
        </c4d-link-list-item>
      </c4d-link-list>
    </c4d-link-list-section>
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
