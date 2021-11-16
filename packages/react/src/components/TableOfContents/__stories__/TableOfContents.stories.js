/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import DataContent from './data/DataContent';
import Image from '../../Image/Image';
import imgLg1x1 from '../../../../../storybook-images/assets/720/fpo--1x1--720x720--004.jpg';
import imgLg4x3 from '../../../../../storybook-images/assets/720/fpo--4x3--720x540--004.jpg';
import React from 'react';
import readme from '../README.stories.mdx';
import styles from './TableOfContents.stories.scss';
import TableOfContents from '../TableOfContents';

export const Default = ({ parameters }) => {
  const { withHeadingContent } = parameters?.props?.Other ?? {};
  const headingContent = (
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

const sources = [
  {
    src: imgLg4x3,
    breakpoint: 400,
  },
  {
    src: imgLg4x3,
    breakpoint: 672,
  },
  {
    src: imgLg1x1,
    breakpoint: 1056,
  },
];

const defaultSrc = imgLg1x1;
const alt = 'Lorem Ipsum';
const longDescription = 'Lorem Ipsum Dolor';

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
