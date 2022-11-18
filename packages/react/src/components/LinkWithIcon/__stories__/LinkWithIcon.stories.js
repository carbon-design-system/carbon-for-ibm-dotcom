/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { boolean, select } from '@storybook/addon-knobs';
import ArrowLeft20 from '@carbon/icons-react/es/arrow--left/20';
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20';
import LinkWithIcon from '../LinkWithIcon';
import React from 'react';
import readme from '../README.stories.mdx';

const iconPlacement = ['left', 'right'];

export default {
  title: 'Components/Link with icon',
  parameters: {
    ...readme.parameters,
    percy: {
      name: 'Components|Link with icon: Default',
    },
  },
};

const props = () => ({
  disabled: boolean('Disabled (disabled):', false),
  iconPlacement: select(
    'Icon placement (iconPlacement):',
    iconPlacement,
    iconPlacement[1]
  ),
  visited: boolean('Allow visited styles (visited):', false),
});

export const Default = () => {
  return (
    <div
      style={{
        padding: 2 + `rem`,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <LinkWithIcon href="https://www.example.com" {...props()}>
        <span>Link text</span>
        {iconPlacement === 'left' ? <ArrowLeft20 /> : <ArrowRight20 />}
      </LinkWithIcon>
    </div>
  );
};
