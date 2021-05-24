/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
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
import readme from './README.stories.react.mdx';

export const Default = () => {
  return (
    <DDSTabsExtended>
      <DDSTab label="First tab with long text that wraps multiple lines">
        <p>Content for first tab goes here.</p>
      </DDSTab>
      <DDSTab label="Second tab">
        <p>Content for second tab goes here.</p>
      </DDSTab>
      <DDSTab label="Third tab" selected="true">
        <p>Content for third tab goes here.</p>
      </DDSTab>
      <DDSTab label="Fourth tab">
        <p>Content for fourth tab goes here.</p>
      </DDSTab>
      <DDSTab label="Fifth tab" disabled="true">
        <p>Content for fifth tab goes here.</p>
      </DDSTab>
    </DDSTabsExtended>
  );
};

export default {
  title: 'Components/Tabs extended',
  decorators: [
    story => {
      return <>{story()}</>;
    },
  ],
  parameters: {
    ...readme.parameters,
  },
};
