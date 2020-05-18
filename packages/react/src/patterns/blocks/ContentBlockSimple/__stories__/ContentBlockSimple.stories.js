/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { select, text, object, boolean } from '@storybook/addon-knobs';
import ContentBlockSimple from '../ContentBlockSimple';
import cx from 'classnames';
import { LinkList } from '../../../../components/LinkList';
import React from 'react';
import readme from '../README.stories.mdx';
import settings from 'carbon-components/es/globals/js/settings';

const { prefix } = settings;

const ctaStyles = {
  text: 'text',
  card: 'card',
};

const ctaTypes = {
  local: 'local',
  jump: 'jump',
  external: 'external',
};

const mediaDataByType = {
  image: {
    heading: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: {
      sources: [
        {
          src: 'https://dummyimage.com/320x180/ee5396/161616&text=16:9',
          breakpoint: 320,
        },
        {
          src: 'https://dummyimage.com/400x225/ee5396/161616&text=16:9',
          breakpoint: 400,
        },
        {
          src: 'https://dummyimage.com/672x378/ee5396/161616&text=16:9',
          breakpoint: 672,
        },
      ],
      alt: 'Image alt text',
      defaultSrc: 'https://dummyimage.com/672x378/ee5396/161616&text=16:9',
    },
  },
  video: {
    videoId: '0_uka1msg4',
    showCaption: true,
  },
};

const copy = `Lorem ipsum *dolor* sit amet, consectetur adipiscing elit. Aenean et ultricies est.
  Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales
  nulla quis, *consequat* libero. Here are
  some common categories:

  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.

  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
`;

/**
 * @param {object} options The options.
 * @param {string} options.groupId The knob group ID.
 * @returns {object} The knobs data.
 */
const getBaseKnobs = ({ groupId }) => {
  const mediaType = select(
    'mediaType (optional)',
    ['image', 'video', 'none'],
    'image',
    groupId
  );
  return {
    copy,
    heading: text(
      'Heading (required)',
      'Curabitur malesuada varius mi eu posuere',
      groupId
    ),
    mediaType,
    mediaData: mediaDataByType[mediaType],
    cta: {
      cta: {
        href: 'https://www.ibm.com',
      },
      style: select('CTA style', ctaStyles, ctaStyles.card, groupId),
      type: select('CTA type', ctaTypes, ctaTypes.local, groupId),
      heading: 'Lorem ipsum dolor sit amet',
      copy: 'Lorem ipsum dolor sit ametttt',
    },
  };
};

export default {
  title: 'Patterns (Blocks)|ContentBlockSimple',

  parameters: {
    ...readme.parameters,
  },
};

export const Default = ({ parameters }) => {
  const { inverse, copy, heading, mediaType, mediaData, cta } =
    parameters?.props?.ContentBlockSimple ?? {};
  return (
    <div
      className={cx('bx--grid', {
        [`${prefix}--content-block-simple--inverse`]: inverse,
      })}>
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-8 bx--offset-lg-4 content-block-story">
          <ContentBlockSimple
            inverse={inverse}
            copy={copy}
            heading={heading}
            mediaType={mediaType}
            mediaData={mediaData}
            cta={cta}
          />
        </div>
      </div>
    </div>
  );
};

Default.story = {
  parameters: {
    knobs: {
      ContentBlockSimple: ({ groupId }) => {
        const knobs = getBaseKnobs({ groupId });
        return {
          ...knobs,
          inverse: boolean('inverse', false, groupId),
        };
      },
    },
  },
};

export const WithAsideElements = ({ parameters }) => {
  const { copy, heading, mediaType, mediaData, cta, aside } =
    parameters?.props?.ContentBlockSimple ?? {};
  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-12 bx--offset-lg-4 content-block-story">
          <ContentBlockSimple
            copy={copy}
            heading={heading}
            mediaType={mediaType}
            mediaData={mediaData}
            cta={cta}
            aside={aside}
          />
        </div>
      </div>
    </div>
  );
};

WithAsideElements.story = {
  name: 'With aside elements',
  parameters: {
    knobs: {
      ContentBlockSimple: ({ groupId }) => {
        const linkListProps = {
          heading: text('link list heading:', 'Tutorials'),
          items: object('link list items array', [
            {
              type: 'local',
              copy: 'Containerization A Complete Guide',
              cta: {
                href: 'https://ibm.com',
              },
            },
            {
              type: 'external',
              copy: 'Why should you use microservices and containers',
              cta: {
                href: 'https://ibm.com',
              },
            },
          ]),
        };
        const knobs = getBaseKnobs({ groupId });
        return {
          ...knobs,
          aside: {
            items: <LinkList style="card" {...linkListProps} />,
            border: boolean('border', false, groupId),
          },
        };
      },
    },
  },
};
