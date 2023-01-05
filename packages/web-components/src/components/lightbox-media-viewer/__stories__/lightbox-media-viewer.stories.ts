/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { action } from '@storybook/addon-actions';
import { boolean, select } from '@storybook/addon-knobs';
import { ifDefined } from 'lit/directives/if-defined.js';
import 'carbon-web-components/es/components/modal/modal-close-button.js';
import textNullable from '../../../../.storybook/knob-text-nullable';
import '../index';
import '../../carousel/index';
import '../../expressive-modal/index';
import styles from './lightbox-media-viewer.stories.scss';
import readme from './README.stories.mdx';

import imgXlg16x9 from '../../../../../storybook-images/assets/1312/fpo--16x9--1312x738--002.jpg';
import imgXlg2x1 from '../../../../../storybook-images/assets/1312/fpo--2x1--1312x656--002.jpg';
import imgMax16x9 from '../../../../../storybook-images/assets/1584/fpo--16x9--1312x738--002.jpg';
import imgLg1x1 from '../../../../../storybook-images/assets/720/fpo--1x1--720x720--002.jpg';

const images = {
  none: null,
  '720 x 720 (1:1)': imgLg1x1,
  '1312 x 656 (2:1)': imgXlg2x1,
  '1312 x 738 (16:9)': imgXlg16x9,
  '1584 x 738 (16:9)': imgMax16x9,
};

const videos = {
  none: null,
  'Speed of AI Test Video': '1_9h94wo6b',
};

export const Default = (args) => {
  const { open, disableClose, onBeforeClose, onClose } = args?.Modal ?? {};
  const { alt, defaultSrc, description, title, hideCaption, videoId } =
    args?.LightboxMedia ?? {};
  const handleBeforeClose = (event: CustomEvent) => {
    onBeforeClose?.(event);
    if (disableClose) {
      event.preventDefault();
    }
  };
  return html`
    <style>
      ${styles}
    </style>
    <dds-expressive-modal
      expressive-size="full-width"
      mode="lightbox"
      ?open="${open}"
      @dds-expressive-modal-beingclosed="${handleBeforeClose}"
      @dds-expressive-modal-closed="${onClose}">
      <dds-expressive-modal-close-button></dds-expressive-modal-close-button>
      <dds-lightbox-media-viewer
        alt="${ifDefined(alt)}"
        default-src="${ifDefined(defaultSrc)}"
        description="${ifDefined(description)}"
        title="${ifDefined(title)}"
        video-id="${ifDefined(videoId)}"
        ?hideCaption="${ifDefined(hideCaption)}">
      </dds-lightbox-media-viewer>
    </dds-expressive-modal>
  `;
};

Default.story = {
  parameters: {
    knobs: {
      LightboxMedia: () => ({
        defaultSrc: select(
          'Image (default-src)',
          images,
          images['1312 x 656 (2:1)']
        ),
        alt: textNullable('Image alt text (alt)', 'Image alt text'),
        videoId: select('Video ID (video-id)', videos, videos.none),
        hideCaption: boolean('hide caption (hide-caption)', false),
        title: textNullable(
          'Title (title)',
          'Curabitur malesuada varius mi eu posuere'
        ),
        description: textNullable(
          'Description (description)',
          `
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Aenean et ultricies est.Mauris iaculis eget dolor nec hendrerit.
            Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
          `
        ),
      }),
    },
    propsSet: {
      default: {
        LightboxMedia: {
          alt: 'Image alt text',
          defaultSrc: imgXlg2x1,
          description: `
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Aenean et ultricies est.Mauris iaculis eget dolor nec hendrerit.
            Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
          `,
          title: 'Curabitur malesuada varius mi eu posuere',
          hideCaption: false,
          videoId: '1_9h94wo6b',
          customVideoName: 'Custom video name',
          customVideoDescription: 'This is a custom video description',
        },
      },
    },
  },
};

