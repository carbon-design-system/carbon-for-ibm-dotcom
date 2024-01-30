/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { text, select, number } from '@storybook/addon-knobs';
import { html } from 'lit';
import ArrowRight20 from '../../../internal/vendor/@carbon/web-components/icons/arrow--right/20.js';
import ArrowDown20 from '../../../internal/vendor/@carbon/web-components/icons/arrow--down/20.js';
import Pdf20 from '../../../internal/vendor/@carbon/web-components/icons/PDF/20.js';
import { ifDefined } from 'lit/directives/if-defined.js';

// Above import is interface-only ref and thus code won't be brought into the build
import '../index';
import '../../background-media/index';
import '../../video-player/video-player-container';
import textNullable from '../../../../.storybook/knob-text-nullable';
import readme from './README.stories.mdx';

import leadspaceImg from '../../../../.storybook/storybook-images/assets/leadspace/leadspaceMax.jpg';
import { LEADSPACE_SIZE } from '../defs';

const navigationOptions = ['with a group of Tags', 'with Breadcrumbs', 'none'];

const gradientOptions = {
  'With Gradient': 'with-gradient',
  'No Gradient': '',
};

const typeStyleOptions = {
  'Display 01': 'display-01',
  'Fluid heading 05': 'fluid-heading-05',
};

const navigationWithTagGroup = html`
  <div slot="navigation">
    <cds-tag href="https://example.com">Marketing Analytics</cds-tag>
    <cds-tag href="https://example.com">Cloud</cds-tag>
  </div>
`;

const navigationWithBreadcrumbs = html`
  <c4d-breadcrumb slot="navigation">
    <c4d-breadcrumb-item>
      <c4d-breadcrumb-link href="/#">Breadcrumb 1</c4d-breadcrumb-link>
    </c4d-breadcrumb-item>
    <c4d-breadcrumb-item>
      <c4d-breadcrumb-link href="/#">Breadcrumb 2</c4d-breadcrumb-link>
    </c4d-breadcrumb-item>
    <c4d-breadcrumb-item>
      <c4d-breadcrumb-link href="/#" aria-current="page"
        >Breadcrumb 3</c4d-breadcrumb-link
      >
    </c4d-breadcrumb-item>
  </c4d-breadcrumb>
`;

export const Super = (args) => {
  const { title, copy, buttons, navElements, highlight, typeStyle } =
    args?.LeadSpace ?? {};
  return html`
    <c4d-leadspace size="${LEADSPACE_SIZE.SUPER}">
      ${navElements === navigationOptions[0] ? navigationWithTagGroup : ``}
      ${navElements === navigationOptions[1] ? navigationWithBreadcrumbs : ``}
      <c4d-leadspace-heading type-style="${typeStyle}" highlight=${highlight}
        >${ifDefined(title)}</c4d-leadspace-heading
      >
      ${ifDefined(copy)}
      <c4d-button-group slot="action">
        ${buttons.map((elem) => {
          return html`
            <c4d-button-group-item
              cta-type="local"
              aria-label="${elem.label}"
              href="${elem.href}"
              >${elem.copy}</c4d-button-group-item
            >
          `;
        })}
      </c4d-button-group>
    </c4d-leadspace>
  `;
};

export const SuperWithImage = (args) => {
  const {
    alt,
    defaultSrc,
    gradientStyleScheme,
    title,
    copy,
    buttons,
    navElements,
    highlight,
    typeStyle,
  } = args?.LeadSpace ?? {};
  const image = defaultSrc || leadspaceImg;
  return html`
    <c4d-leadspace
      size="${LEADSPACE_SIZE.SUPER}"
      gradient-style-scheme="${ifDefined(gradientStyleScheme)}"
      alt="${ifDefined(alt)}"
      default-src="${ifDefined(defaultSrc)}">
      ${navElements === navigationOptions[0] ? navigationWithTagGroup : ``}
      ${navElements === navigationOptions[1] ? navigationWithBreadcrumbs : ``}
      <c4d-leadspace-heading type-style="${typeStyle}" highlight=${highlight}
        >${ifDefined(title)}</c4d-leadspace-heading
      >
      ${ifDefined(copy)}
      <c4d-button-group slot="action">
        ${buttons.map((elem) => {
          return html`
            <c4d-button-group-item
              cta-type="local"
              aria-label="${elem.label}"
              href="${elem.href}"
              >${elem.copy}</c4d-button-group-item
            >
          `;
        })}
      </c4d-button-group>
      <c4d-background-media
        slot="image"
        alt="${ifDefined(alt)}"
        default-src="${defaultSrc}"
        opacity="100">
        <c4d-image-item media="(min-width: 1312px)" srcset="${image}">
        </c4d-image-item>
        <c4d-image-item media="(min-width: 672px)" srcset="${image}">
        </c4d-image-item>
        <c4d-image-item media="(min-width: 320px)" srcset="${image}">
        </c4d-image-item>
        <c4d-image-item media="(min-width: 0px)" srcset="${image}">
        </c4d-image-item>
      </c4d-background-media>
    </c4d-leadspace>
  `;
};

