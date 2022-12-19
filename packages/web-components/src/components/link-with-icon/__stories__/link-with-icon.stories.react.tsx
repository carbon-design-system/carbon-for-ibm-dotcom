/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20.js';
import DDSLinkWithIcon from '@carbon/ibmdotcom-web-components/es/components-react/link-with-icon/link-with-icon';
// @ts-ignore
import { PropTypesRef } from '@carbon/ibmdotcom-web-components/es/components-react/link-with-icon/link-with-icon';
import { ICON_PLACEMENT } from '../link-with-icon';

import readme from './README.stories.react.mdx';

export const Default = (args) => {
  const { disabled, href, iconPlacement } = args ?? {};
  return (
    <DDSLinkWithIcon
      href={href}
      disabled={disabled || undefined}
      iconPlacement={iconPlacement}>
      {args['link-text']}
      <ArrowRight20 slot="icon" />
    </DDSLinkWithIcon>
  );
};

const placementTypes = {
  [`${ICON_PLACEMENT.LEFT}`]: ICON_PLACEMENT.LEFT,
  [`${ICON_PLACEMENT.RIGHT}`]: ICON_PLACEMENT.RIGHT,
};

export default {
  title: 'Components/Link with icon',
  component: PropTypesRef,
  decorators: [(story) => <div className="bx--grid">{story()}</div>],
  argTypes: {
    'link-text': {
      control: 'text',
      defaultValue: 'Link text',
    },
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
    href: {
      control: 'text',
      defaultValue:
        'https://github.com/carbon-design-system/carbon-for-ibm-dotcom',
    },
    iconPlacement: {
      control: { type: 'select' },
      options: placementTypes,
      defaultValue: placementTypes[`${ICON_PLACEMENT.RIGHT}`],
    },
    iconInline: {
      table: {
        disable: true,
      },
    },
    size: {
      table: {
        disable: true,
      },
    },
    styles: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
  },
};
