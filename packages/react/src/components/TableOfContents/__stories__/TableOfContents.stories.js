/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import DataContent from './data/DataContent';
import LinkList from '../../LinkList/LinkList';
import React from 'react';
import readme from '../README.stories.mdx';
import styles from './TableOfContents.stories.scss';
import TableOfContents from '../TableOfContents';

export const Default = ({ parameters }) => {
  const { withHeadingContent } = parameters?.props?.Other ?? {};
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
        menuRule={withHeadingContent}>
        <DataContent />
      </TableOfContents>
    </>
  );
};

export default {
  title: 'Components|Table of contents',
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
    percy: {
      skip: true,
    },
    proxy: true,
  },
};
