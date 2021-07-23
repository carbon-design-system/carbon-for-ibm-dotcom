/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20.js';
import DDSLeadspace from '@carbon/ibmdotcom-web-components/es/components-react/leadspace/leadspace';
import DDSLeadspaceHeading from '@carbon/ibmdotcom-web-components/es/components-react/leadspace/leadspace-heading';
import DDSLeadspaceImage from '@carbon/ibmdotcom-web-components/es/components-react/leadspace/leadspace-image';
import DDSBreadcrumb from '@carbon/ibmdotcom-web-components/es/components-react/breadcrumb/breadcrumb';
import DDSBreadcrumbItem from '@carbon/ibmdotcom-web-components/es/components-react/breadcrumb/breadcrumb-item';
import DDSButtonGroup from '@carbon/ibmdotcom-web-components/es/components-react/button-group/button-group';
import DDSButtonGroupItem from '@carbon/ibmdotcom-web-components/es/components-react/button-group/button-group-item';
import DDSImageItem from '@carbon/ibmdotcom-web-components/es/components-react/image/image';
import DDSTagGroup from '@carbon/ibmdotcom-web-components/es/components-react/tag-group/tag-group';
import DDSTagLink from '@carbon/ibmdotcom-web-components/es/components-react/tag-link/tag-link';
import { text } from '@storybook/addon-knobs';

import leadspaceImg from '../../../../../storybook-images/assets/leadspace/leadspaceMax.jpg';
import { LEADSPACE_SIZE } from '../defs';

import readme from './README.stories.react.mdx';

export const Default = ({ parameters }) => {
  const { copy, title, size } = parameters?.props?.LeadSpace ?? {};
  console.log('params', parameters.props.LeadSpace);
  return (
    <DDSLeadspace size={size}>
      <DDSLeadspaceHeading>{title}</DDSLeadspaceHeading>
      {copy}
      <DDSButtonGroup slot="action">
        <DDSButtonGroupItem href="https://www.ibm.com">
          <ArrowRight20 slot="icon" />
          Button 1
        </DDSButtonGroupItem>
        <DDSButtonGroupItem href="https://www.ibm.com/cloud">
          <ArrowRight20 slot="icon" />
          Button 2
        </DDSButtonGroupItem>
      </DDSButtonGroup>
      <DDSLeadspaceImage slot="image" default-src={leadspaceImg}>
        <DDSImageItem media="(min-width: 672px)" srcset={leadspaceImg}></DDSImageItem>
        <DDSImageItem media="(min-width: 0)" srcset={leadspaceImg}></DDSImageItem>
      </DDSLeadspaceImage>
    </DDSLeadspace>
  );
};

// Default.story = {
//   parameters: {
//     knobs: {
//       Leadspace: ({ groupId }) => ({
//         title: text('title (title):', 'Heading can go on two lines max', groupId),
//         copy: text('copy (copy):', 'Use this area for a short line of copy to support the title', groupId),
//       }),
//     },
//   },
// };

export default {
  title: 'Components/Lead space',
  parameters: {
    ...readme.parameters,
    hasGrid: true,
    decorators: [
      story => {
        return (
          <>
            <div className="bx--grid bx--no-gutter dds-ce-demo-devenv--grid--stretch">{story()}</div>
          </>
        );
      },
    ],
    knobs: {
      Leadspace: ({ groupId }) => ({
        title: text('title (title):', 'Heading can go on two lines max', groupId),
        copy: text('copy (copy):', 'Use this area for a short line of copy to support the title', groupId),
      }),
    },
    props: (() => {
      return {
        Leadspace: {
          size: LEADSPACE_SIZE.MEDIUM,
        },
      };
    })(),
  },
};
