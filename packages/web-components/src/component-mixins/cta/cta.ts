/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { property } from 'lit/decorators.js';
import ArrowDown20 from '@carbon/web-components/es/icons/arrow--down/20.js';
import ArrowLeft20 from '@carbon/web-components/es/icons/arrow--left/20.js';
import ArrowRight20 from '@carbon/web-components/es/icons/arrow--right/20.js';
import Download20 from '@carbon/web-components/es/icons/download/20.js';
import KalturaPlayerAPI from '@carbon/ibmdotcom-services/es/services/KalturaPlayer/KalturaPlayer.js';
import Launch20 from '@carbon/web-components/es/icons/launch/20.js';
import PlayFilledAlt20 from '@carbon/web-components/es/icons/play--filled--alt/20.js';
import Blog20 from '@carbon/web-components/es/icons/blog/20.js';
import DocumentPDF20 from '@carbon/web-components/es/icons/document--pdf/20.js';
import NewTab20 from '@carbon/web-components/es/icons/new-tab/20.js';
import Phone20 from '@carbon/web-components/es/icons/phone/20.js';
import Calendar20 from '@carbon/web-components/es/icons/calendar/20.js';
import Email20 from '@carbon/web-components/es/icons/email/20.js';
import Chat20 from '@carbon/web-components/es/icons/chat/20.js';
import settings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import { Constructor } from '../../globals/defs';
import { CTA_TYPE } from '../../components/cta/defs';
import {
  formatVideoCaption,
  formatVideoDuration,
} from '@carbon/ibmdotcom-utilities/es/utilities/formatVideoCaption/formatVideoCaption.js';
import root from 'window-or-global';

const { prefix, stablePrefix: c4dPrefix } = settings;

/**
 * Icons to use, keyed by CTA type.
 */
export const icons = {
  [CTA_TYPE.LOCAL]: ArrowRight20,
  [`${CTA_TYPE.LOCAL}-rtl`]: ArrowLeft20,
  [CTA_TYPE.DOWNLOAD]: Download20,
  [CTA_TYPE.EXTERNAL]: Launch20,
  [CTA_TYPE.NEW_TAB]: NewTab20,
  [CTA_TYPE.JUMP]: ArrowDown20,
  [CTA_TYPE.VIDEO]: PlayFilledAlt20,
  [CTA_TYPE.PDF]: DocumentPDF20,
  [CTA_TYPE.BLOG]: Blog20,
  [CTA_TYPE.EMAIL]: Email20,
  [CTA_TYPE.SCHEDULE]: Calendar20,
  [CTA_TYPE.CHAT]: Chat20,
  [CTA_TYPE.CALL]: Phone20,
};

/**
 * Aria Labels to use, keyed by CTA type.
 */
export const ariaLabels = {
  [CTA_TYPE.LOCAL]: '',
  [CTA_TYPE.DOWNLOAD]: ' - This link downloads a file',
  [CTA_TYPE.EXTERNAL]: ' - This link opens in a new tab',
  [CTA_TYPE.NEW_TAB]: ' - This link opens in a new tab',
  [CTA_TYPE.JUMP]: '',
  [CTA_TYPE.VIDEO]: ' - This link plays a video',
  [CTA_TYPE.PDF]: ' - This link downloads a pdf',
  [CTA_TYPE.BLOG]: '',
};

export const types = CTA_TYPE;

/**
 * @param Base The base class.
 * @returns A mix-in implementing the logic of handling link for CTA.
 */
