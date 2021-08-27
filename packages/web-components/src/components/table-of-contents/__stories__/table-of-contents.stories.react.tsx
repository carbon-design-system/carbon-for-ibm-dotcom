/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import DDSTableOfContents from '@carbon/ibmdotcom-web-components/es/components-react/table-of-contents/table-of-contents';
import content from './wrapper-content';
import readme from './README.stories.react.mdx';
import styles from './table-of-contents.stories.scss';

export const Default = () => {
  return (
    <>
      <DDSTableOfContents>{content()}</DDSTableOfContents>
    </>
  );
};

export const Horizontal = () => {
  return (
    <>
      <DDSTableOfContents layout={'horizontal'}>{content()}</DDSTableOfContents>
    </>
  );
};

export default {
  title: 'Components/Table of contents',
  decorators: [
    story => {
      return (
        <>
          <style type="text/css">{styles.cssText}</style>
          {story()}
        </>
      );
    },
  ],
  parameters: {
    ...readme.parameters,
  },
};
