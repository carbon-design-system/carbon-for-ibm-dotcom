/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { boolean, select } from '@storybook/addon-knobs';
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
import textNullable from '../../../../.storybook/knob-text-nullable';
import readme from './README.stories.react.mdx';
import imgXlg4x3 from '../../../../../storybook-images/assets/1312/fpo--4x3--1312x984--003.jpg';
import logoMicrosoft2x1 from '../../../../../storybook-images/assets/logos/logo-microsoft--2x1.png';
import { PICTOGRAM_PLACEMENT } from '../defs';

export const Default = ({ parameters }) => {
  const { image, href, alt, defaultSrc, heading, eyebrow, tagGroup, copy, footer, cardStyles } = parameters?.props?.Card ?? {};
  return (
    /* eslint-disable no-nested-ternary */
    <DDSCard
      colorScheme={cardStyles === 'Inverse card' ? 'inverse' : cardStyles === 'Outlined card' ? 'light' : ''}
      href={href || undefined}
      border={cardStyles === 'Outlined card'}>
      {image ? <DDSImage slot="image" alt={alt || undefined} defaultSrc={defaultSrc || undefined} /> : ''}
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
  parameters: {
    knobs: {
      Card: ({ groupId }) => ({
        image: boolean('Add image:', false, groupId),
        eyebrow: textNullable('Eyebrow:', 'Industry', groupId),
        heading: textNullable('Heading:', 'Aerospace and defence', groupId),
        copy: textNullable('Body copy:', '', groupId),
        alt: 'Image alt text',
        defaultSrc: imgXlg4x3,
        tagGroup: boolean('Add tags:', false, groupId),
        href: 'https://example.com',
        footer: textNullable('CTA:', 'Learn more', groupId),
        cardStyles: select('Card style:', ['Outlined card', 'Inverse card', 'none'], 'none', groupId),
      }),
    },
  },
};

const pictogramPlacements = {
  [PICTOGRAM_PLACEMENT.TOP]: PICTOGRAM_PLACEMENT.TOP,
  [PICTOGRAM_PLACEMENT.BOTTOM]: PICTOGRAM_PLACEMENT.BOTTOM,
};

export const Pictogram = ({ parameters }) => {
  const { href, heading, copy, tagGroup, pictogramPlacement, cardStyles } = parameters?.props?.PictogramCard ?? {};
  return (
    <DDSCard
      pictogramPlacement={pictogramPlacement}
      href={href || undefined}
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
  parameters: {
    knobs: {
      PictogramCard: ({ groupId }) => {
        const pictogramPlacement = select('Pictogram position:', pictogramPlacements, pictogramPlacements.top, groupId);
        const copy = textNullable(
          'Body copy:',
          'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
          groupId
        );
        return {
          pictogramPlacement,
          heading: textNullable('Heading:', 'Aerospace and defence', groupId),
          copy,
          href: 'https://example.com',
          cardStyles: select('Card style:', ['Outlined card', 'Inverse card', 'none'], 'none', groupId),
        };
      },
    },
  },
};

export const Static = ({ parameters }) => {
  const { image, alt, defaultSrc, outlinedCard, eyebrow, heading, copy, tagGroup, cta } = parameters?.props?.StaticCard ?? {};
  return (
    <DDSCard colorScheme={outlinedCard ? 'light' : ''} border={outlinedCard}>
      {image ? <DDSImage slot="image" alt={alt || undefined} defaultSrc={defaultSrc || undefined} /> : ''}
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
          Sign up for the trial
          <ArrowRight20 slot="icon" />
        </DDSCardFooter>
      ) : (
        ''
      )}
    </DDSCard>
  );
};

Static.story = {
  parameters: {
    ...readme.parameters,
    knobs: {
      StaticCard: ({ groupId }) => {
        const image = boolean('Add image:', false, groupId);
        const eyebrow = textNullable('Eyebrow:', 'SPSS Statistics', groupId);
        const heading = textNullable('Heading:', 'Free trial', groupId);
        const copy = textNullable(
          'Body copy:',
          'Enjoy full SPSS Statistics capabilities including all add-ons. ' +
            'All trial registrants are restricted to one free trial per computer per user.',
          groupId
        );
        const tagGroup = boolean('Add tags:', false, groupId);
        const cta = boolean('Add CTA:', false, groupId);
        const ctaCopy = cta ? textNullable('CTA copy:', 'Sign up for the trial', groupId) : '';
        const outlinedCard = boolean('Outlined card:', true, groupId);
        return {
          alt: 'Image alt text',
          defaultSrc: imgXlg4x3,
          image,
          eyebrow,
          heading,
          copy,
          tagGroup,
          cta,
          ctaCopy,
          outlinedCard,
        };
      },
    },
  },
};

export const Logo = ({ parameters }) => {
  const { alt, defaultSrc, eyebrow, heading, href, copy, tagGroup } = parameters?.props?.Card ?? {};
  return (
    <DDSCard border logo href={href || undefined}>
      <DDSImageLogo slot="image" alt={alt} default-src={defaultSrc}></DDSImageLogo>
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
  parameters: {
    ...readme.parameters,
    knobs: {
      Card: ({ groupId }) => ({
        alt: 'Image alt text',
        defaultSrc: logoMicrosoft2x1,
        tagGroup: boolean('Add tags', true, groupId),
        eyebrow: textNullable('Card Eyebrow:', 'Microsoft', groupId),
        heading: textNullable('Card Heading (optional):', '', groupId),
        copy: textNullable(
          'Card body copy:',
          'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          groupId
        ),
        href: 'https://example.com',
      }),
    },
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
