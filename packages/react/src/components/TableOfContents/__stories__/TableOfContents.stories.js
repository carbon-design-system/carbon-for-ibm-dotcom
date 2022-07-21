/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { boolean, select, text } from '@storybook/addon-knobs';
import DataContent, { headings, LOREM } from './data/DataContent';
import LinkList from '../../LinkList/LinkList';
import React from 'react';
import readme from '../README.stories.mdx';
import styles from './TableOfContents.stories.scss';
import TableOfContents from '../TableOfContents';

const props = {
  default: () => ({
    withHeadingContent: boolean('With heading content', false),
    numberOfItems: Array.from({
      length: select('Number of items', [5, 6, 7, 8], 5),
    }).map((_, i) => ({
      heading: text(`Section ${i + 1} heading`, headings[i % headings.length]),
      copy: text(`Section ${i + 1} copy`, `${LOREM}\n`.repeat(3).trim()),
    })),
  }),
};

export const Default = () => {
  const { withHeadingContent, numberOfItems: menuItems } = props.default();
  const headingItems = [
    {
      type: 'local',
      copy: 'DevOps',
      cta: {
        href: 'https://github.com/carbon-design-system/carbon-web-components',
      },
    },
    {
      type: 'local',
      copy: 'Automation',
      cta: {
        href: 'https://github.com/carbon-design-system/carbon-web-components',
      },
    },
    {
      type: 'local',
      copy: 'Development',
      cta: {
        href: 'https://github.com/carbon-design-system/carbon-web-components',
      },
    },
  ];
  const headingContent = (
    <LinkList style="vertical" iconPlacement="left" items={headingItems} />
  );
  return (
    <>
      <TableOfContents
        headingContent={withHeadingContent && headingContent}
        menuRule={!!headingContent}>
        <DataContent items={menuItems} />
      </TableOfContents>
    </>
  );
};

export default {
  title: 'Components/Table of contents',
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

export const Horizontal = () => (
  <p>
    This component is maintained in{' '}
    <code>@carbon/ibmdotcom-web-components</code> library with a{' '}
    <a
      className="bx--link"
      target="_blank"
      href="https://www.ibm.com/standards/carbon/web-components/react/?path=/story/components-table-of-contents--horizontal">
      React wrapper
    </a>
    .
  </p>
);

Horizontal.story = {
  name: 'Horizontal',
  parameters: {
    ...readme.parameters,
    knobs: null,
    percy: {
      skip: true,
    },
    proxy: true,
  },
};
