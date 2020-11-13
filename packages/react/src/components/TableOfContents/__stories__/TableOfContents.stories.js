/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { text, boolean } from '@storybook/addon-knobs';
import DataContent from './data/DataContent';
import Image from '../../Image/Image';
import React from 'react';
import readme from '../README.stories.mdx';
import styles from './TableOfContents.stories.scss';
import TableOfContents from '../TableOfContents';

const sources = [
  {
    src:
      'https://fpoimg.com/672x200?text=Example%20Logo&bg_color=ee5396&text_color=161616',
    breakpoint: 400,
  },
  {
    src:
      'https://fpoimg.com/672x200?text=Example%20Logo&bg_color=ee5396&text_color=161616',
    breakpoint: 672,
  },
  {
    src:
      'https://fpoimg.com/672x672?text=1:1&bg_color=ee5396&text_color=161616&text=Example%20Children',
    breakpoint: 1056,
  },
];

const defaultSrc =
  'https://fpoimg.com/672x672?text=1:1&bg_color=ee5396&text_color=161616';
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
