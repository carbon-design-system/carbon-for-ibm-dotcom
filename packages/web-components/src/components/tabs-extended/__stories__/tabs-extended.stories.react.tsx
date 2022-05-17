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
import DDSTabsExtended from '@carbon/ibmdotcom-web-components/es/components-react/tabs-extended/tabs-extended';
import DDSTab from '@carbon/ibmdotcom-web-components/es/components-react/tabs-extended/tab';
import { select } from '@storybook/addon-knobs';
import readme from './README.stories.react.mdx';
import { ORIENTATION } from '../defs';

const orientationType = {
  [`horizontal`]: ORIENTATION.HORIZONTAL,
  [`vertical`]: ORIENTATION.VERTICAL,
};

export const Default = ({ parameters }) => {
  const { orientation } = parameters?.props?.TabsExtended ?? {};
  return (
    <DDSTabsExtended orientation={orientation || undefined}>
      <DDSTab
        label="First tab with long text that wraps multiple lines. Lorem ipsum dolor sit amet consectetur adipiscing elit"
        selected={true}>
        <p>Content for first tab goes here.</p>
      </DDSTab>
      <DDSTab label="Second tab">
        <p>Content for second tab goes here.</p>
      </DDSTab>
      <DDSTab label="Third tab">
        <p>Content for third tab goes here.</p>
      </DDSTab>
      <DDSTab label="Fourth tab">
        <p>Content for fourth tab goes here.</p>
      </DDSTab>
      <DDSTab label="Fifth tab" disabled={true}>
        <p>Content for fifth tab goes here.</p>
      </DDSTab>
    </DDSTabsExtended>
  );
};

Default.story = {
  parameters: {
    knobs: {
      TabsExtended: () => ({
        orientation: select('Orientation (orientation):', orientationType, ORIENTATION.HORIZONTAL),
      }),
    },
  },
};

export default {
  title: 'Components/Tabs extended',
  decorators: [
    story => {
      return (
        <div className="bx--grid">
          <div className="bx--row">
            <div className="bx--col-lg-12 bx--no-gutter">{story()}</div>
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
