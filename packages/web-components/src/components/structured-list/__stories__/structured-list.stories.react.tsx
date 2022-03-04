/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { text } from '@storybook/addon-knobs';
import React from 'react';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import DDSStructuredList from '@carbon/ibmdotcom-web-components/es/components-react/structured-list/structured-list';
import readme from './README.stories.react.mdx';

export const Default = ({ parameters }) => {
  const { copy } = parameters?.props?.StructuredList ?? {};
  return <DDSStructuredList>${copy}</DDSStructuredList>;
};

Default.story = {
  parameters: {
    knobs: {
      StructuredList: () => ({
        copy: text('Copy', 'Hello world!'),
      }),
    },
  },
};
export default {
  title: 'Components/Structured List',
  decorators: [
    story => {
      return <>{story()}</>;
    },
  ],
  parameters: {
    ...readme.parameters,
  },
};
