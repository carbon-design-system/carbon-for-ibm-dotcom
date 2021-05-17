/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { select } from '@storybook/addon-knobs';
import React from 'react';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import DDSTagLink from '@carbon/ibmdotcom-web-components/es/components-react/tag-link/tag-link';
// @ts-ignore
import DDSTagGroup from '@carbon/ibmdotcom-web-components/es/components-react/tag-group/tag-group';
import { Tag } from 'carbon-components-react';
import readme from './README.stories.react.mdx';

const tagTitles = ['Cloud', 'Blockchain', 'Supply chain', 'Watson health', 'IT Infrastructure', 'WebSphere'];

const tagTypeOptions = ['Tag Link', 'Carbon tag'];

export const Default = ({ parameters }) => {
  const { tagType } = parameters?.props?.TagGroup ?? {};
  return (
    <DDSTagGroup>
      {tagType === tagTypeOptions[0]
        ? tagTitles.map(title => <DDSTagLink href={'https://example.com'}>{title}</DDSTagLink>)
        : tagTitles.map(title => <Tag>{title}</Tag>)}
    </DDSTagGroup>
  );
};

Default.story = {
  parameters: {
    knobs: {
      TagGroup: ({ groupId }) => ({
        tagType: select('Tag Type:', tagTypeOptions, 'Tag Link', groupId),
      }),
    },
  },
};

export default {
  title: 'Components/Tag group',
  decorators: [
    story => {
      return <>{story()}</>;
    },
  ],
  parameters: {
    ...readme.parameters,
  },
};
