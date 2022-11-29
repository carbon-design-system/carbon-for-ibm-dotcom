/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
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
import '@carbon/carbon-web-components/es/components/tag/tag.js';
import readme from './README.stories.react.mdx';

const tagTitles = [
  'Cloud',
  'Blockchain',
  'Supply chain',
  'Watson health',
  'IT Infrastructure',
  'WebSphere',
];

const tagTypeOptions = ['Tag Link', 'Carbon tag'];

export const Default = (args) => {
  const { tagType } = args?.TagGroup ?? {};
  return (
    <DDSTagGroup>
      {tagType === tagTypeOptions[0]
        ? tagTitles.map((title) => (
            <DDSTagLink href={'https://example.com'}>{title}</DDSTagLink>
          ))
        : tagTitles.map((title) => <Tag>{title}</Tag>)}
    </DDSTagGroup>
  );
};

Default.story = {
  parameters: {
    knobs: {
      TagGroup: () => ({
        tagType: select('Tag Type:', tagTypeOptions, 'Tag Link'),
      }),
    },
  },
};

export default {
  title: 'Components/Tag group',
  decorators: [
    (story) => {
      return (
        <div className="bx--grid">
          <div className="bx--row">
            <div className="bx--col-sm-16 bx--col-md-6">{story()}</div>
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
