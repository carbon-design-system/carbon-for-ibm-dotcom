/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import DDSHorizontalRule from '@carbon/ibmdotcom-web-components/es/components-react/horizontal-rule/horizontal-rule';
import { boolean, select, text } from '@storybook/addon-knobs';
// @ts-ignore
import DDSTableOfContents from '@carbon/ibmdotcom-web-components/es/components-react/table-of-contents/table-of-contents';
import DDSLinkList from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list';
import DDSLinkListItem from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list-item';
import ArrowLeft20 from '@carbon/icons-react/es/arrow--left/20.js';
import content, { headings, LOREM } from './wrapper-content';
import readme from './README.stories.react.mdx';
import styles from './table-of-contents.stories.scss';
import { ICON_PLACEMENT } from '../../../globals/defs';

export const Default = args => {
  const { numberOfItems: items, withHeadingContent } = args?.Other ?? {};
  return (
    <>
      <DDSTableOfContents>
        {withHeadingContent && (
          <>
            <DDSLinkList slot="heading" type="vertical">
              <DDSLinkListItem
                iconPlacement={ICON_PLACEMENT.LEFT}
                href="https://github.com/carbon-design-system/carbon-web-components">
                DevOps <ArrowLeft20 slot="icon" />
              </DDSLinkListItem>
              <DDSLinkListItem
                iconPlacement={ICON_PLACEMENT.LEFT}
                href="https://github.com/carbon-design-system/carbon-web-components">
                Automation <ArrowLeft20 slot="icon" />
              </DDSLinkListItem>
              <DDSLinkListItem
                iconPlacement={ICON_PLACEMENT.LEFT}
                href="https://github.com/carbon-design-system/carbon-web-components">
                Development <ArrowLeft20 slot="icon" />
              </DDSLinkListItem>
            </DDSLinkList>
            <DDSHorizontalRule slot="menu-rule"></DDSHorizontalRule>
          </>
        )}
        {content({ items })}
      </DDSTableOfContents>
    </>
  );
};

export const Horizontal = args => {
  const { numberOfItems: items } = args?.Other ?? {};
  return (
    <>
      <DDSTableOfContents layout={'horizontal'}>{content({ items })}</DDSTableOfContents>
    </>
  );
};

Horizontal.story = {
  name: 'Horizontal',
  parameters: {
    knobs: {
      Other: () => ({
        numberOfItems: Array.from({
          length: select('Number of items', [5, 6, 7, 8], 5),
        }).map((_, i) => ({
          heading: text(`Section ${i + 1} heading`, headings[i % headings.length]),
          copy: text(`Section ${i + 1} copy`, `${LOREM}\n`.repeat(3).trim()),
        })),
      }),
    },
  },
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
      Other: () => ({
        withHeadingContent: boolean('With heading content', false),
        numberOfItems: Array.from({
          length: select('Number of items', [5, 6, 7, 8], 5),
        }).map((_, i) => ({
          heading: text(`Section ${i + 1} heading`, headings[i % headings.length]),
          copy: text(`Section ${i + 1} copy`, `${LOREM}\n`.repeat(3).trim()),
        })),
      }),
    },
  },
};
