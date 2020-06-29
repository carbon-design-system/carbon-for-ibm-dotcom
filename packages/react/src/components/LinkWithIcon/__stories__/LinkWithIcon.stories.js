/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ArrowLeft20 from '@carbon/icons-react/es/arrow--left/20';
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20';
import { boolean } from '@storybook/addon-knobs';
import LinkWithIcon from '../LinkWithIcon';
import React from 'react';
import readme from '../README.stories.mdx';

export default {
  title: 'Components|LinkwithIcon',

  parameters: {
    ...readme.parameters,
    knobs: {
      LinkWithIcon: ({ groupId }) => ({
        disabled: boolean('Disabled (disabled):', false, groupId),
        iconOnLeft: boolean(
          'Icon to left of link (iconOnLeft):',
          false,
          groupId
        ),
        inverse: boolean('Inverse (inverse):', false, groupId),
        visited: boolean('Allow visited styles (visited):', false, groupId),
      }),
    },
  },
};

export const Default = ({ parameters }) => {
  const { disabled, iconOnLeft, inverse, visited } =
    parameters?.props?.LinkWithIcon ?? {};
  return (
    <div
      style={{
        padding: 2 + `rem`,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      }}>
      <LinkWithIcon
        href="https://www.example.com"
        inverse={inverse}
        {...(disabled && { disabled })}
        {...(iconOnLeft && { iconOnLeft })}
        {...(visited && { visited })}>
        <span>Link text</span>
        {iconOnLeft ? <ArrowLeft20 /> : <ArrowRight20 />}
      </LinkWithIcon>
    </div>
  );
};
