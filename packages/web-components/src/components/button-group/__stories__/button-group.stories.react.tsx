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
import ArrowDown20 from '@carbon/icons-react/es/arrow--down/20.js';
import Pdf20 from '@carbon/icons-react/es/PDF/20.js';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import DDSButtonGroup, { PropTypesRef } from '@carbon/ibmdotcom-web-components/es/components-react/button-group/button-group';
import DDSButtonGroupItem from '@carbon/ibmdotcom-web-components/es/components-react/button-group/button-group-item';
import readme from './README.stories.react.mdx';

const iconMap = {
  ArrowRight20: <ArrowRight20 slot="icon" />,
  ArrowDown20: <ArrowDown20 slot="icon" />,
  Pdf20: <Pdf20 slot="icon" />,
};

const iconOptions = {
  Default: null,
  'Arrow Right': 'ArrowRight20',
  'Arrow Down': 'ArrowDown20',
  PDF: 'Pdf20',
};

export const Default = args => {
  const { numberOfButtons } = args;

  const buttons = Array.from({
    length: numberOfButtons,
  }).map((_, i) => ({
    href: `https://example.com`,
    copy: `Button ${i + 1}`,
    renderIcon: iconMap[iconOptions.Default ?? 0],
  }));

  return (
    <DDSButtonGroup>
      {buttons.map(elem => (
        <DDSButtonGroupItem href={elem.href}>
          {elem.renderIcon} {elem.copy}
        </DDSButtonGroupItem>
      ))}
    </DDSButtonGroup>
  );
};

Default.story = {
  parameters: {
    propsSet: {
      default: {
        ButtonGroup: {
          buttons: [
            {
              href: 'https://example.com',
              copy: 'Lorem Ipsum',
            },
            {
              href: 'https://example.com',
              copy: 'Lorem Ipsum',
            },
          ],
        },
      },
    },
  },
};

export default {
  title: 'Components/Button group',
  component: PropTypesRef,
  argTypes: {
    numberOfButtons: {
      control: { type: 'number' },
      defaultValue: 2,
    },
  },
  decorators: [
    story => {
      return (
        <div className="bx--grid">
          <div className="bx--row">
            <div className="bx--col-sm-16 bx--col-md-6 bx--col-lg-16">{story()}</div>
          </div>
        </div>
      );
    },
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
  },
};