export const WithCarousel = (args) => {
  const { open, disableClose, onBeforeClose, onClose } = args?.Modal ?? {};
  const handleBeforeClose = (event: CustomEvent) => {
    onBeforeClose?.(event);
    if (disableClose) {
      event.preventDefault();
    }
  };
  return html`
    <style>
      ${styles}
    </style>
    <dds-expressive-modal
      expressive-size="full-width"
      mode="lightbox"
      ?open="${open}"
      @dds-expressive-modal-beingclosed="${handleBeforeClose}"
      @dds-expressive-modal-closed="${onClose}">
      <dds-expressive-modal-close-button></dds-expressive-modal-close-button>
      <dds-carousel page-size="1">
        <dds-lightbox-media-viewer
          video-id="${videos['Speed of AI Test Video']}"
          title="Praesent at erat."
          description="
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent at erat eu lectus elementum hendrerit sed sed lacus.
            Morbi feugiat tortor purus, id pretium elit scelerisque id. Donec dignissim ac purus id faucibus.
          "></dds-lightbox-media-viewer>
        <dds-lightbox-media-viewer
          default-src="${images['1312 x 738 (16:9)']}"
          alt="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          title="Donec dignissim ac purus id faucibus."
          description="
            Proin ut leo condimentum, consequat risus quis, mattis lacus. Donec malesuada convallis erat ut luctus.
            Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
            Vivamus non ultricies libero. Fusce scelerisque sit amet ex finibus scelerisque.
          "></dds-lightbox-media-viewer>
        <dds-lightbox-media-viewer
          default-src="${images['1312 x 738 (16:9)']}"
          alt="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          title="Donec malesuada convallis."
          description="
            In ac luctus mauris. Sed egestas neque nec lorem pharetra congue. Vestibulum quis mi ac nibh dictum vulputate.
            Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed et justo massa.
          "></dds-lightbox-media-viewer>
        <dds-lightbox-media-viewer
          default-src="${images['1312 x 738 (16:9)']}"
          alt="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          title="Fusce scelerisque sit amet ex finibus"
          description="
            Integer interdum facilisis lacus quis lobortis. Mauris vestibulum rhoncus libero nec dictum. Maecenas mi ipsum,
            ornare at sem in, cursus vestibulum mauris. Proin suscipit leo sit amet ipsum hendrerit viverra. Sed a varius sapien.
            Nam sit amet felis congue, porttitor turpis at, gravida dolor. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Curabitur tempor ante
            magna, sit amet pulvinar odio vehicula in. Vivamus placerat aliquam sem vitae mattis. Etiam eget tempor ante,
            convallis tempor dui. Proin sodales congue dictum. Proin arcu nisl, ultricies eu dolor ut, posuere placerat arcu.
            Fusce placerat purus vel libero consectetur, id fringilla ex egestas. Vestibulum ante ipsum primis in faucibus orci
            luctus et ultrices posuere cubilia curae; In sodales faucibus mi vel ultricies.
          "></dds-lightbox-media-viewer>
        <dds-lightbox-media-viewer
          default-src="${images['1312 x 738 (16:9)']}"
          alt="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          title="In ac luctus mauris."
          description="Aenean vel sem velit. Mauris malesuada eleifend leo vel interdum. In eu aliquet lacus, eu feugiat turpis."></dds-lightbox-media-viewer>
      </dds-carousel>
    </dds-expressive-modal>
  `;
};

WithCarousel.story = {};

export default {
  title: 'Components/Lightbox media viewer',
  parameters: {
    ...readme.parameters,
    percy: {
      skip: true,
    },
    knobs: {
      Modal: () => ({
        open: boolean('Open (open)', true),
        disableClose: boolean(
          'Disable user-initiated close action (Call event.preventDefault() in dds-expressive-modal-beingclosed event)',
          false
        ),
        onBeforeClose: action('dds-expressive-modal-beingclosed'),
        onClose: action('dds-expressive-modal-closed'),
      }),
    },
    propsSet: {
      default: {
        Modal: {
          open: true,
          disableClose: false,
          onBeforeClose: 'dds-expressive-modal-beingclosed',
          onClose: 'dds-expressive-modal-closed',
        },
      },
    },
  },
};
