/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { select } from '@storybook/addon-knobs';
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20.js';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import C4DLinkList from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list';
// @ts-ignore
import C4DLinkListHeading from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list-heading';
// @ts-ignore
import C4DLinkListItem from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list-item';
// @ts-ignore
import C4DLinkListItemCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/link-list-item-cta';
// @ts-ignore
import C4DVideoCTAContainer from '@carbon/ibmdotcom-web-components/es/components-react/cta/video-cta-container';
// @ts-ignore
import C4DCardFooter from '@carbon/ibmdotcom-web-components/es/components-react/card/card-footer';
// @ts-ignore
import C4DCardCTAFooter from '@carbon/ibmdotcom-web-components/es/components-react/cta/card-cta-footer';

import { CTA_TYPE } from '../../cta/defs';
import { ICON_PLACEMENT } from '../../link-with-icon/link-with-icon';
import textNullable from '../../../../.storybook/knob-text-nullable';
import readme from './README.stories.react.mdx';

const hrefsForType = {
  [CTA_TYPE.REGULAR]: 'https://www.example.com',
  [CTA_TYPE.LOCAL]: 'https://www.example.com',
  [CTA_TYPE.JUMP]: '#example',
  [CTA_TYPE.EXTERNAL]: 'https://www.example.com',
  [CTA_TYPE.DOWNLOAD]:
    'https://www.ibm.com/annualreport/assets/downloads/IBM_Annual_Report_2019.pdf',
  [CTA_TYPE.VIDEO]: '0_ibuqxqbe',
};

const knobNamesForType = {
  [CTA_TYPE.REGULAR]: 'Content link href (href)',
  [CTA_TYPE.LOCAL]: 'Content link href (href)',
  [CTA_TYPE.JUMP]: 'Anchor href (href)',
  [CTA_TYPE.EXTERNAL]: 'Content link href (href)',
  [CTA_TYPE.DOWNLOAD]: 'Download link href (href)',
  [CTA_TYPE.VIDEO]: 'Video ID (href)',
};

const types = {
  [`Local (${CTA_TYPE.LOCAL})`]: CTA_TYPE.LOCAL,
  [`Jump (${CTA_TYPE.JUMP})`]: CTA_TYPE.JUMP,
  [`External (${CTA_TYPE.EXTERNAL})`]: CTA_TYPE.EXTERNAL,
  [`Download (${CTA_TYPE.DOWNLOAD})`]: CTA_TYPE.DOWNLOAD,
  [`Video (${CTA_TYPE.VIDEO})`]: CTA_TYPE.VIDEO,
};

export const Default = (args) => {
  const { ctaType, download, href } = args?.LinkListItem ?? {};
  return !ctaType ? (
    <C4DLinkList type="default">
      <C4DLinkListHeading>Tutorial</C4DLinkListHeading>
      <C4DLinkListItem href="https://example.com" type="default">
        <p>Learn more about Kubernetes</p>
        <ArrowRight20 slot="icon" />
      </C4DLinkListItem>
      <C4DLinkListItem href="https://example.com" type="default">
        <p>Containerization A Complete Guide</p>
        <ArrowRight20 slot="icon" />
      </C4DLinkListItem>
    </C4DLinkList>
  ) : (
    <C4DLinkList type="default">
      <C4DLinkListHeading>Tutorial</C4DLinkListHeading>
      <C4DLinkListItemCTA
        href={href}
        cta-type={ctaType}
        download={download}
        type="default">
        {ctaType !== CTA_TYPE.VIDEO && <p>Learn more about Kubernetes</p>}
      </C4DLinkListItemCTA>
      <C4DLinkListItemCTA
        href={href}
        cta-type={ctaType}
        download={download}
        type="default">
        {ctaType !== CTA_TYPE.VIDEO && <p>Containerization A Complete Guide</p>}
      </C4DLinkListItemCTA>
    </C4DLinkList>
  );
};

Default.story = {
  parameters: {
    colLgClass: 'cds--col-lg-3',
    knobs: {
      LinkListItem: () => {
        const ctaType = select('CTA type (cta-type)', types, CTA_TYPE.LOCAL);
        const download =
          ctaType !== CTA_TYPE.DOWNLOAD
            ? undefined
            : textNullable(
                'Download target (download)',
                'IBM_Annual_Report_2019.pdf'
              );
        return {
          ctaType,
          download,
          href: textNullable(
            knobNamesForType[ctaType ?? CTA_TYPE.REGULAR],
            hrefsForType[ctaType ?? CTA_TYPE.REGULAR]
          ),
        };
      },
    },
    propsSet: {
      default: {
        LinkListItem: {
          ctaType: CTA_TYPE.LOCAL,
          download: undefined,
          href: 'https://www.example.com',
        },
      },
    },
  },
};

