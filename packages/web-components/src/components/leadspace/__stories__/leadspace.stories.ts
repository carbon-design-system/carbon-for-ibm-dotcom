/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { text, select, number } from '@storybook/addon-knobs';
import { html } from 'lit-element';
import ArrowRight20 from 'carbon-web-components/es/icons/arrow--right/20.js';
import ArrowDown20 from 'carbon-web-components/es/icons/arrow--down/20.js';
import Pdf20 from 'carbon-web-components/es/icons/PDF/20.js';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';

// Above import is interface-only ref and thus code won't be brought into the build
import '../index';
import textNullable from '../../../../.storybook/knob-text-nullable';
import readme from './README.stories.mdx';

import leadspaceImg from '../../../../../storybook-images/assets/leadspace/leadspaceMax.jpg';
import { LEADSPACE_SIZE } from '../defs';

const navigationOptions = ['with Tag group (using Tag link)', 'with Breadcrumbs', 'none'];

const navigationWithTagGroup = html`
  <dds-tag-group slot="navigation">
    <dds-tag-link href="https://example.com">Marketing Analytics</dds-tag-link>
    <dds-tag-link href="https://example.com">Cloud</dds-tag-link>
  </dds-tag-group>
`;

const navigationWithBreadcrumbs = html`
  <dds-breadcrumb slot="navigation">
    <dds-breadcrumb-item>
      <dds-breadcrumb-link href="/#">Breadcrumb 1</dds-breadcrumb-link>
    </dds-breadcrumb-item>
    <dds-breadcrumb-item>
      <dds-breadcrumb-link href="/#">Breadcrumb 2</dds-breadcrumb-link>
    </dds-breadcrumb-item>
    <dds-breadcrumb-item>
      <dds-breadcrumb-link href="/#" aria-current="page">Breadcrumb 3</dds-breadcrumb-link>
    </dds-breadcrumb-item>
  </dds-breadcrumb>
`;

export const TallWithNoImage = ({ parameters }) => {
  const { title, copy, buttons, navElements } = parameters?.props?.LeadSpace ?? {};
  return html`
    <dds-leadspace size="${LEADSPACE_SIZE.NONE}">
      ${navElements === navigationOptions[0] ? navigationWithTagGroup : ``}
      ${navElements === navigationOptions[1] ? navigationWithBreadcrumbs : ``}
      <dds-leadspace-heading>${ifNonNull(title)}</dds-leadspace-heading>
      ${ifNonNull(copy)}
      <dds-button-group slot="action">
        ${buttons.map(elem => {
          return html`
            <dds-button-group-item aria-label="${elem.label}" href="${elem.href}"
              >${elem.copy}${elem.renderIcon}</dds-button-group-item
            >
          `;
        })}
      </dds-button-group>
    </dds-leadspace>
  `;
};

export const TallWithImage = ({ parameters }) => {
  const { alt, defaultSrc, gradientStyleScheme, title, copy, buttons, navElements } = parameters?.props?.LeadSpace ?? {};
  const image = defaultSrc || leadspaceImg;
  return html`
    <dds-leadspace
      size="${LEADSPACE_SIZE.NONE}"
      gradient-style-scheme="${ifNonNull(gradientStyleScheme)}"
      alt="${ifNonNull(alt)}"
      default-src="${ifNonNull(defaultSrc)}"
    >
      ${navElements === navigationOptions[0] ? navigationWithTagGroup : ``}
      ${navElements === navigationOptions[1] ? navigationWithBreadcrumbs : ``}
      <dds-leadspace-heading>${ifNonNull(title)}</dds-leadspace-heading>
      ${ifNonNull(copy)}
      <dds-button-group slot="action">
        ${buttons.map(elem => {
          return html`
            <dds-button-group-item aria-label="${elem.label}" href="${elem.href}"
              >${elem.copy}${elem.renderIcon}</dds-button-group-item
            >
          `;
        })}
      </dds-button-group>
      <dds-leadspace-image slot="image" class="bx--image" alt="${ifNonNull(alt)}" default-src="${image}">
        <dds-image-item media="(min-width: 672px)" srcset="${image}"></dds-image-item>
        <dds-image-item media="(min-width: 0)" srcset="${image}"></dds-image-item>
      </dds-leadspace-image>
    </dds-leadspace>
  `;
};

