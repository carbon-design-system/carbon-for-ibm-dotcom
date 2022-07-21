/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { select, text, boolean } from '@storybook/addon-knobs';
import ContentBlockSimple from '../ContentBlockSimple';
import imgLg16x9 from '../../../../../storybook-images/assets/720/fpo--16x9--720x405--002.jpg';
import imgMd16x9 from '../../../../../storybook-images/assets/480/fpo--16x9--480x270--002.jpg';
import imgSm1x1 from '../../../../../storybook-images/assets/320/fpo--1x1--320x320--002.jpg';
import { LinkList } from '../../../components/LinkList';
import React from 'react';
import readme from '../README.stories.mdx';

const ctaStyles = {
  text: 'text',
  card: 'card',
};

const ctaTypes = {
  local: 'local',
  jump: 'jump',
  external: 'external',
};

const image = {
  heading: 'Mauris iaculis eget dolor nec hendrerit.',
  image: {
    sources: [
      {
        src: imgSm1x1,
        breakpoint: 320,
      },
      {
        src: imgMd16x9,
        breakpoint: 400,
      },
      {
        src: imgLg16x9,
        breakpoint: 672,
      },
    ],
    alt: 'Image alt text',
    defaultSrc: imgLg16x9,
  },
};

const video = {
  videoId: '1_9h94wo6b',
  showCaption: true,
};

const copy = `Lorem ipsum *dolor* sit amet, consectetur adipiscing elit. Aenean et ultricies est.
  Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales
  nulla quis, *consequat* libero. Here are
  some common categories:

  Lorem ipsum dolor sit amet, [consectetur adipiscing](https://www.ibm.com) elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.

  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.

  - [list item](https://www.ibm.com)
    1. list item 1a
  1. list item 2
     - list item 2a
`;

/**
 * @returns {object} The knobs data.
 */
const getBaseKnobs = () => {
  return {
    copy,
    heading: text(
      'Heading (required)',
      'Curabitur malesuada varius mi eu posuere'
    ),
    cta: {
      cta: {
        href: 'https://www.ibm.com',
      },
      style: select('CTA style', ctaStyles, ctaStyles.card),
      type: select('CTA type', ctaTypes, ctaTypes.local),
      heading: 'Lorem ipsum dolor sit ametttt',
    },
  };
};

const props = {
  default: () => {
    const knobs = getBaseKnobs();
    return {
      ...knobs,
    };
  },
  withLinkList: () => {
    const linkListProps = {
      heading: text('Link list heading (heading):', 'Tutorials'),
      items: [
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
      ],
    };
    const knobs = getBaseKnobs();
    return {
      ...knobs,
      aside: {
        items: <LinkList style="card" {...linkListProps} />,
        border: boolean('border', false),
      },
    };
  },
};

export default {
  title: 'Components/Content block simple',
  parameters: {
    ...readme.parameters,
  },
};

export const Default = () => {
  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-8 bx--offset-lg-4 content-block-story">
          <ContentBlockSimple {...props.default()} />
        </div>
      </div>
    </div>
  );
};

export const WithImage = () => {
  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-8 bx--offset-lg-4 content-block-story">
          <ContentBlockSimple
            {...props.default()}
            mediaType="image"
            mediaData={image}
          />
        </div>
      </div>
    </div>
  );
};

WithImage.story = {
  name: 'With image',
};

export const WithVideo = () => {
  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-8 bx--offset-lg-4 content-block-story">
          <ContentBlockSimple
            {...props.default()}
            mediaType="video"
            mediaData={video}
          />
        </div>
      </div>
    </div>
  );
};

WithVideo.story = {
  name: 'With video',
  parameters: {
    percy: {
      skip: true,
    },
  },
};

export const WithLinkList = () => {
  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-12 bx--offset-lg-4 content-block-story">
          <ContentBlockSimple
            {...props.withLinkList()}
            mediaType="image"
            mediaData={image}
          />
        </div>
      </div>
    </div>
  );
};

WithLinkList.story = {
  name: 'With link list',
};
