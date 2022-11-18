/**
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './CTA.stories.scss';
import { boolean, select, text } from '@storybook/addon-knobs';
import CTA from '../CTA';
import imgLg1x1 from '../../../../../storybook-images/assets/720/fpo--1x1--720x720--002.jpg';
import React from 'react';
import readme from '../README.stories.mdx';

const types = ['local', 'download', 'jump', 'external', 'video', 'default'];
const featureTypes = ['local', 'download', 'jump', 'external', 'video'];
const buttonCopy = ['See more use cases', 'Try for free'];
const copy = ['Explore AI uses cases in all industries', 'Contact sales'];
const placement = ['left', 'right'];

const urlBy = {
  download:
    'https://www.ibm.com/annualreport/assets/downloads/IBM_Annual_Report_2019.pdf',
  jump: '#example',
  local: 'https://www.example.com',
  external: 'https://www.example.com',
  default: 'https://www.example.com',
};

const miscCTAData = {
  text({ type, customVideoTitle, customVideoDescription }) {
    return {
      type: type,
      href: urlBy[type],
      copy: copy[0],
      media: {
        src: '1_9h94wo6b',
        type: 'video',
        title: customVideoTitle,
        description: customVideoDescription,
      },
    };
  },
  card({ type, customVideoTitle, customVideoDescription, disableImage }) {
    return {
      disableImage: disableImage,
      heading: type !== 'video' ? copy[0] : '',
      cta: {
        href: urlBy[type],
      },
      media: {
        src: '1_9h94wo6b',
        type: 'video',
        title: customVideoTitle,
        description: customVideoDescription,
      },
    };
  },
  feature({ featureHeading, type, customVideoTitle, customVideoDescription }) {
    return {
      heading: copy[0],
      card: {
        heading: featureHeading || copy[1],
        cta: {
          type: type,
          href: urlBy[type],
          media: {
            src: '1_9h94wo6b',
            type: 'video',
            title: customVideoTitle,
            description: customVideoDescription,
          },
        },
        image: {
          defaultSrc: imgLg1x1,
          alt: 'Image alt text',
        },
      },
    };
  },
  button({ type, customVideoTitle, customVideoDescription }) {
    return {
      buttons: [
        {
          type: type[0],
          href: urlBy[type[0]],
          copy: buttonCopy[0],
          media: {
            src: '1_9h94wo6b',
            type: 'video',
            title: customVideoTitle[0],
            description: customVideoDescription[0],
          },
        },
        {
          type: type[1],
          href: urlBy[type[1]],
          copy: buttonCopy[1],
          media: {
            src: '1_sf5ovm7u',
            type: 'video',
            title: customVideoTitle[1],
            description: customVideoDescription[1],
          },
        },
      ],
    };
  },
};

const wrapper = (CTA, style, type) => {
  return (
    <div className="bx--grid cta-grid">
      {style === 'card' ? (
        <div className="bx--row">
          <div className="bx--col-sm-4 bx--col-md-3 bx--col-lg-6 bx--col-xlg-4">
            {CTA}
          </div>
        </div>
      ) : style === 'feature' ? (
        <div className="bx--row">
          <div className="bx--col-sm-4 bx--col-lg-8 cta-feature-container">
            {CTA}
          </div>
        </div>
      ) : (
        <div className="bx--row">
          <div className="bx--col-sm-4 bx--col-lg-8 bx--offset-lg-4">{CTA}</div>
        </div>
      )}
      {type === 'jump' || type?.[0] === 'jump' || type?.[1] === 'jump' ? (
        <div
          className="bx--row"
          style={{ marginTop: '80px', marginBottom: '80px' }}
        >
          <div className="bx--col-sm-4 bx--col-lg-8 bx--offset-lg-4">
            {(() => {
              let content = [];
              for (let i = 0; i < 10; i++) {
                if (i === 4) {
                  content.push(
                    <h4 id="example" style={{ marginBottom: '32px' }}>
                      Example
                    </h4>
                  );
                }
                content.push(
                  <p style={{ marginBottom: '32px' }}>
                    {
                      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                    }
                  </p>
                );
              }
              return content;
            })()}
          </div>
        </div>
      ) : null}
    </div>
  );
};

const props = {
  text: () => {
    const knobs = props.card();
    const iconPlacement = select(
      'Icon Placement (iconPlacement)',
      placement,
      placement[1]
    );

    const customVideoTitle =
      knobs.type === 'video'
        ? text('Custom video title', 'Custom video title')
        : null;
    const customVideoDescription =
      knobs.type === 'video'
        ? text('Custom video description', 'Custom video description')
        : null;
    return {
      ...knobs,
      iconPlacement,
      ...miscCTAData['text']({
        type: knobs.type,
        customVideoTitle,
        customVideoDescription,
      }),
    };
  },
  button: () => {
    const type = [
      select('Button 1 type (buttons[0].type)', [...types], types[0]),
      select('Button 2 type (buttons[1].type)', [...types], types[0]),
    ];

    const customVideoTitles = type
      .filter((ctaType) => ctaType === 'video')
      .map((_ctaType, index) =>
        text(
          `Button ${index + 1} custom video title`,
          `Custom video title ${index + 1}`
        )
      );
    const customVideoDescriptions = type
      .filter((ctaType) => ctaType === 'video')
      .map((_ctaType, index) =>
        text(
          `Button ${index + 1}`,
          `This is a custom video description for CTA Button ${index + 1}.`
        )
      );
    return {
      type,
      ...miscCTAData['button']({
        type,
        customVideoTitle: customVideoTitles,
        customVideoDescription: customVideoDescriptions,
      }),
    };
  },
  card: () => {
    const type = select('type', types, types[0]);

    const customVideoTitle =
      type === 'video'
        ? text('Custom video title', 'Custom video title')
        : null;
    const customVideoDescription =
      type === 'video'
        ? text('Custom video description', 'Custom video description')
        : null;
    const disableImage =
      type === 'video' ? boolean('No Video Poster', false) : null;
    return {
      type,
      ...miscCTAData['card']({
        type,
        customVideoTitle,
        customVideoDescription,
        disableImage,
      }),
    };
  },
  feature: () => {
    const type = select('CTA type:', featureTypes, featureTypes[0]);
    const featureHeading = text(
      'Heading:',
      'Explore AI use cases in all industries'
    );

    const customVideoTitle =
      type === 'video'
        ? text('Custom video title', 'Custom video title')
        : null;
    const customVideoDescription =
      type === 'video'
        ? text('Custom video description', 'Custom video description')
        : null;
    return {
      featureHeading,
      type,
      ...miscCTAData['feature']({
        featureHeading,
        type,
        customVideoTitle,
        customVideoDescription,
      }),
    };
  },
};

export default {
  title: 'Components/CTA',
  parameters: {
    ...readme.parameters,
  },
};

export const Text = () => {
  return wrapper(<CTA style="text" {...props.text()} />, props.text().type);
};

Text.story = {
  name: 'Text',
  parameters: {
    percy: {
      name: 'Components|CTA: Text',
    },
  },
};

export const Button = () => {
  return wrapper(<CTA style="button" {...props.button()} />, props.button.type);
};

Button.story = {
  name: 'Button',
  parameters: {
    percy: {
      name: 'Components|CTA: Button',
    },
  },
};

export const Card = () => {
  return wrapper(
    <CTA style="card" {...props.card()} />,
    'card',
    props.card().type
  );
};

Card.story = {
  name: 'Card',
  parameters: {
    percy: {
      name: 'Components|CTA: Card',
    },
  },
};

export const Feature = () => {
  if (props.feature().type !== 'video') {
    props.feature().card.heading = props.feature().featureHeading;
  }

  return wrapper(
    <CTA style="feature" {...props.feature()} />,
    'feature',
    props.feature().type
  );
};

Feature.story = {
  name: 'Feature',
  parameters: {
    percy: {
      name: 'Components|CTA: Feature',
    },
  },
};
