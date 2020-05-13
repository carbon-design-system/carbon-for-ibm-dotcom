/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {
  ArrowDown20,
  ArrowRight20,
  Download20,
  Launch20,
  PlayOutline20,
} from '@carbon/icons-react';
import { LightboxMediaViewer } from '../LightboxMediaViewer';
import React from 'react';
import { smoothScroll } from '@carbon/ibmdotcom-utilities';

/**
 * The logic behind the CTA component
 */
class CTALogic {
  /**
   * extract video id from props
   *
   * @param {string} style cta type ( external | jump | local)
   * @param {object} otherProps cta type ( external | jump | local)
   * @returns {*} behaviour object
   */
  static getVideoId(style, otherProps) {
    switch (style) {
      case 'text':
        return [{ src: otherProps.media.src }];
      case 'card':
        return [{ src: otherProps.media.src }];
      case 'feature':
        return [{ src: otherProps.card.cta.media.src }];
      case 'button': {
        const videoIds = otherProps.buttons
          .map((button, key) => {
            if (button.type === 'video' && button.media)
              return { src: button.media.src, key };
          })
          .filter(id => id && id);
        return videoIds;
      }
      default:
        return [];
    }
  }

  /**
   * jump to target element  onClick
   *
   * @param {*} e event object
   * @param {string} type cta type ( external | jump | local)
   * @returns {*} behaviour object
   */
  static jump(e, type) {
    return type === 'jump' ? smoothScroll(e) : null;
  }

  /**
   * sets target
   *
   * @param {string} type cta type ( external | jump | local)
   * @returns {string} target value
   */
  static external(type) {
    return type === 'external' ? '_blank' : null;
  }

  /**
   * sets icon based on link type
   *
   * @param {string} type cta type ( external | jump | local)
   * @returns {*} cta type component
   */
  static iconSelector(type) {
    switch (type) {
      case 'download':
        return Download20;
      case 'external':
        return Launch20;
      case 'jump':
        return ArrowDown20;
      case 'video':
        return PlayOutline20;
      default:
        return ArrowRight20;
    }
  }

  /**
   * Opens the LightBoxMediaViewer component when CTA is clicked
   *
   * @param {boolean} renderLightBox determine whether to render the lightbox
   * @param {Function} openLightBox func to toggle the lightbox
   * @param {object} media media object to render within the lightbox
   * @returns {*} lightbox component
   */
  static launchLightBox(renderLightBox, openLightBox, media) {
    return (
      renderLightBox && (
        <LightboxMediaViewer
          media={media}
          open={true}
          onClose={() => openLightBox(false)}
        />
      )
    );
  }

  /**
   *
   * @param {*} e event
   * @param {Function} openLightBox function to toggle lightbox
   *
   * @returns {*} set lightbox state
   */
  static setLightBox(e, openLightBox) {
    e.preventDefault();
    return openLightBox(true);
  }
}

export default CTALogic;
