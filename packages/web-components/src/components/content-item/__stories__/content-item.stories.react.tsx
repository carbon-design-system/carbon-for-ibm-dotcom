/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { boolean, select } from '@storybook/addon-knobs';
import React from 'react';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import C4DContentItem from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item';
import C4DContentItemHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-heading';
import C4DContentItemCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-copy';
import C4DLinkWithIcon from '@carbon/ibmdotcom-web-components/es/components-react/link-with-icon/link-with-icon';
import C4DImage from '@carbon/ibmdotcom-web-components/es/components-react/image/image';
import C4DVideoPlayerContainer from '@carbon/ibmdotcom-web-components/es/components-react/video-player/video-player-container';
import C4DImageLogo from '@carbon/ibmdotcom-web-components/es/components-react/card/image-logo';

import imgLg1x1 from '../../../../.storybook/storybook-images/assets/720/fpo--1x1--720x720--001.jpg';
import logoMicrosoft2x1 from '../../../../.storybook/storybook-images/assets/logos/logo-microsoft--2x1.png';

import textNullable from '../../../../.storybook/knob-text-nullable';
import readme from './README.stories.react.mdx';

const contentItemTypeOptions = {
  Text: 'text',
  Statistics: 'statistics',
  Pictogram: 'pictogram',
  Media: 'media',
  Logo: 'logo',
};

const app = (
  <svg
    //@ts-ignore
    slot="media"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32">
    <defs>
      <linearGradient
        id="A"
        x1="646.29"
        x2="659.58"
        y1="1117.53"
        y2="1135.58"
        gradientTransform="matrix(.83118 .556 .27244 -.40728 -841.69 103.15)"
        gradientUnits="userSpaceOnUse">
        <stop offset="0.3"></stop>
        <stop offset="1" stopOpacity="0"></stop>
      </linearGradient>
      <linearGradient
        id="B"
        x1="-925.17"
        x2="-914.09"
        y1="-1066.96"
        y2="-1051.91"
        gradientTransform="rotate(146.22 -537.793 -106.967) scale(1 .49)"
        gradientUnits="userSpaceOnUse">
        <stop offset="0.3"></stop>
        <stop offset="0.9" stopOpacity="0"></stop>
      </linearGradient>
      <linearGradient
        id="C"
        x1="-6341.42"
        x2="-6328.12"
        y1="19700.69"
        y2="19718.74"
        gradientTransform="rotate(-146.22 -1683.193 -5807.885) scale(1 -.49)"
        gradientUnits="userSpaceOnUse">
        <stop offset="0.32"></stop>
        <stop offset="0.35" stopOpacity="0.8"></stop>
        <stop offset="0.7" stopOpacity="0"></stop>
      </linearGradient>
      <mask
        id="D"
        width="32"
        height="32"
        x="0"
        y="0"
        maskUnits="userSpaceOnUse">
        <g strokeWidth="0">
          <path
            fill="#fff"
            d="M16 1C12.07 1 8.3 2.53 5.5 5.29l1.4 1.43C9.33 4.33 12.59 3 16 3.01c.98 0 1.93.11 2.84.32-3.4.92-5.92 4.03-5.92 7.72a7.95 7.95 0 00.33 2.25c-.71-.21-1.45-.31-2.19-.31-3.7 0-6.82 2.53-7.73 5.96-.23-.96-.34-1.94-.35-2.93 0-2.12.49-4.13 1.46-6L2.67 9.1a15.02 15.02 0 00-1.69 6.92c0 8.27 6.73 15 15 15 3.95 0 7.68-1.52 10.5-4.29l-1.4-1.43a12.904 12.904 0 01-9.1 3.71 12.98 12.98 0 01-9.31-3.94 5.98 5.98 0 01-1.62-4.09c0-3.31 2.69-6 6-6 3.32 0 6 2.7 6 6.01a5.67 5.67 0 01-.1 1.09l1.97.37a7.98 7.98 0 00-.19-3.73 8.1 8.1 0 002.19.31c3.71 0 6.83-2.54 7.73-5.97.22.95.34 1.93.34 2.94 0 2.12-.49 4.13-1.46 5.99l1.77.92a15.02 15.02 0 001.69-6.92c0-8.27-6.73-15-15-15zm4.93 16.03c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"></path>
          <path fill="url(#A)" d="M8 9L0 0h16l2.31 3.3L8 9z"></path>
          <path fill="url(#B)" d="M12 31l4.39-9L6 21 2 31h10z"></path>
          <path fill="url(#C)" d="M24 23l8 9H16l-2.3-3.31L24 23z"></path>
          <path d="M16 31h-4.28L15 22h2l-1 9z"></path>
        </g>
      </mask>
      <linearGradient
        id="E"
        x1="0"
        x2="32"
        y1="32"
        y2="0"
        gradientUnits="userSpaceOnUse">
        <stop offset="0.1" stopColor="#a56eff"></stop>
        <stop offset="0.9" stopColor="#0f62fe"></stop>
      </linearGradient>
    </defs>
    <g mask="url(#D)">
      <path fill="url(#E)" d="M0 0h32v32H0V0z"></path>
    </g>
    <g fill="#001d6c">
      <circle cx="6" cy="6" r="2"></circle>
      <circle cx="26" cy="26" r="2"></circle>
      <path d="M16 31c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.65 0-3 1.35-3 3s1.35 3 3 3 3-1.35 3-3-1.35-3-3-3z"></path>
    </g>
  </svg>
);
const pictogram = (
  <svg
    // @ts-ignore
    slot="media"
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    stroke="currentColor"
    ariaLabel="Pictogram description"
    className="cds--pictogram-item__pictogram"
    data-autoid="c4d--pictogram-item__pictogram"
    viewBox="0 0 48 48">
    <path
      fill="none"
      strokeLinejoin="round"
      strokeMiterlimit="10"
      strokeWidth="1.106"
      d="M44.211 36.138H3.789c-1.71 0-3.11-1.366-3.11-3.035V7.31c0-1.669 1.4-3.034 3.11-3.034h40.422c1.71 0 3.11 1.365 3.11 3.034v25.793c0 1.67-1.4 3.035-3.11 3.035zm-31.094 7.586h21.766M24 36.138v7.586M.68 28.552h46.64"></path>
  </svg>
);

