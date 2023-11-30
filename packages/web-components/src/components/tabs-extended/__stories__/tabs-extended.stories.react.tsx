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
import C4DTabsExtended from '@carbon/ibmdotcom-web-components/es/components-react/tabs-extended/tabs-extended';
import C4DTab from '@carbon/ibmdotcom-web-components/es/components-react/tabs-extended/tab';
import { select } from '@storybook/addon-knobs';
import readme from './README.stories.react.mdx';
import { ORIENTATION } from '../defs';

const orientationType = {
  [`horizontal`]: ORIENTATION.HORIZONTAL,
  [`vertical`]: ORIENTATION.VERTICAL,
};

export const Default = (args) => {
  const { orientation } = args?.TabsExtended ?? {};
  return (
    <C4DTabsExtended orientation={orientation || undefined}>
      <C4DTab
        label="First tab with long text that wraps multiple lines. Lorem ipsum dolor sit amet consectetur adipiscing elit"
        selected={true}>
        <p>Content for first tab goes here.</p>
      </C4DTab>
      <C4DTab label="Second tab">
        <p>Content for second tab goes here.</p>
      </C4DTab>
      <C4DTab label="Third tab">
        <p>Content for third tab goes here.</p>
      </C4DTab>
      <C4DTab label="Fourth tab">
        <p>Content for fourth tab goes here.</p>
      </C4DTab>
      <C4DTab label="Fifth tab" disabled={true}>
        <p>Content for fifth tab goes here.</p>
      </C4DTab>
    </C4DTabsExtended>
  );
};

Default.story = {
  parameters: {
    knobs: {
      TabsExtended: () => ({
        orientation: select(
          'Orientation (orientation):',
          orientationType,
          ORIENTATION.HORIZONTAL
        ),
      }),
    },
  },
};

export default {
  title: 'Components/Tabs extended',
  decorators: [
    (story) => {
      return (
        <div className="cds--grid">
          <div className="cds--row">
            <div className="cds--col-lg-12 cds--no-gutter">{story()}</div>
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
