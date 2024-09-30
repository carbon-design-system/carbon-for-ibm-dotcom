/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ArrowDown20 from '@carbon/web-components/es/icons/arrow--down/20.js';
import ArrowRight20 from '@carbon/web-components/es/icons/arrow--right/20.js';
import Download20 from '@carbon/web-components/es/icons/download/20.js';
import Launch20 from '@carbon/web-components/es/icons/launch/20.js';
import PlayFilledAlt20 from '@carbon/web-components/es/icons/play--filled--alt/20.js';
import settings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import { Constructor } from '../../globals/defs';
import { CTA_TYPE } from '../../components/cta/defs';
import KalturaPlayerAPI from '@carbon/ibmdotcom-services/es/services/KalturaPlayer/KalturaPlayer.js';

const { stablePrefix: c4dPrefix } = settings;

/**
 * Icons to use, keyed by CTA type.
 */
export const icons = {
  [CTA_TYPE.LOCAL]: ArrowRight20,
  [CTA_TYPE.DOWNLOAD]: Download20,
  [CTA_TYPE.EXTERNAL]: Launch20,
  [CTA_TYPE.JUMP]: ArrowDown20,
  [CTA_TYPE.VIDEO]: PlayFilledAlt20,
};

/**
 * @param Base The base class.
 * @returns A mix-in implementing the logic of handling link for CTA.
 */
const VideoCTAMixin = <T extends Constructor<HTMLElement>>(Base: T) => {
  abstract class VideoCTAMixinImpl extends Base {
    /**
     * Handles `click` event on the `<a>.
     *
     * @param event The event.
     */
    _handleClick(event: MouseEvent) {
      this.focus();
      const { ctaType, disabled, href, videoName, videoDescription } = this;
      if (ctaType === CTA_TYPE.VIDEO) {
        event.preventDefault(); // Stop following the link
      }
      if (!disabled) {
        const { eventRunAction } = this.constructor as typeof VideoCTAMixinImpl;
        this.dispatchEvent(
          new CustomEvent(eventRunAction, {
            bubbles: true,
            cancelable: true,
            composed: true,
            detail: {
              href,
              ctaType,
              videoName,
              videoDescription,
            },
          })
        );
      }
    }

    /**
     * The CTA type.
     */
    abstract ctaType: CTA_TYPE;

    /**
     * `true` if the button should be disabled.
     */
    abstract disabled?: boolean;

    /**
     * The formatter for the video caption, composed with the video name and the video duration.
     * Should be changed upon the locale the UI is rendered with.
     */
    abstract formatVideoCaption?:
      | never
      | (({ duration, name }: { duration?: string; name?: string }) => string);

    /**
     * The formatter for the video duration.
     * Should be changed upon the locale the UI is rendered with.
     */
    abstract formatVideoDuration?:
      | never
      | (({ duration }: { duration?: number }) => string);

    /**
     * Link `href`.
     */
    abstract href?: string;

    /**
     * The video duration.
     */
    abstract videoDuration?: never | number;

    /**
     * The video name.
     */
    abstract videoName?: never | string;

    /**
     * The video custom description.
     */
    abstract videoDescription?: never | string;

    /**
     * The video thumbnail URL.
     */
    abstract videoThumbnailUrl?: never | string;

    /**
     * Handles `.updated()` method of `lit-element`.
     */
    updated(changedProperties) {
      // Declaring this mixin as it extends `LitElement` seems to cause a TS error
      // @ts-ignore
      super.updated(changedProperties);
      const { ctaType, videoName, videoDescription, href, videoDuration } =
        this;
      const { eventRequestVideoData } = this
        .constructor as typeof VideoCTAMixinImpl;
      if (changedProperties.has('ctaType') && ctaType === CTA_TYPE.VIDEO) {
        if (typeof videoDuration === 'undefined') {
          this.dispatchEvent(
            new CustomEvent(eventRequestVideoData, {
              bubbles: true,
              cancelable: true,
              composed: true,
              detail: {
                href,
                videoName,
                videoDescription,
              },
            })
          );
        }
      }

      if (
        (changedProperties.has('videoName') &&
          (videoName === null || videoName === 'null')) ||
        changedProperties.has('videoDescription')
      ) {
        this.dispatchEvent(
          new CustomEvent(eventRequestVideoData, {
            bubbles: true,
            cancelable: true,
            composed: true,
            detail: {
              videoName,
              videoDescription,
              href,
            },
          })
        );
      }

      if (ctaType === CTA_TYPE.VIDEO && this.offsetWidth > 0) {
        this._updateVideoThumbnailUrl();
      }
    }

    /**
     * Updates video thumbnail url to match card width.
     */
    _updateVideoThumbnailUrl() {
      this.videoThumbnailUrl = KalturaPlayerAPI.getThumbnailUrl({
        mediaId: this.href,
        width: String(this.offsetWidth),
      });
    }

    /**
     * The name of the custom event fired when there is a user gesture to run the action.
     */
    static get eventRequestVideoData() {
      return `${c4dPrefix}-cta-request-video-data`;
    }

    /**
     * The name of the custom event fired when there is a user gesture to run the action.
     */
    static get eventRunAction() {
      return `${c4dPrefix}-cta-run-action`;
    }
  }

  return VideoCTAMixinImpl;
};

export type VideoCTAMixinImpl = InstanceType<ReturnType<typeof VideoCTAMixin>>;

export default VideoCTAMixin;