export const Centered = ({ parameters }) => {
  const { title, copy, buttons, navElements } = parameters?.props?.LeadSpace ?? {};
  return html`
    <dds-leadspace size="${LEADSPACE_SIZE.NONE}" type="centered">
      ${navElements === navigationOptions[0] ? navigationWithTagGroup : ``}
      ${navElements === navigationOptions[1] ? navigationWithBreadcrumbs : ``}
      <dds-leadspace-heading>${ifNonNull(title)}</dds-leadspace-heading>
      ${ifNonNull(copy)}
      <dds-button-group slot="action">
        ${buttons.map(elem => {
          return html`
            <dds-button-group-item aria-label="${elem.label}" href="${elem.href}"
              >${elem.copy}${elem.renderIcon}</dds-button-group-item
            >
          `;
        })}
      </dds-button-group>
    </dds-leadspace>
  `;
};

export const CenteredWithImage = ({ parameters }) => {
  const { alt, defaultSrc, gradient, title, copy, buttons, navElements } = parameters?.props?.LeadSpace ?? {};
  const image = defaultSrc || leadspaceImg;
  return html`
    <dds-leadspace
      size="${LEADSPACE_SIZE.NONE}"
      ?gradient="${ifNonNull(gradient)}"
      alt="${ifNonNull(alt)}"
      default-src="${ifNonNull(defaultSrc)}"
      type="centered"
    >
      ${navElements === navigationOptions[0] ? navigationWithTagGroup : ``}
      ${navElements === navigationOptions[1] ? navigationWithBreadcrumbs : ``}
      <dds-leadspace-heading>${ifNonNull(title)}</dds-leadspace-heading>
      ${ifNonNull(copy)}
      <dds-button-group slot="action">
        ${buttons.map(elem => {
          return html`
            <dds-button-group-item aria-label="${elem.label}" href="${elem.href}"
              >${elem.copy}${elem.renderIcon}</dds-button-group-item
            >
          `;
        })}
      </dds-button-group>
      <dds-leadspace-image slot="image" class="bx--image" alt="${ifNonNull(alt)}" default-src="${image}">
        <dds-image-item media="(min-width: 672px)" srcset="${image}"></dds-image-item>
        <dds-image-item media="(min-width: 0)" srcset="${image}"></dds-image-item>
      </dds-leadspace-image>
    </dds-leadspace>
  `;
};

export const Medium = ({ parameters }) => {
  const { title, copy, buttons, navElements } = parameters?.props?.LeadSpace ?? {};
  return html`
    <dds-leadspace size="${LEADSPACE_SIZE.MEDIUM}">
      ${navElements === navigationOptions[0] ? navigationWithTagGroup : ``}
      ${navElements === navigationOptions[1] ? navigationWithBreadcrumbs : ``}
      <dds-leadspace-heading>${ifNonNull(title)}</dds-leadspace-heading>
      ${ifNonNull(copy)}
      <dds-button-group slot="action">
        ${buttons.map(elem => {
          return html`
            <dds-button-group-item aria-label="${elem.label}" href="${elem.href}"
              >${elem.copy}${elem.renderIcon}</dds-button-group-item
            >
          `;
        })}
      </dds-button-group>
    </dds-leadspace>
  `;
};

export const MediumWithImage = ({ parameters }) => {
  const { alt, defaultSrc, gradientStyleScheme, title, copy, buttons, navElements } = parameters?.props?.LeadSpace ?? {};
  const image = defaultSrc || leadspaceImg;
  return html`
    <dds-leadspace
      size="${LEADSPACE_SIZE.MEDIUM}"
      gradient-style-scheme="${ifNonNull(gradientStyleScheme)}"
      alt="${ifNonNull(alt)}"
      default-src="${ifNonNull(defaultSrc)}"
    >
      ${navElements === navigationOptions[0] ? navigationWithTagGroup : ``}
      ${navElements === navigationOptions[1] ? navigationWithBreadcrumbs : ``}
      <dds-leadspace-heading>${ifNonNull(title)}</dds-leadspace-heading>
      ${ifNonNull(copy)}
      <dds-button-group slot="action">
        ${buttons.map(elem => {
          return html`
            <dds-button-group-item aria-label="${elem.label}" href="${elem.href}"
              >${elem.copy}${elem.renderIcon}</dds-button-group-item
            >
          `;
        })}
      </dds-button-group>
      <dds-leadspace-image slot="image" class="bx--image" alt="${ifNonNull(alt)}" default-src="${image}">
        <dds-image-item media="(min-width: 672px)" srcset="${image}"></dds-image-item>
        <dds-image-item media="(min-width: 0)" srcset="${image}"></dds-image-item>
      </dds-leadspace-image>
    </dds-leadspace>
  `;
};

