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
import DDSTagLink from '@carbon/ibmdotcom-web-components/es/components-react/tag-link/tag-link';
import readme from './README.stories.react.mdx';

export const Default = ({ parameters }) => {
  const { copy, href } = parameters?.props?.TagLink ?? {};
  return <DDSTagLink href={href || undefined}>{copy}</DDSTagLink>;
};

Default.story = {
  parameters: {
    knobs: {
      TagLink: () => ({
        copy: text('Tag link (copy)', 'Brand: Watson'),
        href: text('Tag link (href)', `https://example.com`),
      }),
    },
  },
};

export default {
  title: 'Components/Tag link',
  decorators: [
    story => {
      return <div className="bx--grid">{story()}</div>;
    },
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
  },
};
