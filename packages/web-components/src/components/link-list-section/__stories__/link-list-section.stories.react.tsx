/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20.js';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import DDSLinkListSection from '@carbon/ibmdotcom-web-components/es/components-react/link-list-section/link-list-section';
// @ts-ignore
import DDSLinkList from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list';
// @ts-ignore
import DDSLinkListHeading from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list-heading';
// @ts-ignore
import DDSLinkListItem from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list-item';

import readme from './README.stories.react.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';

export const Default = ({ parameters }) => {
  const { heading } = parameters?.props?.LinkListSection ?? {};
  return (
    <DDSLinkListSection>
      <DDSLinkListHeading>{heading}</DDSLinkListHeading>
      <DDSLinkList>
        <DDSLinkListItem href="https://example.com">
          Learn more about Kubernetes and automating deployment <ArrowRight20 slot="icon" />
        </DDSLinkListItem>
        <DDSLinkListItem href="https://example.com">
          Containerization A Complete Guide <ArrowRight20 slot="icon" />
        </DDSLinkListItem>
        <DDSLinkListItem href="https://example.com">
          Microservices and containers <ArrowRight20 slot="icon" />
        </DDSLinkListItem>
        <DDSLinkListItem href="https://example.com">
          Learn more about Kubernetes <ArrowRight20 slot="icon" />
        </DDSLinkListItem>
        <DDSLinkListItem href="https://example.com">
          Containerization A Complete Guide <ArrowRight20 slot="icon" />
        </DDSLinkListItem>
        <DDSLinkListItem href="https://example.com">
          Microservices and containers <ArrowRight20 slot="icon" />
        </DDSLinkListItem>
      </DDSLinkList>
    </DDSLinkListSection>
  );
};

export default {
  title: 'Components/Link list section',
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
    knobs: {
      LinkListSection: ({ groupId }) => {
        const heading = textNullable('Link list section heading:', 'Lorem ipsum dolor sit amet', groupId);
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
