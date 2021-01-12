/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { text, boolean } from '@storybook/addon-knobs';
import DataContent from './data/DataContent';
import Image from '../../Image/Image';
import img720_1x1 from '../../../../../storybook-images/assets/720/fpo--1x1--720x720--004.jpg';
import img720_4x3 from '../../../../../storybook-images/assets/720/fpo--4x3--720x540--004.jpg';
import React from 'react';
import readme from '../README.stories.mdx';
import styles from './TableOfContents.stories.scss';
import TableOfContents from '../TableOfContents';

const sources = [
  {
    src: img720_4x3,
    breakpoint: 400,
  },
  {
    src: img720_4x3,
    breakpoint: 672,
  },
  {
    src: img720_1x1,
    breakpoint: 1056,
  },
];

const defaultSrc = img720_1x1;
const alt = 'Lorem Ipsum';
const longDescription = 'Lorem Ipsum Dolor';

export default {
  title: 'Components|Table of Contents',
  decorators: [
    story => (
      <>
        <style>{styles.cssText}</style>
        {story()}
      </>
    ),
  ],
  parameters: {
    ...readme.parameters,
  },
};

export const ManuallyDefineMenuItems = ({ parameters }) => {
  const { menuItems, menuLabel, menuRule, headingContent } =
    parameters?.props?.TableOfContents ?? {};
  const theme =
    document.documentElement.getAttribute('storybook-carbon-theme') || 'white';
  return (
    <TableOfContents
      theme={theme}
      menuItems={menuItems}
      menuLabel={menuLabel}
      menuRule={menuRule}
      headingContent={headingContent}>
      <DataContent />
    </TableOfContents>
  );
};

ManuallyDefineMenuItems.story = {
  name: 'Manually define Menu Items',
  parameters: {
    knobs: {
      TableOfContents: ({ groupId }) => ({
        menuLabel: text('Menu label (menuLabel)', 'Jump to', groupId),
        menuRule: boolean('Optional Rule (menuRule)', false, groupId),
      }),
    },
  },
};

export const DynamicItems = ({ parameters }) => (
  <ManuallyDefineMenuItems parameters={parameters} />
);

DynamicItems.story = {
  parameters: {
    knobs: {
      TableOfContents: ({ groupId }) => ({
        menuLabel: text('Menu label (menuLabel)', 'Jump to', groupId),
      }),
    },
  },
};

export const WithHeadingContent = ({ parameters }) => (
  <ManuallyDefineMenuItems parameters={parameters} />
);

WithHeadingContent.story = {
  parameters: {
    knobs: {
      TableOfContents: ({ groupId }) => ({
        menuLabel: text('Menu label (menuLabel)', 'Jump to', groupId),
        menuRule: boolean('Optional Rule (menuRule)', false, groupId),
        headingContent: (
          <Image
            sources={sources}
            defaultSrc={defaultSrc}
            alt={alt}
            longDescription={longDescription}
            style={{
              height: '200px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
        ),
      }),
    },
  },
};
