/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
// eslint-disable-next-line max-len
import C4DContentGroupPictograms from '@carbon/ibmdotcom-web-components/es/components-react/content-group-pictograms/content-group-pictograms';
import C4DContentGroupHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-group/content-group-heading';
import C4DContentGroupCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-group/content-group-copy';
import C4DContentItemCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-copy';
import C4DContentItemHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-heading';
import C4DLinkWithIcon from '@carbon/ibmdotcom-web-components/es/components-react/link-with-icon/link-with-icon';
import C4DPictogramItem from '@carbon/ibmdotcom-web-components/es/components-react/pictogram-item/pictogram-item';
import { ArrowRight } from '@carbon/icons-react';
import { TouchScreen, Pattern, Touch } from '@carbon/pictograms-react';
import { boolean, number, select, text } from '@storybook/addon-knobs';
import readme from './README.stories.react.mdx';

const iconProps = {
  size: 20,
  slot: 'icon',
};

const pictograms = {
  TouchScreen: 'TouchScreen',
  Touch: 'Touch',
  Pattern: 'Pattern',
};

/**
 * Returns the react component based on the value in the pictogram variables
 *
 * @param {string} sel string that defines the returning pictogram
 * @returns {*} JSX pictogram component
 */
const selectPictogram = (sel) => {
  switch (sel) {
    case 'TouchScreen':
      return TouchScreen;
    case 'Pattern':
      return Pattern;
    case 'Touch':
      return Touch;
    default:
      return null;
  }
};

/**
 * Toggles CTA data based on item value
 *
 * @param {boolean} item defines if cta will be rendered
 * @returns {*} if true returns cta data, if false, returns null
 */
const toggleCTA = (item) => {
  if (item) {
    return {
      type: 'local',
      href: 'https://www.example.com',
      copy: 'Lorem ipsum dolor sit amet ',
    };
  }
  return null;
};

export default {
  title: 'Components/Content group pictograms',
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
    knobs: {
      ContentGroupPictograms: () => ({
        heading: text('Heading (heading)', 'Lorem ipsum dolor sit amet'),
        copy: text(
          'Copy (copy)',
          `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non porttitor libero, in venenatis magna.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non porttitor libero, in venenatis magna.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non porttitor libero, in venenatis magna.`
        ),
        pictogramCount: number('Number of PictogramItems', 3, {}),
      }),
    },
  },
};

export const Default = (args) => {
  const {
    heading: groupHeading,
    copy: groupCopy,
    pictogramCount: length,
  } = args?.ContentGroupPictograms ?? {};
  const pictogramItems = Array.from({ length }).map((_, i) => ({
    heading: text(
      `Item ${i + 1} Heading (items.heading)`,
      'Aliquam condimentum interdum'
    ),
    copy: text(
      `Item ${i + 1} Copy (items.copy)`,
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non porttitor libero, in venenatis magna.'
    ),
    cta: toggleCTA(boolean(`Item ${i + 1} CTA (items.cta)`, true)),
    Pictogram: selectPictogram(
      select(
        `Item ${i + 1} Pictogram (pictogram)`,
        pictograms,
        pictograms.TouchScreen
      )
    ),
    linkWithIcon: {
      href: 'https://www.example.com',
      copy: 'Lorem ipsum dolor sit amet',
    },
  }));

  return (
    <div className="cds--grid">
      <div className="cds--row">
        <div className="cds--col-sm-4 cds--col-lg-8 cds--no-gutter">
          <C4DContentGroupPictograms>
            <C4DContentGroupHeading>{groupHeading}</C4DContentGroupHeading>
            <C4DContentGroupCopy>{groupCopy}</C4DContentGroupCopy>
            {pictogramItems.map(
              ({ heading, copy, Pictogram, cta, linkWithIcon }) => (
                <C4DPictogramItem>
                  <Pictogram slot="pictogram" />
                  <C4DContentItemHeading>{heading}</C4DContentItemHeading>
                  <C4DContentItemCopy>{copy}</C4DContentItemCopy>
                  {cta && (
                    <C4DLinkWithIcon href={linkWithIcon.href} slot="footer">
                      {linkWithIcon.copy} <ArrowRight {...iconProps} />
                    </C4DLinkWithIcon>
                  )}
                </C4DPictogramItem>
              )
            )}
          </C4DContentGroupPictograms>
        </div>
      </div>
    </div>
  );
};