SuperWithImage.story = {
  name: 'Super with image',
};

export const SuperWithVideo = (args) => {
  const {
    alt,
    defaultSrc,
    gradientStyleScheme,
    title,
    copy,
    buttons,
    navElements,
    highlight,
    typeStyle,
  } = args?.LeadSpace ?? {};
  return html`
    <c4d-leadspace
      size="${LEADSPACE_SIZE.SUPER}"
      gradient-style-scheme="${ifDefined(gradientStyleScheme)}"
      alt="${ifDefined(alt)}"
      default-src="${ifDefined(defaultSrc)}">
      ${navElements === navigationOptions[0] ? navigationWithTagGroup : ``}
      ${navElements === navigationOptions[1] ? navigationWithBreadcrumbs : ``}
      <c4d-leadspace-heading type-style="${typeStyle}" highlight=${highlight}
        >${ifDefined(title)}</c4d-leadspace-heading
      >
      ${ifDefined(copy)}
      <c4d-button-group slot="action">
        ${buttons.map((elem) => {
          return html`
            <c4d-button-group-item
              cta-type="local"
              aria-label="${elem.label}"
              href="${elem.href}"
              >${elem.copy}</c4d-button-group-item
            >
          `;
        })}
      </c4d-button-group>
      <c4d-background-media slot="image" opacity="100">
        <c4d-video-player-container
          video-id="0_ibuqxqbe"
          background-mode="true"></c4d-video-player-container>
      </c4d-background-media>
    </c4d-leadspace>
  `;
};

SuperWithVideo.story = {
  name: 'Super with video',
  parameters: {
    percy: {
      skip: true,
    },
  },
};

export const Tall = (args) => {
  const { title, copy, buttons, navElements, highlight, typeStyle } =
    args?.LeadSpace ?? {};
  return html`
    <c4d-leadspace size="${LEADSPACE_SIZE.TALL}">
      ${navElements === navigationOptions[0] ? navigationWithTagGroup : ``}
      ${navElements === navigationOptions[1] ? navigationWithBreadcrumbs : ``}
      <c4d-leadspace-heading type-style="${typeStyle}" highlight=${highlight}
        >${ifDefined(title)}</c4d-leadspace-heading
      >
      ${ifDefined(copy)}
      <c4d-button-group slot="action">
        ${buttons.map((elem) => {
          return html`
            <c4d-button-group-item
              cta-type="local"
              aria-label="${elem.label}"
              href="${elem.href}"
              >${elem.copy}</c4d-button-group-item
            >
          `;
        })}
      </c4d-button-group>
    </c4d-leadspace>
  `;
};

export const TallWithImage = (args) => {
  const {
    alt,
    defaultSrc,
    gradientStyleScheme,
    title,
    copy,
    buttons,
    navElements,
    highlight,
    typeStyle,
  } = args?.LeadSpace ?? {};
  const image = defaultSrc || leadspaceImg;
  return html`
    <c4d-leadspace
      size="${LEADSPACE_SIZE.TALL}"
      gradient-style-scheme="${ifDefined(gradientStyleScheme)}"
      alt="${ifDefined(alt)}"
      default-src="${ifDefined(defaultSrc)}">
      ${navElements === navigationOptions[0] ? navigationWithTagGroup : ``}
      ${navElements === navigationOptions[1] ? navigationWithBreadcrumbs : ``}
      <c4d-leadspace-heading type-style="${typeStyle}" highlight=${highlight}
        >${ifDefined(title)}</c4d-leadspace-heading
      >
      ${ifDefined(copy)}
      <c4d-button-group slot="action">
        ${buttons.map((elem) => {
          return html`
            <c4d-button-group-item
              cta-type="local"
              aria-label="${elem.label}"
              href="${elem.href}"
              >${elem.copy}</c4d-button-group-item
            >
          `;
        })}
      </c4d-button-group>
      <c4d-background-media
        slot="image"
        alt="${ifDefined(alt)}"
        default-src="${defaultSrc}"
        opacity="100">
        <c4d-image-item media="(min-width: 1312px)" srcset="${image}">
        </c4d-image-item>
        <c4d-image-item media="(min-width: 672px)" srcset="${image}">
        </c4d-image-item>
        <c4d-image-item media="(min-width: 320px)" srcset="${image}">
        </c4d-image-item>
        <c4d-image-item media="(min-width: 0px)" srcset="${image}">
        </c4d-image-item>
      </c4d-background-media>
    </c4d-leadspace>
  `;
};

