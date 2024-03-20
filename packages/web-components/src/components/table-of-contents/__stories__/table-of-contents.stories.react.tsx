/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import C4DHorizontalRule from '@carbon/ibmdotcom-web-components/es/components-react/horizontal-rule/horizontal-rule';
import { boolean, select, text } from '@storybook/addon-knobs';
// @ts-ignore
import C4DTableOfContents from '@carbon/ibmdotcom-web-components/es/components-react/table-of-contents/table-of-contents';
import C4DLinkList from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list';
import C4DLinkListItem from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list-item';
import { ArrowLeft } from '@carbon/icons-react';
import content, { headings, LOREM } from './wrapper-content';
import readme from './README.stories.react.mdx';
import styles from './table-of-contents.stories.scss';
import { ICON_PLACEMENT } from '../../../globals/defs';

const iconProps = {
  size: 20,
  slot: 'icon',
};

export const Default = (args) => {
  const { numberOfItems: items, withHeadingContent } = args?.Other ?? {};
  return (
    <>
      <C4DTableOfContents>
        {withHeadingContent && (
          <>
            <C4DLinkList slot="heading" type="vertical">
              <C4DLinkListItem
                iconPlacement={ICON_PLACEMENT.LEFT}
                href="https://github.com/carbon-design-system/carbon-web-components">
                DevOps <ArrowLeft {...iconProps} />
              </C4DLinkListItem>
              <C4DLinkListItem
                iconPlacement={ICON_PLACEMENT.LEFT}
                href="https://github.com/carbon-design-system/carbon-web-components">
                Automation <ArrowLeft {...iconProps} />
              </C4DLinkListItem>
              <C4DLinkListItem
                iconPlacement={ICON_PLACEMENT.LEFT}
                href="https://github.com/carbon-design-system/carbon-web-components">
                Development <ArrowLeft {...iconProps} />
              </C4DLinkListItem>
            </C4DLinkList>
            <C4DHorizontalRule slot="menu-rule"></C4DHorizontalRule>
          </>
        )}
        {content({ items })}
      </C4DTableOfContents>
    </>
  );
};

export const Horizontal = (args) => {
  const { numberOfItems: items } = args?.Other ?? {};
  return (
    <>
      <C4DTableOfContents toc-layout={'horizontal'}>
        {content({ items })}
      </C4DTableOfContents>
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
          heading: text(
            `Section ${i + 1} heading`,
            headings[i % headings.length]
          ),
          copy: text(`Section ${i + 1} copy`, `${LOREM}\n`.repeat(3).trim()),
        })),
      }),
    },
  },
};

export default {
  title: 'Components/Table of contents',
  decorators: [
    (story) => {
      return (
        <>
          <style type="text/css">{styles.cssText}</style>
          <div className="cds--grid" style={{ padding: '0' }}>
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
          heading: text(
            `Section ${i + 1} heading`,
            headings[i % headings.length]
          ),
          copy: text(`Section ${i + 1} copy`, `${LOREM}\n`.repeat(3).trim()),
        })),
      }),
    },
  },
};