export const Default = (args) => {
  const {
    type,
    heading,
    horizontal,
    mediaType,
    pictogramType,
    copy,
    showCopy,
    ctaCopy,
  } = args?.ContentItem ?? {};
  return (
    <C4DContentItem horizontal={horizontal || undefined}>
      {type === 'statistics' ? <span slot="statistics">10%</span> : ``}
      {type === 'pictogram'
        ? pictogramType === 'pictogram'
          ? pictogram
          : pictogramType === 'app icon'
          ? app
          : ``
        : ``}
      {type === 'media' ? (
        mediaType === 'image' ? (
          <C4DImage
            slot="media"
            alt="Alt image text"
            default-src={imgLg1x1}></C4DImage>
        ) : mediaType === 'video' ? (
          <C4DVideoPlayerContainer
            slot="media"
            video-id="0_ibuqxqbe"
            hide-caption></C4DVideoPlayerContainer>
        ) : (
          ``
        )
      ) : (
        ``
      )}
      {type === 'logo' ? (
        <C4DImageLogo
          alt="Microsoft logo"
          slot="media"
          default-src={logoMicrosoft2x1}></C4DImageLogo>
      ) : (
        ``
      )}
      <C4DContentItemHeading>{heading}</C4DContentItemHeading>
      {showCopy ? <C4DContentItemCopy>{copy}</C4DContentItemCopy> : ''}
      <C4DLinkWithIcon
        slot="footer"
        cta-type="local"
        href="https://www.example.com">
        {ctaCopy}
      </C4DLinkWithIcon>
    </C4DContentItem>
  );
};

export default {
  title: 'Components/Content item',
  decorators: [
    (story) => {
      return (
        <>
          <div className="cds--grid">
            <div className="cds--row">
              <div className="cds--col-sm-4 cds--col-lg-8">{story()}</div>
            </div>
          </div>
        </>
      );
    },
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
    knobs: {
      ContentItem: () => {
        const type = select(
          'Content item type',
          contentItemTypeOptions,
          contentItemTypeOptions.Text
        );
        const mediaType =
          type === 'media'
            ? select('Media type:', ['image', 'video'], 'image')
            : '';
        const pictogramType =
          type === 'pictogram'
            ? select('Pictogram type', ['pictogram', 'app icon'], 'pictogram')
            : '';
        const horizontal =
          type === 'pictogram' || mediaType === 'image'
            ? boolean('Horizontal', false)
            : '';
        return {
          type,
          mediaType,
          pictogramType,
          horizontal,
          heading: textNullable('Heading:', 'Natural language understanding'),
          showCopy: boolean('Copy:', true),
          copy:
            'This area of NLP takes "real world" text and applies a symbolic ' +
            'system for a machine to interpret its meaning, using formal logic; structures ' +
            'that describe the various relationships between concepts (ontologies); and other semantic tools.',
          ctaCopy: textNullable('CTA copy:', 'Learn more about NLP'),
        };
      },
    },
  },
};