TallWithImage.story = {
  name: 'Tall with image',
};

export const TallWithVideo = (args) => {
  const {
    alt,
    defaultSrc,
    gradientStyleScheme,
    title,
    copy,
    buttons,
    navElements,
    highlight,
    typeStyle,
  } = args?.LeadSpace ?? {};
  return html`
    <c4d-leadspace
      size="${LEADSPACE_SIZE.TALL}"
      gradient-style-scheme="${ifDefined(gradientStyleScheme)}"
      alt="${ifDefined(alt)}"
      default-src="${ifDefined(defaultSrc)}">
      ${navElements === navigationOptions[0] ? navigationWithTagGroup : ``}
      ${navElements === navigationOptions[1] ? navigationWithBreadcrumbs : ``}
      <c4d-leadspace-heading type-style="${typeStyle}" highlight=${highlight}
        >${ifDefined(title)}</c4d-leadspace-heading
      >
      ${ifDefined(copy)}
      <c4d-button-group slot="action">
        ${buttons.map((elem) => {
          return html`
            <c4d-button-group-item
              cta-type="local"
              aria-label="${elem.label}"
              href="${elem.href}"
              >${elem.copy}</c4d-button-group-item
            >
          `;
        })}
      </c4d-button-group>
      <c4d-background-media slot="image" opacity="100">
        <c4d-video-player-container
          video-id="0_ibuqxqbe"
          background-mode="true"></c4d-video-player-container>
      </c4d-background-media>
    </c4d-leadspace>
  `;
};

TallWithVideo.story = {
  name: 'Tall with video',
  parameters: {
    percy: {
      skip: true,
    },
  },
};

export const Medium = (args) => {
  const { title, copy, buttons, navElements, highlight, typeStyle } =
    args?.LeadSpace ?? {};
  return html`
    <c4d-leadspace size="${LEADSPACE_SIZE.MEDIUM}">
      ${navElements === navigationOptions[0] ? navigationWithTagGroup : ``}
      ${navElements === navigationOptions[1] ? navigationWithBreadcrumbs : ``}
      <c4d-leadspace-heading type-style="${typeStyle}" highlight=${highlight}
        >${ifDefined(title)}</c4d-leadspace-heading
      >
      ${ifDefined(copy)}
      <c4d-button-group slot="action">
        ${buttons.map((elem) => {
          return html`
            <c4d-button-group-item
              cta-type="local"
              aria-label="${elem.label}"
              href="${elem.href}"
              >${elem.copy}</c4d-button-group-item
            >
          `;
        })}
      </c4d-button-group>
    </c4d-leadspace>
  `;
};

export const MediumWithImage = (args) => {
  const {
    alt,
    defaultSrc,
    gradientStyleScheme,
    title,
    copy,
    buttons,
    navElements,
    highlight,
    typeStyle,
  } = args?.LeadSpace ?? {};
  const image = defaultSrc || leadspaceImg;
  return html`
    <c4d-leadspace
      size="${LEADSPACE_SIZE.MEDIUM}"
      gradient-style-scheme="${ifDefined(gradientStyleScheme)}"
      alt="${ifDefined(alt)}"
      default-src="${ifDefined(defaultSrc)}">
      ${navElements === navigationOptions[0] ? navigationWithTagGroup : ``}
      ${navElements === navigationOptions[1] ? navigationWithBreadcrumbs : ``}
      <c4d-leadspace-heading type-style="${typeStyle}" highlight=${highlight}
        >${ifDefined(title)}</c4d-leadspace-heading
      >
      ${ifDefined(copy)}
      <c4d-button-group slot="action">
        ${buttons.map((elem) => {
          return html`
            <c4d-button-group-item
              cta-type="local"
              aria-label="${elem.label}"
              href="${elem.href}"
              >${elem.copy}</c4d-button-group-item
            >
          `;
        })}
      </c4d-button-group>
      <c4d-background-media
        slot="image"
        alt="${ifDefined(alt)}"
        default-src="${defaultSrc}"
        opacity="100">
        <c4d-image-item media="(min-width: 1312px)" srcset="${image}">
        </c4d-image-item>
        <c4d-image-item media="(min-width: 672px)" srcset="${image}">
        </c4d-image-item>
        <c4d-image-item media="(min-width: 320px)" srcset="${image}">
        </c4d-image-item>
        <c4d-image-item media="(min-width: 0px)" srcset="${image}">
        </c4d-image-item>
      </c4d-background-media>
    </c4d-leadspace>
  `;
};

