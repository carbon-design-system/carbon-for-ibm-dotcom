/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { text, select, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import React from 'react';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import C4DExpressiveModal from '@carbon/ibmdotcom-web-components/es/components-react/expressive-modal/expressive-modal';
// eslint-disable-next-line max-len
import C4DExpressiveModalCloseButton from '@carbon/ibmdotcom-web-components/es/components-react/expressive-modal/expressive-modal-close-button';
// eslint-disable-next-line max-len
import C4DLightboxMediaViewer from '@carbon/ibmdotcom-web-components/es/components-react/lightbox-media-viewer/lightbox-media-viewer';
import C4DCarousel from '@carbon/ibmdotcom-web-components/es/components-react/carousel/carousel';

import styles from './lightbox-media-viewer.stories.scss';
import readme from './README.stories.react.mdx';

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
  'Speed of AI Test Video': '0_ibuqxqbe',
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
  return (
    <>
      <style type="text/css">{styles.cssText}</style>
      <C4DExpressiveModal
        expressive-size="full-width"
        mode="lightbox"
        open={open}
        cds-expressive-modal-beingclosed={handleBeforeClose}
        cds-expressive-modal-closed={onClose}>
        <C4DExpressiveModalCloseButton></C4DExpressiveModalCloseButton>
        <C4DLightboxMediaViewer
          alt={alt || null}
          default-src={defaultSrc || null}
          description={description || null}
          title={title || null}
          video-id={videoId || null}
          hideCaption={hideCaption}></C4DLightboxMediaViewer>
      </C4DExpressiveModal>
    </>
  );
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
        alt: text('Image alt text (alt)', 'Image alt text'),
        videoId: select('Video ID (video-id)', videos, videos.none),
        hideCaption: boolean('hide caption (hide-caption)', false),
        title: text(
          'Title (title)',
          'Curabitur malesuada varius mi eu posuere'
        ),
        description: text(
          'Description (description)',
          `
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Aenean et ultricies est.Mauris iaculis eget dolor nec hendrerit.
            Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
          `
        ),
      }),
    },
  },
};

export default {
  title: 'Components/Lightbox media viewer',
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
    knobs: {
      Modal: () => ({
        open: boolean('Open (open)', true),
        disableClose: boolean(
          'Disable user-initiated close action (Call event.preventDefault() in cds-expressive-modal-beingclosed event)',
          false
        ),
        onBeforeClose: action('cds-expressive-modal-beingclosed'),
        onClose: action('cds-expressive-modal-closed'),
      }),
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
  return (
    <>
      <style type="text/css">{styles.cssText}</style>
      <C4DExpressiveModal
        expressive-size="full-width"
        mode="lightbox"
        open={open}
        cds-expressive-modal-beingclosed={handleBeforeClose}
        cds-expressive-modal-closed={onClose}>
        <C4DExpressiveModalCloseButton></C4DExpressiveModalCloseButton>
        <C4DCarousel page-size="1">
          <C4DLightboxMediaViewer
            video-id={videos['Speed of AI Test Video']}
            title="Praesent at erat."
            description="
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Praesent at erat eu lectus elementum hendrerit sed sed lacus.
            Morbi feugiat tortor purus, id pretium elit scelerisque id.
            Donec dignissim ac purus id faucibus."></C4DLightboxMediaViewer>
          <C4DLightboxMediaViewer
            default-src={images['1312 x 738 (16:9)']}
            alt="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            title="Donec dignissim ac purus id faucibus."
            description="
              Proin ut leo condimentum, consequat risus quis, mattis lacus. Donec malesuada convallis erat ut luctus.
              Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
              Vivamus non ultricies libero. Fusce scelerisque sit amet ex finibus scelerisque.
            "></C4DLightboxMediaViewer>
          <C4DLightboxMediaViewer
            default-src={images['1312 x 738 (16:9)']}
            alt="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            title="Donec malesuada convallis."
            description="
            In ac luctus mauris. Sed egestas neque nec lorem pharetra congue. Vestibulum quis mi ac nibh dictum vulputate.
            Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed et justo massa.
          "></C4DLightboxMediaViewer>
          <C4DLightboxMediaViewer
            default-src={images['1312 x 738 (16:9)']}
            alt="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            title="Fusce scelerisque sit amet ex finibus"
            description="
              Integer interdum facilisis lacus quis lobortis. Mauris vestibulum rhoncus libero nec dictum. Maecenas mi ipsum,
              ornare at sem in, cursus vestibulum mauris. Proin suscipit leo sit amet ipsum hendrerit viverra.
              Sed a varius sapien. Nam sit amet felis congue, porttitor turpis at, gravida dolor. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia
              curae; Curabitur tempor ante magna, sit amet pulvinar odio vehicula in. Vivamus placerat aliquam sem vitae mattis.
              Etiam eget tempor ante, convallis tempor dui. Proin sodales congue dictum. Proin arcu nisl, ultricies eu dolor ut,
              posuere placerat arcu. Fusce placerat purus vel libero consectetur, id fringilla ex egestas. Vestibulum ante ipsum
              primis in faucibus orci luctus et ultrices posuere cubilia curae; In sodales faucibus mi vel ultricies.
            "></C4DLightboxMediaViewer>
          <C4DLightboxMediaViewer
            default-src={images['1312 x 738 (16:9)']}
            alt="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            title="In ac luctus mauris."
            description="Aenean vel sem velit. Mauris malesuada eleifend leo vel interdum. In eu aliquet lacus,
            eu feugiat turpis."></C4DLightboxMediaViewer>
        </C4DCarousel>
      </C4DExpressiveModal>
    </>
  );
};
