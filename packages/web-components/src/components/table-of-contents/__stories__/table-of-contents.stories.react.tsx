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
// @ts-ignore
import DDSTableOfContents, {
  PropTypesRef,
} from '@carbon/ibmdotcom-web-components/es/components-react/table-of-contents/table-of-contents';
import DDSLinkList from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list';
import DDSLinkListItem from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list-item';
import ArrowLeft20 from '@carbon/icons-react/es/arrow--left/20.js';
import content, { headings, LOREM } from './wrapper-content';
import readme from './README.stories.react.mdx';
import styles from './table-of-contents.stories.scss';
import { ICON_PLACEMENT } from '../../../globals/defs';

export const Default = args => {
  const { numberOfItems, withHeadingContent } = args;

  const items = Array.from({
    length: numberOfItems,
  }).map((_, i) => ({
    heading: headings[i % headings.length],
    copy: `${LOREM}\n`.repeat(3).trim(),
  }));

  return (
    <>
      <DDSTableOfContents>
        {withHeadingContent && (
          <>
            <DDSLinkList slot="heading" type="vertical">
              <DDSLinkListItem
                iconPlacement={ICON_PLACEMENT.LEFT}
                href="https://github.com/carbon-design-system/carbon-web-components"
              >
                DevOps <ArrowLeft20 slot="icon" />
              </DDSLinkListItem>
              <DDSLinkListItem
                iconPlacement={ICON_PLACEMENT.LEFT}
                href="https://github.com/carbon-design-system/carbon-web-components"
              >
                Automation <ArrowLeft20 slot="icon" />
              </DDSLinkListItem>
              <DDSLinkListItem
                iconPlacement={ICON_PLACEMENT.LEFT}
                href="https://github.com/carbon-design-system/carbon-web-components"
              >
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
  const { numberOfItems } = args;

  const items = Array.from({
    length: numberOfItems,
  }).map((_, i) => ({
    heading: headings[i % headings.length],
    copy: `${LOREM}\n`.repeat(3).trim(),
  }));

  return (
    <>
      <DDSTableOfContents layout={'horizontal'}>
        {content({ items })}
      </DDSTableOfContents>
    </>
  );
};

Horizontal.story = {
  name: 'Horizontal',
  argTypes: {
    withHeadingContent: {
      table: {
        disable: true,
      },
    },
  },
};

export default {
  title: 'Components/Table of contents',
  component: PropTypesRef,
  argTypes: {
    numberOfItems: {
      options: [5, 6, 7, 8],
      control: { type: 'number' },
      defaultValue: 5,
    },
    withHeadingContent: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
    'menu-rule': {
      table: {
        disable: true,
      },
    },
    table: {
      table: {
        disable: true,
      },
    },
    heading: {
      table: {
        disable: true,
      },
    },
    selectorTarget: {
      table: {
        disable: true,
      },
    },
    styles: {
      table: {
        disable: true,
      },
    },
    layout: {
      table: {
        disable: true,
      },
    },
    ariaLabelFormatter: {
      table: {
        disable: true,
      },
    },
    stickyOffset: {
      table: {
        disable: true,
      },
    },
    'toc-layout': {
      table: {
        disable: true,
      },
    },
  },
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
  },
};