MediumWithImage.story = {
  name: 'Medium with image',
};

export const MediumWithVideo = (args) => {
  const {
    alt,
    defaultSrc,
    gradientStyleScheme,
    title,
    copy,
    buttons,
    navElements,
    highlight,
    typeStyle,
  } = args?.LeadSpace ?? {};
  return html`
    <c4d-leadspace
      size="${LEADSPACE_SIZE.MEDIUM}"
      gradient-style-scheme="${ifDefined(gradientStyleScheme)}"
      alt="${ifDefined(alt)}"
      default-src="${ifDefined(defaultSrc)}">
      ${navElements === navigationOptions[0] ? navigationWithTagGroup : ``}
      ${navElements === navigationOptions[1] ? navigationWithBreadcrumbs : ``}
      <c4d-leadspace-heading type-style="${typeStyle}" highlight=${highlight}
        >${ifDefined(title)}</c4d-leadspace-heading
      >
      ${ifDefined(copy)}
      <c4d-button-group slot="action">
        ${buttons.map((elem) => {
          return html`
            <c4d-button-group-item
              cta-type="local"
              aria-label="${elem.label}"
              href="${elem.href}"
              >${elem.copy}</c4d-button-group-item
            >
          `;
        })}
      </c4d-button-group>
      <c4d-background-media slot="image" opacity="100">
        <c4d-video-player-container
          video-id="0_ibuqxqbe"
          background-mode="true"></c4d-video-player-container>
      </c4d-background-media>
    </c4d-leadspace>
  `;
};

MediumWithVideo.story = {
  name: 'Medium with video',
  parameters: {
    percy: {
      skip: true,
    },
  },
};

export const Short = (args) => {
  const { title, navElements, highlight, typeStyle } = args?.LeadSpace ?? {};
  return html`
    <c4d-leadspace size="${LEADSPACE_SIZE.SHORT}">
      ${navElements === navigationOptions[0] ? navigationWithTagGroup : ``}
      ${navElements === navigationOptions[1] ? navigationWithBreadcrumbs : ``}
      <c4d-leadspace-heading type-style="${typeStyle}" highlight=${highlight}
        >${ifDefined(title)}</c4d-leadspace-heading
      >
    </c4d-leadspace>
  `;
};

Short.story = {
  parameters: {
    knobs: {
      LeadSpace: () => ({
        navElements: select(
          'navigation elements (optional)',
          navigationOptions,
          navigationOptions[2]
        ),
        title: text(
          'title (title):',
          'A short headline can go on multiple lines in this leadspace'
        ),
      }),
    },
    propsSet: {
      default: {
        LeadSpace: {
          navElements: navigationOptions[2],
          title: 'Heading can go to two lines max',
        },
      },
    },
  },
};

export const ShortWithImage = (args) => {
  const {
    alt,
    defaultSrc,
    gradientStyleScheme,
    title,
    navElements,
    highlight,
    typeStyle,
  } = args?.LeadSpace ?? {};
  const image = defaultSrc || leadspaceImg;
  return html`
    <c4d-leadspace
      size="${LEADSPACE_SIZE.SHORT}"
      gradient-style-scheme="${ifDefined(gradientStyleScheme)}"
      alt="${ifDefined(alt)}"
      default-src="${ifDefined(defaultSrc)}">
      ${navElements === navigationOptions[0] ? navigationWithTagGroup : ``}
      ${navElements === navigationOptions[1] ? navigationWithBreadcrumbs : ``}
      <c4d-leadspace-heading type-style="${typeStyle}" highlight=${highlight}
        >${ifDefined(title)}</c4d-leadspace-heading
      >
      <c4d-background-media
        slot="image"
        alt="${ifDefined(alt)}"
        default-src="${defaultSrc}"
        opacity="100">
        <c4d-image-item media="(min-width: 1312px)" srcset="${image}">
        </c4d-image-item>
        <c4d-image-item media="(min-width: 672px)" srcset="${image}">
        </c4d-image-item>
        <c4d-image-item media="(min-width: 320px)" srcset="${image}">
        </c4d-image-item>
        <c4d-image-item media="(min-width: 0px)" srcset="${image}">
        </c4d-image-item>
      </c4d-background-media>
    </c4d-leadspace>
  `;
};

