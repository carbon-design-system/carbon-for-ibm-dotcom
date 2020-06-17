/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { boolean, select } from '@storybook/addon-knobs';
import LinkWithIcon from '../LinkWithIcon';
import React from 'react';
import readme from '../README.stories.mdx';

const iconDirection = ['right', 'left'];
const iconType = ['', 'jump', 'external', 'download', 'video'];

export default {
  title: 'Components|Link with Icon',

  parameters: {
    ...readme.parameters,
    knobs: {
      LinkWithIcon: ({ groupId }) => ({
        disabled: boolean('Disabled', false, groupId),
        copy: 'Link text',
        type: select('icon type', iconType, iconType[0], groupId),
        direction: select('style', iconDirection, iconDirection[0], groupId),
        visited: boolean('visited styles', false, groupId),
      }),
    },
  },
};

export const Default = ({ parameters }) => {
  const { copy, direction, disabled, icon, type, visited } =
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
        disabled={disabled}
        copy={copy}
        type={type}
        icon={icon}
        direction={direction}
        visited={visited}
      />
    </div>
  );
};
