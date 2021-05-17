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
// @ts-ignore
import DDSTagGroup from '@carbon/ibmdotcom-web-components/es/components-react/tag-group/tag-group';
import readme from './README.stories.react.mdx';

const tagTitles = ['Cloud', 'Blockchain', 'Supply chain', 'Watson health', 'IT Infrastructure', 'WebSphere'];

export const Default = ({ parameters }) => {
  const { href } = parameters?.props?.TagGroup ?? {};
  return (
    <DDSTagGroup>
      {tagTitles.map(title => (
        <DDSTagLink href={href || undefined}>{title}</DDSTagLink>
      ))}
    </DDSTagGroup>
  );
};

Default.story = {
  parameters: {
    knobs: {
      TagGroup: () => ({
        href: text('Tag link (href)', `https://example.com`),
      }),
    },
  },
};

export default {
  title: 'Components/Tag link',
  decorators: [
    story => {
      return <>{story()}</>;
    },
  ],
  parameters: {
    ...readme.parameters,
  },
};