ShortWithImage.story = {
  name: 'Short with image',
  parameters: {
    knobs: {
      LeadSpace: () => ({
        navElements: select(
          'navigation elements (optional)',
          navigationOptions,
          navigationOptions[2]
        ),
        title: text(
          'title (title):',
          'A short headline can go on multiple lines in this leadspace'
        ),
        alt: text('Image alt text (alt):', 'Image alt text'),
        defaultSrc: text('Default image (defaultSrc):', leadspaceImg),
      }),
    },
    propsSet: {
      default: {
        LeadSpace: {
          navElements: navigationOptions[2],
          title: 'A short headline can go multiple lines',
          alt: 'Image alt text',
          defaultSrc: leadspaceImg,
        },
      },
    },
  },
};

export const ShortWithVideo = (args) => {
  const {
    alt,
    defaultSrc,
    gradientStyleScheme,
    title,
    navElements,
    highlight,
    typeStyle,
  } = args?.LeadSpace ?? {};
  return html`
    <c4d-leadspace
      size="${LEADSPACE_SIZE.SHORT}"
      gradient-style-scheme="${ifDefined(gradientStyleScheme)}"
      alt="${ifDefined(alt)}"
      default-src="${ifDefined(defaultSrc)}">
      ${navElements === navigationOptions[0] ? navigationWithTagGroup : ``}
      ${navElements === navigationOptions[1] ? navigationWithBreadcrumbs : ``}
      <c4d-leadspace-heading type-style="${typeStyle}" highlight=${highlight}
        >${ifDefined(title)}</c4d-leadspace-heading
      >
      <c4d-background-media slot="image" opacity="100">
        <c4d-video-player-container
          video-id="0_ibuqxqbe"
          background-mode="true"></c4d-video-player-container>
      </c4d-background-media>
    </c4d-leadspace>
  `;
};

ShortWithVideo.story = {
  name: 'Short with video',
  parameters: {
    percy: {
      skip: true,
    },
  },
};

export const Centered = (args) => {
  const { title, copy, buttons, navElements } = args?.LeadSpace ?? {};
  return html`
    <c4d-leadspace size="${LEADSPACE_SIZE.NONE}" type="centered">
      ${navElements === navigationOptions[0] ? navigationWithTagGroup : ``}
      ${navElements === navigationOptions[1] ? navigationWithBreadcrumbs : ``}
      <c4d-leadspace-heading>${ifDefined(title)}</c4d-leadspace-heading>
      ${ifDefined(copy)}
      <c4d-button-group slot="action">
        ${buttons.map((elem) => {
          return html`
            <c4d-button-group-item
              aria-label="${elem.label}"
              href="${elem.href}"
              >${elem.copy}${elem.renderIcon}</c4d-button-group-item
            >
          `;
        })}
      </c4d-button-group>
    </c4d-leadspace>
  `;
};

export const CenteredWithImage = (args) => {
  const { alt, defaultSrc, gradient, title, copy, buttons, navElements } =
    args?.LeadSpace ?? {};
  const image = defaultSrc || leadspaceImg;
  return html`
    <c4d-leadspace
      size="${LEADSPACE_SIZE.NONE}"
      ?gradient="${ifDefined(gradient)}"
      alt="${ifDefined(alt)}"
      default-src="${ifDefined(defaultSrc)}"
      type="centered">
      ${navElements === navigationOptions[0] ? navigationWithTagGroup : ``}
      ${navElements === navigationOptions[1] ? navigationWithBreadcrumbs : ``}
      <c4d-leadspace-heading>${ifDefined(title)}</c4d-leadspace-heading>
      ${ifDefined(copy)}
      <c4d-button-group slot="action">
        ${buttons.map((elem) => {
          return html`
            <c4d-button-group-item
              aria-label="${elem.label}"
              href="${elem.href}"
              >${elem.copy}${elem.renderIcon}</c4d-button-group-item
            >
          `;
        })}
      </c4d-button-group>
      <c4d-background-media
        slot="image"
        alt="${ifDefined(alt)}"
        default-src="${defaultSrc}"
        opacity="100">
        <c4d-image-item media="(min-width: 1312px)" srcset="${image}">
        </c4d-image-item>
        <c4d-image-item media="(min-width: 672px)" srcset="${image}">
        </c4d-image-item>
        <c4d-image-item media="(min-width: 320px)" srcset="${image}">
        </c4d-image-item>
        <c4d-image-item media="(min-width: 0px)" srcset="${image}">
        </c4d-image-item>
      </c4d-background-media>
    </c4d-leadspace>
  `;
};

