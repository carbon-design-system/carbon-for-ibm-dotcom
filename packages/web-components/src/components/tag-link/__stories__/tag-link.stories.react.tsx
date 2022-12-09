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
import DDSTagLink, { PropTypesRef } from '@carbon/ibmdotcom-web-components/es/components-react/tag-link/tag-link';
import readme from './README.stories.react.mdx';

export const Default = args => {
  const { copy, href } = args ?? {};
  return <DDSTagLink href={href || undefined}>{copy}</DDSTagLink>;
};

export default {
  title: 'Components/Tag link',
  component: PropTypesRef,
  decorators: [
    story => {
      return <div className="bx--grid">{story()}</div>;
    },
  ],
  argTypes: {
    href: {
      control: 'text',
      defaultValue: 'https://example.com',
    },
    copy: {
      control: 'text',
      defaultValue: 'Brand: Watson',
    },
    hreflang: {
      table: {
        disable: true,
      },
    },
    ping: {
      table: {
        disable: true,
      },
    },
    rel: {
      table: {
        disable: true,
      },
    },
    target: {
      table: {
        disable: true,
      },
    },
    linkRole: {
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
