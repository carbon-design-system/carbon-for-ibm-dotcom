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

export const Default = args => {
  const { image, href, alt, defaultSrc, heading, eyebrow, tagGroup, copy, footer, cardStyles } = args?.Card ?? {};
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
      Card: () => ({
        image: boolean('Add image:', false),
        eyebrow: textNullable('Eyebrow:', 'Industry'),
        heading: textNullable('Heading:', 'Aerospace and defence'),
        copy: textNullable('Body copy:', ''),
        alt: 'Image alt text',
        defaultSrc: imgXlg4x3,
        tagGroup: boolean('Add tags:', false),
        href: 'https://example.com',
        footer: textNullable('CTA:', 'Learn more'),
        cardStyles: select('Card style:', ['Outlined card', 'Inverse card', 'none'], 'none'),
      }),
    },
  },
};

const pictogramPlacements = {
  [PICTOGRAM_PLACEMENT.TOP]: PICTOGRAM_PLACEMENT.TOP,
  [PICTOGRAM_PLACEMENT.BOTTOM]: PICTOGRAM_PLACEMENT.BOTTOM,
};

export const Pictogram = args => {
  const { href, heading, copy, tagGroup, pictogramPlacement, cardStyles } = args?.PictogramCard ?? {};
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
      PictogramCard: () => {
        const pictogramPlacement = select('Pictogram position:', pictogramPlacements, pictogramPlacements.top);
        const copy = textNullable(
          'Body copy:',
          'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat'
        );
        return {
          pictogramPlacement,
          heading: textNullable('Heading:', 'Aerospace and defence'),
          copy,
          href: 'https://example.com',
          cardStyles: select('Card style:', ['Outlined card', 'Inverse card', 'none'], 'none'),
        };
      },
    },
  },
};

export const Static = args => {
  const { image, alt, defaultSrc, outlinedCard, eyebrow, heading, copy, tagGroup, cta } = args?.StaticCard ?? {};
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
      StaticCard: () => {
        const image = boolean('Add image:', false);
        const eyebrow = textNullable('Eyebrow:', 'SPSS Statistics');
        const heading = textNullable('Heading:', 'Free trial');
        const copy = textNullable(
          'Body copy:',
          'Enjoy full SPSS Statistics capabilities including all add-ons. ' +
            'All trial registrants are restricted to one free trial per computer per user.'
        );
        const tagGroup = boolean('Add tags:', false);
        const cta = boolean('Add CTA:', false);
        const ctaCopy = cta ? textNullable('CTA copy:', 'Sign up for the trial') : '';
        const outlinedCard = boolean('Outlined card:', true);
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

export const Logo = args => {
  const { alt, defaultSrc, eyebrow, heading, href, copy, tagGroup } = args?.Card ?? {};
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
      Card: () => ({
        alt: 'Image alt text',
        defaultSrc: logoMicrosoft2x1,
        tagGroup: boolean('Add tags', true),
        eyebrow: textNullable('Card Eyebrow:', 'Microsoft'),
        heading: textNullable('Card Heading (optional):', ''),
        copy: textNullable(
          'Card body copy:',
          'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
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
