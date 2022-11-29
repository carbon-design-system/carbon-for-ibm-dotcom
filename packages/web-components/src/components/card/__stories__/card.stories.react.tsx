/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20.js';
import Desktop from '@carbon/pictograms-react/lib/desktop/index.js';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
import DDSCard from '@carbon/ibmdotcom-web-components/es/components-react/card/card';
import DDSCardHeading from '@carbon/ibmdotcom-web-components/es/components-react/card/card-heading';
import DDSCardEyebrow from '@carbon/ibmdotcom-web-components/es/components-react/card/card-eyebrow';
import DDSCardFooter from '@carbon/ibmdotcom-web-components/es/components-react/card/card-footer';
import DDSImage from '@carbon/ibmdotcom-web-components/es/components-react/image/image';
import DDSImageLogo from '@carbon/ibmdotcom-web-components/es/components-react/card/image-logo';
import DDSTagGroup from '@carbon/ibmdotcom-web-components/es/components-react/tag-group/tag-group';
import { Tag } from 'carbon-components-react';
import readme from './README.stories.react.mdx';
import imgXlg4x3 from '../../../../../storybook-images/assets/1312/fpo--4x3--1312x984--003.jpg';
import logoMicrosoft2x1 from '../../../../../storybook-images/assets/logos/logo-microsoft--2x1.png';
import { PICTOGRAM_PLACEMENT } from '../defs';

export const Default = ({ image, alt, heading, eyebrow, tagGroup, copy, footer, cardStyles }) => {
  return (
    /* eslint-disable no-nested-ternary */
    <DDSCard
      colorScheme={cardStyles === 'Inverse card' ? 'inverse' : cardStyles === 'Outlined card' ? 'light' : ''}
      href={'https://example.com' || undefined}
      border={cardStyles === 'Outlined card'}>
      {image ? <DDSImage slot="image" alt={alt || undefined} defaultSrc={imgXlg4x3 || undefined} /> : ''}
      <DDSCardEyebrow>{eyebrow}</DDSCardEyebrow>
      <DDSCardHeading>{heading}</DDSCardHeading>
      {copy ? <p>{copy}</p> : ''}
      {tagGroup ? (
        <DDSTagGroup>
          <Tag>Most popular</Tag>
          <Tag type="purple">Enterprise</Tag>
        </DDSTagGroup>
      ) : (
        ''
      )}
      <DDSCardFooter>
        {footer}
        <ArrowRight20 slot="icon" />
      </DDSCardFooter>
    </DDSCard>
  );
};

Default.story = {
  argTypes: {
    image: {
      control: 'boolean',
    },
    eyebrow: {
      control: { type: 'text' },
      defaultValue: 'Industry',
    },
    heading: {
      control: { type: 'text' },
      defaultValue: 'Aerospace and defence',
    },
    copy: {
      control: { type: 'text' },
      defaultValue: '',
    },
    alt: {
      control: { type: 'text' },
      defaultValue: 'Image alt text',
    },
    tagGroup: {
      control: 'boolean',
    },
    footer: {
      control: { type: 'text' },
      defaultValue: 'Learn more',
    },
    cardStyles: {
      options: ['Outlined card', 'Inverse card', 'none'],
      control: { type: 'select' },
      defaultValue: 'none',
    },
  },
};

const pictogramPlacements = {
  [PICTOGRAM_PLACEMENT.TOP]: PICTOGRAM_PLACEMENT.TOP,
  [PICTOGRAM_PLACEMENT.BOTTOM]: PICTOGRAM_PLACEMENT.BOTTOM,
};

export const Pictogram = ({ heading, copy, tagGroup, pictogramPlacement, cardStyles }) => {
  return (
    <DDSCard
      pictogramPlacement={pictogramPlacement}
      href={'https://example.com' || undefined}
      colorScheme={cardStyles === 'Inverse card' ? 'inverse' : cardStyles === 'Outlined card' ? 'light' : ''}
      border={cardStyles === 'Outlined card'}>
      <DDSCardHeading>{heading}</DDSCardHeading>
      {copy ? <p>{copy}</p> : ''}
      {tagGroup ? (
        <DDSTagGroup>
          <Tag>Most popular</Tag>
          <Tag type="purple">Enterprise</Tag>
        </DDSTagGroup>
      ) : (
        ''
      )}
      <Desktop slot="pictogram" width="48" height="48" />
    </DDSCard>
  );
};

