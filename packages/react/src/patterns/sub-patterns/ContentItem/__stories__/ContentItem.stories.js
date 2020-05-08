/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  object,
  text,
  withKnobs,
  select,
  boolean,
} from '@storybook/addon-knobs';
import ContentItem from '../ContentItem';
import cx from 'classnames';
import React from 'react';
import readme from '../README.md';
import { settings } from 'carbon-components';
import { storiesOf } from '@storybook/react';

const { prefix } = settings;

storiesOf('Patterns (Sub-Patterns)|ContentItem', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme,
    },
  })
  .add('Default', () => {
    const heading = text('Component title:', 'Lorem ipsum dolor sit amet.');
    const copy = text(
      'Component copy:',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed interdum tortor. Sed id pellentesque diam. In ut quam id mauris finibus efficitur quis ut arcu. Praesent purus turpis, venenatis eget odio et, tincidunt bibendum sem. Curabitur pretium elit non blandit lobortis. Donec quis pretium odio, in dignissim sapien.'
    );

    const types = {
      jump: 'jump',
      local: 'local',
      external: 'external',
    };

    const cta = {
      copy: text('cta.copy', 'Lorem ipsum dolor sit amet'),
      type: select('cta.type', types, types.local),
      href: text('cta.href', 'https://example.com'),
    };

    const mediaType = select(
      'mediaType (optional)',
      ['image', 'video', 'none'],
      'image'
    );

    const image = {
      image: {
        sources: object('Image assets:', [
          {
            src: 'https://dummyimage.com/288x144/ee5396/161616&text=2:1',
            breakpoint: 'sm',
          },
          {
            src: 'https://dummyimage.com/448x224/ee5396/161616&text=2:1',
            breakpoint: 'md',
          },
          {
            src: 'https://dummyimage.com/352x176/ee5396/161616&text=2:1',
            breakpoint: 'lg',
          },
        ]),
        alt: text('alt', 'content item image'),
        defaultSrc: text(
          'default image:',
          'https://dummyimage.com/352x176/ee5396/161616&text=2:1'
        ),
      },
      heading: text('image caption:', 'this is an image caption'),
    };

    const video = {
      videoId: '0_uka1msg4',
      showDescription: true,
    };

    const mediaData = mediaType === 'image' ? image : video;

    const inverse = boolean('inverse', false);

    return (
      <div
        className={cx('bx--grid', {
          [`${prefix}--content-item--inverse`]: inverse,
        })}>
        <div className="bx--row">
          <div className="bx--col-sm-4 bx--col-lg-8 bx--offset-lg-4">
            <ContentItem
              inverse={inverse}
              heading={heading}
              copy={copy}
              mediaType={mediaType}
              mediaData={mediaData}
              cta={cta}
            />
          </div>
        </div>
      </div>
    );
  });