const CTAMixin = <T extends Constructor<HTMLElement>>(Base: T) => {
  class CTAMixinImpl extends Base {
    /**
     * The `<a>`.
     *
     * @internal
     */
    _linkNode;

    /**
     * Handles `click` event on the `<a>.
     *
     * @param event The event.
     */
    _handleClick(event: MouseEvent) {
      const { ctaType, disabled, href, videoDescription, videoName } = this;

      if (ctaType === CTA_TYPE.VIDEO) {
        event.preventDefault(); // Stop following the link
      }
      if (!disabled) {
        const { eventRunAction } = this.constructor as typeof CTAMixinImpl;

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
      } else {
        event.preventDefault(); // Stop following the link
        event.stopPropagation(); // Stop firing `onClick`
      }
    }

    /**
     * The CTA type.
     */
    @property({ attribute: 'cta-type', type: String, reflect: true })
    ctaType: CTA_TYPE = CTA_TYPE.REGULAR;

    /**
     * `true` if the button should be disabled.
     */
    @property({ type: Boolean })
    disabled?: boolean;

    /**
     * The default file name.
     */
    @property()
    download?: string;

    /**
     * Link `href`.
     */
    @property()
    href?: string;

    /**
     * The link target.
     */
    @property()
    target?: string;

    /**
     * The formatter for the video caption, composed with the video name and the video duration.
     * Should be changed upon the locale the UI is rendered with.
     */
    @property({ attribute: false })
    formatVideoCaption = formatVideoCaption;

    /**
     * The formatter for the video duration.
     * Should be changed upon the locale the UI is rendered with.
     */
    @property({ attribute: false })
    formatVideoDuration = formatVideoDuration;

    /**
     * The video duration.
     */
    @property({ type: Number, attribute: 'video-duration', reflect: true })
    videoDuration?: number;

    /**
     * The video name.
     */
    @property({ attribute: 'video-name', reflect: true })
    videoName?: string;

    /**
     * The video description.
     */
    @property({ attribute: 'video-description', reflect: true })
    videoDescription?: string;

    /**
     * The full formatted video title with duration
     */
    @property()
    videoTitle;

    /**
     * The video thumbnail URL.
     * Text CTA does not support video thumbnail, and this property should never be set.
     */
    videoThumbnailUrl?: never;

    /**
     * @returns The template for the icon.
     */
    _renderIcon() {
      const { ctaType } = this;
      const icon = icons[`${ctaType}-${document.dir}`] ?? icons[ctaType];
      return html`
        <slot name="icon">
          <span class="${prefix}--visually-hidden">${ariaLabels[ctaType]}</span>
          ${icon?.({
            class: `${c4dPrefix}--card__cta ${c4dPrefix}-ce--cta__icon`,
          })}
        </slot>
      `;
    }

    firstUpdated() {
      const { ctaType, href } = this;
      // Check for the URL trigger meant to fire eventRunAction.
      if (ctaType === CTA_TYPE.VIDEO && href) {
        this._checkUrlVideoTrigger();
      }
    }

    /**
     * Handles `.updated()` method of `lit-element`.
     */
    updated(changedProperties) {
      // Declaring this mixin as it extends `LitElement` seems to cause a TS error
      // @ts-ignore
      super.updated(changedProperties);
      const {
        ctaType,
        _linkNode: linkNode,
        videoName,
        videoDescription,
        href,
        videoDuration,
      } = this;
      if (
        changedProperties.has('ctaType') ||
        changedProperties.has('download')
      ) {
        const { download } = this;

        const downloadTypes = [CTA_TYPE.DOWNLOAD, CTA_TYPE.PDF];

        if (!downloadTypes.includes(ctaType) && download) {
          // eslint-disable-next-line no-console
          console.warn(
            `\`download\` property used with a CTA data item besides \`type: download|pdf\` (\`type: ${ctaType}\`).`
          );
        }

        const contactMethods = {
          [CTA_TYPE.EMAIL]: 'email-link',
          [CTA_TYPE.SCHEDULE]: 'scheduler-link',
          [CTA_TYPE.CHAT]: 'chat-link',
          [CTA_TYPE.CALL]: 'phone-link',
        };

        if (Object.keys(contactMethods).includes(ctaType)) {
          linkNode.dataset.ibmContact = contactMethods[ctaType];
        }
      }
      // TODO: See why `linkNode` can possibly be `null`
      if (linkNode && linkNode.nodeName === 'A') {
        if (changedProperties.has('ctaType') || changedProperties.has('href')) {
          const { href } = this;
          const hrefValue = ctaType !== CTA_TYPE.VIDEO ? href : '#';
          // If this CTA is of video, uses the link as the action button
          if (hrefValue == null) {
            linkNode.removeAttribute('href');
          } else {
            linkNode.setAttribute('href', hrefValue);
          }
        }
        if (
          changedProperties.has('ctaType') ||
          changedProperties.has('target')
        ) {
          // Default the target to `_blank` if this CTA is an external link and
          // target is not already set
          const { target } = this;

          const newTabTypes = [CTA_TYPE.EXTERNAL, CTA_TYPE.NEW_TAB];

          const targetInEffect =
            newTabTypes.includes(ctaType) && !target ? '_blank' : target;

          if (!targetInEffect) {
            linkNode.removeAttribute('target');
          } else {
            linkNode.setAttribute('target', targetInEffect);
          }
        }
        if (linkNode.hasAttribute('aria-label')) {
          linkNode.setAttribute(
            'aria-label',
            linkNode.getAttribute('aria-label') +
              (ctaType ? ariaLabels[ctaType] : '')
          );
        }
      }

      const { eventRequestVideoData } = this.constructor as typeof CTAMixinImpl;
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
     * Check the URL for a fragment including the video id.
     *
     * If we find a URL fragment that includes the video id, we trigger the
     * eventRunAction event, which for video will open the video and start
     * playback in a lightbox. This is the same thing that happens when the user
     * clicks on the CTA.
     */
    _checkUrlVideoTrigger() {
      const { ctaType, disabled, href, videoDescription, videoName } = this;
      // Without a video id, or if the button is disabled, there is nothing to
      // do here.
      if (ctaType !== CTA_TYPE.VIDEO || !href || disabled) {
        return;
      }
      // Only trigger for the first CTA with the video id in the page.
      if (this.ownerDocument.querySelector(`[href='${href}']`) !== this) {
        return;
      }
      const { eventRunAction } = this.constructor as typeof CTAMixinImpl;
      const hash = root.location.hash;
      const urlTrigger = `cta-video-${href}`;

      if (hash === `#${urlTrigger}`) {
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

  return CTAMixinImpl;
};

export type CTAMixinImpl = InstanceType<ReturnType<typeof CTAMixin>>;

export default CTAMixin;
