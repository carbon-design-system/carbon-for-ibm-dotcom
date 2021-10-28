/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
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
import DDSTagGroup from '@carbon/ibmdotcom-web-components/es/components-react/tag-group/tag-group';
import { Tag } from 'carbon-components-react';
import textNullable from '../../../../.storybook/knob-text-nullable';
import readme from './README.stories.react.mdx';
import imgXlg4x3 from '../../../../../storybook-images/assets/1312/fpo--4x3--1312x984--003.jpg';
import imgLg2x1 from '../../../../../storybook-images/assets/720/fpo--2x1--720x360--003.jpg';
import { PICTOGRAM_PLACEMENT } from '../defs';

const iconPlacement = {
  left: 'left',
  right: 'right',
};

export const Default = ({ parameters }) => {
  const { inverse, href, image, alt, defaultSrc, heading, copy, tagGroup, footer } = parameters?.props?.Card ?? {};
  return (
    <DDSCard colorScheme={inverse ? 'inverse' : ''} href={href || undefined}>
      {image ? <DDSImage slot="image" alt={alt || undefined} defaultSrc={defaultSrc || undefined} /> : ''}
      <DDSCardEyebrow>Eyebrow</DDSCardEyebrow>
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
      <DDSCardFooter iconPlacement={iconPlacement}>
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
        alt: 'Image alt text',
        defaultSrc: imgXlg4x3,
        tagGroup: boolean('Add tags', false, groupId),
        image: boolean('Add image', false, groupId),
        heading: textNullable('Card Heading:', 'Lorem ipsum dolor sit amet', groupId),
        copy: textNullable('Card body copy:', '', groupId),
        href: 'https://example.com',
        footer: 'Card CTA text',
        iconPlacement: iconPlacement.right,
      }),
    },
  },
};

const pictogramPlacements = {
  [PICTOGRAM_PLACEMENT.TOP]: PICTOGRAM_PLACEMENT.TOP,
  [PICTOGRAM_PLACEMENT.BOTTOM]: PICTOGRAM_PLACEMENT.BOTTOM,
};

export const Pictogram = ({ parameters }) => {
  const { pictogramPlacement, href, heading, copy, tagGroup } = parameters?.props?.PictogramCard ?? {};
  return (
    <DDSCard pictogramPlacement={pictogramPlacement} href={href || undefined}>
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
      <Desktop slot="pictogram" />
    </DDSCard>
  );
};

Pictogram.story = {
  parameters: {
    knobs: {
      PictogramCard: ({ groupId }) => ({
        alt: 'Image alt text',
        defaultSrc: imgLg2x1,
        pictogramPlacement: select('Pictogram placement', pictogramPlacements, pictogramPlacements.top, groupId),
        heading: textNullable('Card Heading:', 'Lorem ipsum dolor sit amet', groupId),
        copy: textNullable(
          'Card body copy:',
          'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          groupId
        ),
        href: 'https://example.com',
        footer: 'Card CTA text',
        iconPlacement: iconPlacement.right,
      }),
    },
  },
};

export const Static = ({ parameters }) => {
  const { image, alt, defaultSrc, outlinedCard, eyebrow, heading, href, copy, tagGroup, footer } =
    parameters?.props?.StaticCard ?? {};
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
      <DDSCardFooter href={href} iconPlacement={iconPlacement}>
        {footer}
        <ArrowRight20 slot="icon" />
      </DDSCardFooter>
    </DDSCard>
  );
};

Static.story = {
  parameters: {
    knobs: {
      StaticCard: ({ groupId }) => ({
        alt: 'Image alt text',
        defaultSrc: imgXlg4x3,
        outlinedCard: boolean('Outlined card', true, groupId),
        tagGroup: boolean('Add tags', true, groupId),
        image: boolean('Add image', false, groupId),
        eyebrow: textNullable('Card Eyebrow:', 'Eyebrow', groupId),
        heading: textNullable('Card Heading:', 'Lorem ipsum dolor sit amet', groupId),
        copy: textNullable(
          'Card body copy:',
          'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          groupId
        ),
        href: 'https://example.com',
        footer: textNullable('CTA copy', 'Card CTA text', groupId),
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