CenteredWithImage.story = {
  name: 'Centered with image',
};

export const CenteredWithVideo = (args) => {
  const { alt, defaultSrc, gradient, title, copy, buttons, navElements } =
    args?.LeadSpace ?? {};
  return html`
    <c4d-leadspace
      size="${LEADSPACE_SIZE.NONE}"
      ?gradient="${ifDefined(gradient)}"
      alt="${ifDefined(alt)}"
      default-src="${ifDefined(defaultSrc)}"
      type="centered">
      ${navElements === navigationOptions[0] ? navigationWithTagGroup : ``}
      ${navElements === navigationOptions[1] ? navigationWithBreadcrumbs : ``}
      <c4d-leadspace-heading>${ifDefined(title)}</c4d-leadspace-heading>
      ${ifDefined(copy)}
      <c4d-button-group slot="action">
        ${buttons.map((elem) => {
          return html`
            <c4d-button-group-item
              aria-label="${elem.label}"
              href="${elem.href}"
              >${elem.copy}${elem.renderIcon}</c4d-button-group-item
            >
          `;
        })}
      </c4d-button-group>
      <c4d-background-media slot="image" opacity="100">
        <c4d-video-player-container
          video-id="0_ibuqxqbe"
          background-mode="true"></c4d-video-player-container>
      </c4d-background-media>
    </c4d-leadspace>
  `;
};

CenteredWithVideo.story = {
  name: 'Centered with video',
  parameters: {
    percy: {
      skip: true,
    },
  },
};

const getAriaLabel = (type) => {
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
    (story) => html` <div class="cds--grid cds--no-gutter">${story()}</div> `,
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
    'carbon-theme': { preventReload: true },
    knobs: {
      LeadSpace: () => ({
        navElements: select(
          'navigation elements (optional)',
          navigationOptions,
          navigationOptions[2]
        ),
        title: text('title (title):', 'Heading can go to two lines max'),
        copy: text(
          'copy (copy):',
          'Use this area for a short line of copy to support the title'
        ),
        buttons: Array.from({
          length: number('Number of buttons', 2, {}),
        }).map((_, i) => {
          const icon =
            select(`Icon ${i + 1}`, iconOptions, iconOptions['Arrow Right']) ??
            0;
          return {
            href: textNullable(`Link ${i + 1}`, `https://example.com`),
            copy: text(
              `Button ${i + 1}`,
              `${i % 2 == 0 ? 'Primary action' : 'Secondary Action'}`
            ),
            renderIcon: iconMap[icon],
            label: getAriaLabel(icon),
          };
        }),
        highlight: text('Highlight:', ''),
        gradientStyleScheme: select(
          'Gradient (gradient-style-scheme)',
          gradientOptions,
          'with-gradient'
        ),
        typeStyle: select('Type style', typeStyleOptions, 'display-01'),
        alt: text('Image alt text (alt):', 'Image alt text'),
        defaultSrc: text('Default image (defaultSrc):', leadspaceImg),
      }),
    },
    propsSet: {
      default: {
        LeadSpace: {
          navElements: navigationOptions[2],
          title: 'Heading can go to two lines max',
          copy: 'Use this area for a short line of copy to support the title',
          buttons: [
            {
              href: 'https://example.com',
              copy: 'Primary action',
              renderIcon: iconOptions['Arrow Right'],
              label: '',
            },
            {
              href: 'https://example.com',
              copy: 'Secondary action',
              renderIcon: iconOptions['Arrow Right'],
              label: '',
            },
          ],
          alt: 'Image alt text',
          defaultSrc: leadspaceImg,
        },
      },
    },
  },
};
