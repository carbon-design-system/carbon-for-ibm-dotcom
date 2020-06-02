/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20';
import { boolean } from '@storybook/addon-knobs';
import LinkWithIcon from '../LinkWithIcon';
import React from 'react';
import readme from '../README.stories.mdx';

export default {
  title: 'Components|Link with Icon',

  parameters: {
    ...readme.parameters,
    knobs: {
      LinkWithIcon: ({ groupId }) => ({
        disabled: boolean('Disabled', false, groupId),
      }),
    },
  },
};

export const Default = ({ parameters }) => {
  const { disabled } = parameters?.props?.LinkWithIcon ?? {};
  return (
    <div
      style={{
        padding: 2 + `rem`,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      }}>
      <LinkWithIcon href="https://www.example.com" disabled={disabled}>
        <span>Link text</span>
        <ArrowRight20 />
      </LinkWithIcon>
    </div>
  );
};