export const Horizontal = (args) => {
  const {
    ctaType,
    download,
    href,
    iconPlacement = ICON_PLACEMENT.RIGHT,
  } = args?.LinkListItem ?? {};
  return !ctaType ? (
    <C4DLinkList type="horizontal">
      <C4DLinkListHeading>Tutorial</C4DLinkListHeading>
      <C4DLinkListItem
        icon-placement={iconPlacement}
        href="https://example.com">
        Learn more about Kubernetes <ArrowRight20 slot="icon" />
      </C4DLinkListItem>
      <C4DLinkListItem
        icon-placement={iconPlacement}
        href="https://example.com">
        Containerization A Complete Guide <ArrowRight20 slot="icon" />
      </C4DLinkListItem>
    </C4DLinkList>
  ) : (
    <C4DLinkList type="horizontal">
      <C4DLinkListHeading>Tutorial</C4DLinkListHeading>
      <C4DLinkListItemCTA
        icon-placement={iconPlacement}
        href={href}
        cta-type={ctaType}
        download={download}>
        {ctaType !== CTA_TYPE.VIDEO && 'Learn more about Kubernetes'}
      </C4DLinkListItemCTA>
      <C4DLinkListItemCTA
        icon-placement={iconPlacement}
        href={href}
        cta-type={ctaType}
        download={download}>
        {ctaType !== CTA_TYPE.VIDEO && 'Containerization A Complete Guide'}
      </C4DLinkListItemCTA>
    </C4DLinkList>
  );
};

Horizontal.story = {
  parameters: {
    colLgClass: 'cds--col-lg-10',
    knobs: {
      LinkListItem: () => {
        const ctaType = select('CTA type (cta-type)', types, CTA_TYPE.LOCAL);
        const download =
          ctaType !== CTA_TYPE.DOWNLOAD
            ? undefined
            : textNullable(
                'Download target (download)',
                'IBM_Annual_Report_2019.pdf'
              );
        return {
          ctaType,
          download,
          href: textNullable(
            knobNamesForType[ctaType ?? CTA_TYPE.REGULAR],
            hrefsForType[ctaType ?? CTA_TYPE.REGULAR]
          ),
        };
      },
    },
    propsSet: {
      default: {
        LinkListItem: {
          ctaType: CTA_TYPE.LOCAL,
          download: undefined,
          href: 'https://www.example.com',
        },
      },
    },
  },
};

export const Vertical = (args) => {
  const {
    ctaType,
    download,
    href,
    iconPlacement = ICON_PLACEMENT.RIGHT,
  } = args?.LinkListItem ?? {};
  return !ctaType ? (
    <C4DLinkList type="vertical">
      <C4DLinkListHeading>Tutorial</C4DLinkListHeading>
      <C4DLinkListItem
        icon-placement={iconPlacement}
        href="https://example.com">
        <p>
          Learn more about Kubernetes <ArrowRight20 slot="icon" />
        </p>
      </C4DLinkListItem>
      <C4DLinkListItem
        icon-placement={iconPlacement}
        href="https://example.com">
        <p>
          Containerization A Complete Guide <ArrowRight20 slot="icon" />
        </p>
      </C4DLinkListItem>
    </C4DLinkList>
  ) : (
    <C4DLinkList type="vertical">
      <C4DLinkListHeading>Tutorial</C4DLinkListHeading>
      <C4DLinkListItemCTA
        icon-placement={iconPlacement}
        href={href}
        cta-type={ctaType}
        download={download}>
        {ctaType !== CTA_TYPE.VIDEO && 'Learn more about Kubernetes'}
      </C4DLinkListItemCTA>
      <C4DLinkListItemCTA
        icon-placement={iconPlacement}
        href={href}
        cta-type={ctaType}
        download={download}>
        {ctaType !== CTA_TYPE.VIDEO && 'Containerization A Complete Guide'}
      </C4DLinkListItemCTA>
    </C4DLinkList>
  );
};

Vertical.story = {
  parameters: {
    colLgClass: 'cds--col-lg-4',
    knobs: Horizontal.story.parameters.knobs,
    propsSet: {
      default: {
        LinkListItem: {
          ctaType: CTA_TYPE.LOCAL,
          download: undefined,
          href: 'https://www.example.com',
        },
      },
    },
  },
};

export default {
  title: 'Components/Link list',
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
  },
  decorators: [
    (story, { parameters }) => {
      const { colLgClass } = parameters;
      return (
        <C4DVideoCTAContainer class="cds--grid">
          <div className="cds--row">
            <div className={`${colLgClass} cds--col-sm-4`}>{story()}</div>
          </div>
        </C4DVideoCTAContainer>
      );
    },
  ],
};