Pictogram.story = {
  argTypes: {
    pictogramPlacement: {
      options: pictogramPlacements,
      control: { type: 'select' },
      defaultValue: PICTOGRAM_PLACEMENT.TOP,
    },
    copy: {
      control: { type: 'text' },
      defaultValue: `Enjoy full SPSS Statistics capabilities including all add-ons. 
        All trial registrants are restricted to one free trial per computer per user.`,
    },
    heading: {
      control: { type: 'text' },
      defaultValue: 'Free trials',
    },
    cardStyles: {
      options: ['Outlined card', 'Inverse card', 'none'],
      control: { type: 'select' },
      defaultValue: 'none',
    },
  },
};

export const Static = ({ image, alt, outlinedCard, eyebrow, heading, copy, tagGroup, cta, ctaCopy }) => {
  return (
    <DDSCard colorScheme={outlinedCard ? 'light' : ''} border={outlinedCard}>
      {image ? <DDSImage slot="image" alt={alt || undefined} defaultSrc={imgXlg4x3 || undefined} /> : ''}
      <DDSCardEyebrow>{eyebrow}</DDSCardEyebrow>
      <DDSCardHeading>{heading}</DDSCardHeading>
      {copy ? <p>{copy}</p> : ''}
      {tagGroup ? (
        <DDSTagGroup>
          <Tag>Most popular</Tag>
          <Tag type="purple">Enterprise</Tag>
        </DDSTagGroup>
      ) : (
        ''
      )}
      {cta ? (
        <DDSCardFooter href="https://www.example.com">
          {ctaCopy}
          <ArrowRight20 slot="icon" />
        </DDSCardFooter>
      ) : (
        ''
      )}
    </DDSCard>
  );
};

Static.story = {
  argTypes: {
    image: {
      control: 'boolean',
    },
    eyebrow: {
      control: { type: 'text' },
      defaultValue: 'Industry',
    },
    heading: {
      control: { type: 'text' },
      defaultValue: 'Aerospace and defence',
    },
    copy: {
      control: { type: 'text' },
      defaultValue: '',
    },
    alt: {
      control: { type: 'text' },
      defaultValue: 'Image alt text',
    },
    tagGroup: {
      control: 'boolean',
    },
    cta: {
      control: 'boolean',
      defaultValue: false,
    },
    ctaCopy: {
      control: { type: 'text' },
      defaultValue: 'Sign up for the trial',
      if: {
        arg: 'cta',
      },
    },
    outlinedCard: {
      control: 'boolean',
      defaultValue: true,
    },
  },
  parameters: {
    ...readme.parameters,
  },
};

export const Logo = ({ alt, eyebrow, heading, copy, tagGroup }) => {
  return (
    <DDSCard border logo href={'https://example.com' || undefined}>
      <DDSImageLogo slot="image" alt={alt} default-src={logoMicrosoft2x1}></DDSImageLogo>
      {eyebrow ? <DDSCardEyebrow>{eyebrow}</DDSCardEyebrow> : ''}
      {heading ? <DDSCardHeading>{heading}</DDSCardHeading> : ''}
      {copy ? <p>{copy}</p> : ``}
      {tagGroup ? (
        <DDSTagGroup>
          <Tag>Most popular</Tag>
          <Tag type="purple">Enterprise</Tag>
        </DDSTagGroup>
      ) : (
        ''
      )}
      <DDSCardFooter></DDSCardFooter>
    </DDSCard>
  );
};

Logo.story = {
  argTypes: {
    alt: 'Image alt text',
    tagGroup: {
      control: 'boolean',
    },
    eyebrow: {
      control: { type: 'text' },
      defaultValue: 'Microsoft',
    },
    heading: {
      control: { type: 'text' },
      defaultValue: '',
    },
    copy: {
      control: { type: 'text' },
      defaultValue: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
  },
  parameters: {
    ...readme.parameters,
  },
};

export default {
  title: 'Components/Card',
  decorators: [
    story => (
      <div className="bx--grid">
        <div className="bx--row">
          <div className="bx--col-sm-4 bx--col-md-3 bx--col-lg-6 bx--col-xlg-4 bx--no-gutter">{story()}</div>
        </div>
      </div>
    ),
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
  },
};