export const Super = ({ parameters }) => {
  const { title, copy, buttons, navElements } = parameters?.props?.LeadSpace ?? {};
  return html`
    <dds-leadspace size="${LEADSPACE_SIZE.SUPER}">
      ${navElements === navigationOptions[0] ? navigationWithTagGroup : ``}
      ${navElements === navigationOptions[1] ? navigationWithBreadcrumbs : ``}
      <dds-leadspace-heading>${ifNonNull(title)}</dds-leadspace-heading>
      ${ifNonNull(copy)}
      <dds-button-group slot="action">
        ${buttons.map(elem => {
          return html`
            <dds-button-group-item aria-label="${elem.label}" href="${elem.href}"
              >${elem.copy}${elem.renderIcon}</dds-button-group-item
            >
          `;
        })}
      </dds-button-group>
    </dds-leadspace>
  `;
};

export const SuperWithImage = ({ parameters }) => {
  const { alt, defaultSrc, gradientStyleScheme, title, copy, buttons, navElements } = parameters?.props?.LeadSpace ?? {};
  const image = defaultSrc || leadspaceImg;
  return html`
    <dds-leadspace
      size="${LEADSPACE_SIZE.SUPER}"
      gradient-style-scheme="${ifNonNull(gradientStyleScheme)}"
      alt="${ifNonNull(alt)}"
      default-src="${ifNonNull(defaultSrc)}"
    >
      ${navElements === navigationOptions[0] ? navigationWithTagGroup : ``}
      ${navElements === navigationOptions[1] ? navigationWithBreadcrumbs : ``}
      <dds-leadspace-heading>${ifNonNull(title)}</dds-leadspace-heading>
      ${ifNonNull(copy)}
      <dds-button-group slot="action">
        ${buttons.map(elem => {
          return html`
            <dds-button-group-item aria-label="${elem.label}" href="${elem.href}"
              >${elem.copy}${elem.renderIcon}</dds-button-group-item
            >
          `;
        })}
      </dds-button-group>
      <dds-leadspace-image slot="image" class="bx--image" alt="${ifNonNull(alt)}" default-src="${image}">
        <dds-image-item media="(min-width: 672px)" srcset="${image}"></dds-image-item>
        <dds-image-item media="(min-width: 0)" srcset="${image}"></dds-image-item>
      </dds-leadspace-image>
    </dds-leadspace>
  `;
};

const getAriaLabel = type => {
  switch (type) {
    case 'ArrowDown20':
      return 'anchor link';
    case 'Pdf20':
      return 'pdf link';
    default:
      return '';
  }
};

const iconMap = {
  ArrowRight20: ArrowRight20({ slot: 'icon' }),
  ArrowDown20: ArrowDown20({ slot: 'icon' }),
  Pdf20: Pdf20({ slot: 'icon' }),
};

const iconOptions = {
  None: null,
  'Arrow Right': 'ArrowRight20',
  'Arrow Down': 'ArrowDown20',
  PDF: 'Pdf20',
};

export default {
  title: 'Components/Lead space',
  decorators: [
    story => html`
      <div class="bx--grid bx--no-gutter dds-ce-demo-devenv--grid--stretch">
        ${story()}
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    'carbon-theme': { preventReload: true },
    hasGrid: true,
    hasVerticalSpacingInComponent: true,
    knobs: {
      LeadSpace: ({ groupId }) => ({
        navElements: select('navigation elements (optional)', navigationOptions, navigationOptions[2], groupId),
        title: text('title (title):', 'Heading can go on two lines max', groupId),
        copy: text('copy (copy):', 'Use this area for a short line of copy to support the title', groupId),
        buttons: Array.from({
          length: number('Number of buttons', 2, {}, groupId),
        }).map((_, i) => {
          const icon = select(`Icon ${i + 1}`, iconOptions, iconOptions['Arrow Right'], groupId) ?? 0;
          return {
            href: textNullable(`Link ${i + 1}`, `https://example.com`, groupId),
            copy: text(`Button ${i + 1}`, `Button ${i + 1}`, groupId),
            renderIcon: iconMap[icon],
            label: getAriaLabel(icon),
          };
        }),
        image: [
          {
            src: leadspaceImg,
            breakpoint: 'sm',
          },
          {
            src: leadspaceImg,
            breakpoint: 'md',
          },
          {
            src: leadspaceImg,
            breakpoint: 'lg',
          },
        ],
        alt: text('Image alt text (alt):', 'Image alt text', groupId),
        defaultSrc: text('Default image (defaultSrc):', leadspaceImg, groupId),
      }),
    },
  },
};
