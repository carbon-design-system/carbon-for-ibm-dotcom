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
import DDSHorizontalRule from '@carbon/ibmdotcom-web-components/es/components-react/horizontal-rule/horizontal-rule';
import DDSImage from '@carbon/ibmdotcom-web-components/es/components-react/image/image';
import DDSImageItem from '@carbon/ibmdotcom-web-components/es/components-react/image/image-item';
import { boolean } from '@storybook/addon-knobs';
// @ts-ignore
import DDSTableOfContents from '@carbon/ibmdotcom-web-components/es/components-react/table-of-contents/table-of-contents';
import content from './wrapper-content';
import readme from './README.stories.react.mdx';
import styles from './table-of-contents.stories.scss';
import imgMd16x9 from '../../../../../storybook-images/assets/480/fpo--16x9--480x270--005.jpg';
import imgLg16x9 from '../../../../../storybook-images/assets/720/fpo--16x9--720x405--001.jpg';
import imgLg1x1 from '../../../../../storybook-images/assets/720/fpo--1x1--720x720--001.jpg';
import imgXlg16x9 from '../../../../../storybook-images/assets/1312/fpo--16x9--1312x738--001.jpg';

export const Default = ({ parameters }) => {
  const { withHeadingContent } = parameters?.props?.Other ?? {};
  return (
    <>
      <DDSTableOfContents>
        {withHeadingContent && (
          <>
            <DDSImage slot="heading" alt="Alt text" default-src={imgLg1x1}>
              <DDSImageItem media="(min-width: 1056px)" srcset={imgXlg16x9}></DDSImageItem>
              <DDSImageItem media="(min-width: 672px)" srcset={imgLg16x9}></DDSImageItem>
              <DDSImageItem media="(min-width: 400px)" srcset={imgMd16x9}></DDSImageItem>
            </DDSImage>
            <DDSHorizontalRule slot="menu-rule"></DDSHorizontalRule>
          </>
        )}
        {content()}
      </DDSTableOfContents>
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
          <div className="bx--grid" style={{ padding: '0' }}>
            {story()}
          </div>
        </>
      );
    },
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
    knobs: {
      Other: ({ groupId }) => ({
        withHeadingContent: boolean('With heading content', false, groupId),
      }),
    },
  },
};
