/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings.js';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import ArrowDown20 from 'carbon-web-components/es/icons/arrow--down/20.js';
import ArrowRight20 from 'carbon-web-components/es/icons/arrow--right/20.js';
import Download20 from 'carbon-web-components/es/icons/download/20.js';
import Launch20 from 'carbon-web-components/es/icons/launch/20.js';
import PlayOutline20 from 'carbon-web-components/es/icons/play--outline/20.js';
import { CTA_TYPE } from '../shared-enums';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Icons to use, keyed by CTA type.
 */
export const icons = {
  [CTA_TYPE.LOCAL]: ArrowRight20,
  [CTA_TYPE.DOWNLOAD]: Download20,
  [CTA_TYPE.EXTERNAL]: Launch20,
  [CTA_TYPE.JUMP]: ArrowDown20,
  [CTA_TYPE.VIDEO]: PlayOutline20,
};

/**
 * @param Base The base class.
 * @returns A mix-in implementing the logic of handling link for CTA.
 */
const CTAMixin = <T extends Constructor<HTMLElement>>(Base: T) => {
  abstract class CTAMixinImpl extends Base {
    /**
     * The `<a>`.
     */
    abstract _linkNode;

    /**
     * Handles `click` event on the `<a>.
     *
     * @param event The event.
     */
    _handleClickLink(event: MouseEvent) {
      const { ctaType, disabled, href } = this;
      if (disabled || ctaType === CTA_TYPE.VIDEO) {
        event.preventDefault(); // Stop following the link
      }
      if (disabled) {
        event.stopPropagation(); // Stop firing `onClick`
      } else {
        const { eventRunAction } = this.constructor as typeof CTAMixinImpl;
        this.dispatchEvent(
          new CustomEvent(eventRunAction, {
            bubbles: true,
            cancelable: true,
            composed: true,
            detail: {
              href,
              ctaType,
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
     * The default file name.
     */
    abstract download?: string;

    /**
     * The formatter for the video caption, composed with the video name and the video duration.
     * Should be changed upon the locale the UI is rendered with.
     */
    formatVideoCaption?: never | (({ duration, name }: { duration?: string; name?: string }) => string);

    /**
     * The formatter for the video duration.
     * Should be changed upon the locale the UI is rendered with.
     */
    formatVideoDuration?: never | (({ duration }: { duration?: number }) => string);

    /**
     * Link `href`.
     */
    abstract href?: string;

    /**
     * The link target.
     */
    abstract target?: string;

    /**
     * The video duration.
     */
    abstract videoDuration?: never | number;

    /**
     * The video name.
     */
    abstract videoName?: never | string;

    /**
     * The video thumbnail URL.
     */
    abstract videoThumbnailUrl?: never | string;

    /**
     * @returns The template for the icon.
     */
    _renderIcon() {
      const { ctaType } = this;
      return html`
        <slot name="icon">${icons[ctaType]?.({ class: `${prefix}--card__cta ${ddsPrefix}-ce--cta__icon` })}</slot>
      `;
    }

    /**
     * Handles `.updated()` method of `lit-element`.
     */
    updated(changedProperties) {
      // Declaring this mixin as it extends `LitElement` seems to cause a TS error
      // @ts-ignore
      super.updated(changedProperties);
      const { ctaType, _linkNode: linkNode } = this;
      if (changedProperties.has('ctaType') && ctaType === CTA_TYPE.VIDEO) {
        const { href, videoDuration } = this;
        if (typeof videoDuration === 'undefined') {
          const { eventRequestVideoData } = this.constructor as typeof CTAMixinImpl;
          this.dispatchEvent(
            new CustomEvent(eventRequestVideoData, {
              bubbles: true,
              cancelable: true,
              composed: true,
              detail: {
                href,
              },
            })
          );
        }
      }
      if (changedProperties.has('ctaType') || changedProperties.has('download')) {
        const { download } = this;
        if (ctaType !== CTA_TYPE.DOWNLOAD && download) {
          // eslint-disable-next-line no-console
          console.warn(`\`download\` property used with a CTA data item besides \`type: download\` (\`type: ${ctaType}\`).`);
        }
      }
      // TODO: See why `linkNode` can possibly be `null`
      if (linkNode) {
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
        if (changedProperties.has('ctaType') || changedProperties.has('target')) {
          // If this CTA is of an external link, defaults the target to `_blank`
          const { target } = this;
          const targetInEffect = target || ctaType !== CTA_TYPE.EXTERNAL ? undefined : '_blank';
          if (!targetInEffect) {
            linkNode.removeAttribute('target');
          } else {
            linkNode.setAttribute('target', targetInEffect);
          }
        }
      }
    }

    /**
     * The name of the custom event fired when there is a user gesture to run the action.
     */
    static get eventRequestVideoData() {
      return `${ddsPrefix}-cta-request-video-data`;
    }

    /**
     * The name of the custom event fired when there is a user gesture to run the action.
     */
    static get eventRunAction() {
      return `${ddsPrefix}-cta-run-action`;
    }
  }

  return CTAMixinImpl;
};

export type CTAMixinImpl = InstanceType<ReturnType<typeof CTAMixin>>;

export default CTAMixin;
