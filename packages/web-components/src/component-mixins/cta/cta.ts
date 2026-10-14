/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { property } from 'lit/decorators.js';
import KalturaPlayerAPI from '@carbon/ibmdotcom-services/es/services/KalturaPlayerV7/KalturaPlayer.js';

// TEMP(lit3-migration): placeholder icon stubs for step 2 spike until step 5 migrates all icon imports
const createIconStub = () =>
  html`<svg
    focusable="false"
    preserveAspectRatio="xMidYMid meet"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    aria-hidden="true"
    width="20"
    height="20"
    viewBox="0 0 20 20">
    <path
      d="M11.8 2.8L10.8 3.8 16.2 9.2 1 9.2 1 10.8 16.2 10.8 10.8 16.2 11.8 17.2 19 10z"></path>
  </svg>`;

const ArrowDown20 = createIconStub;
const ArrowLeft20 = createIconStub;
const ArrowRight20 = createIconStub;
const Download20 = createIconStub;
const Launch20 = createIconStub;
const PlayFilledAlt20 = createIconStub;
const Blog20 = createIconStub;
const DocumentPDF20 = createIconStub;
const NewTab20 = createIconStub;
const Phone20 = createIconStub;
const Calendar20 = createIconStub;
const Email20 = createIconStub;
const Chat20 = createIconStub;
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
 * @csspart icon-visually-hidden - The cta icon element for screen readers. Usage: `c4d-left-nav-name::part(icon-visually-hidden)`
 */
const CTAMixin = <T extends Constructor<HTMLElement>>(Base: T) => {
  class CTAMixinImpl extends Base {
    /**
     * The `<a>`.
     *
     * @internal
     */
    // TEMP(lit3-migration): declare _linkNode so it does not emit runtime field assignment that clashes with child getter
    declare _linkNode?: HTMLAnchorElement;

    /**
     * Handles `click` event on the `<a>.
     *
     * @param event The event.
     */
    _handleClick(event: MouseEvent) {
      const {
        ctaType,
        disabled,
        href,
        videoDescription,
        videoName,
        ctaContents,
      } = this;

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
              ctaContents,
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
     *The CTA slotted content
     */
    @property()
    ctaContents?: HTMLElement;

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
          <span class="${prefix}--visually-hidden" part="icon-visually-hidden"
            >${ariaLabels[ctaType]}</span
          >
          ${icon?.({
            class: `${c4dPrefix}--card__cta ${c4dPrefix}-ce--cta__icon`,
            part: 'cta-icon',
          })}
        </slot>
      `;
    }

    firstUpdated() {
      const { ctaType, href } = this;
      // Check for the URL trigger meant to fire eventRunAction.
      if (ctaType === CTA_TYPE.VIDEO && href) {
        this._checkUrlVideoTrigger();
        this.ctaContents =
          (this.querySelector('[slot="cta"]') as HTMLElement) || undefined;
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
          // Wait for the container to be ready without blocking.
          customElements
            .whenDefined(`${c4dPrefix}-video-cta-container`)
            .then(() => {
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
            });
        }
      }

      if (
        (changedProperties.has('videoName') &&
          (videoName === null || videoName === 'null')) ||
        changedProperties.has('videoDescription')
      ) {
        if (typeof videoDuration === 'undefined') {
          // Wait for the container to be ready without blocking.
          customElements
            .whenDefined(`${c4dPrefix}-video-cta-container`)
            .then(() => {
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
            });
        }
      }

      const firstChild = this?.shadowRoot?.querySelector(':first-child') as
        | HTMLElement
        | null
        | undefined;
      if (
        ctaType === CTA_TYPE.VIDEO &&
        firstChild &&
        firstChild.offsetWidth > 0
      ) {
        this._updateVideoThumbnailUrl(String(firstChild.offsetWidth));
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
      const {
        ctaType,
        disabled,
        href,
        videoDescription,
        videoName,
        ctaContents,
      } = this;
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
              ctaContents,
            },
          })
        );
      }
    }

    /**
     * Updates video thumbnail url to match card width.
     */
    _updateVideoThumbnailUrl(width?: string) {
      this.videoThumbnailUrl = KalturaPlayerAPI.getThumbnailUrl({
        mediaId: this.href,
        width: width ?? '340',
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
