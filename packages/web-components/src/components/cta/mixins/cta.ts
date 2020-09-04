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
 * Icons to use, keyed by CTA style.
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
      const { disabled, href, type } = this;
      if (disabled || type === CTA_TYPE.VIDEO) {
        event.preventDefault(); // Stop following the link
      }
      if (disabled) {
        event.stopPropagation(); // Stop firing `onClick`
      } else {
        const { eventRunAction } = this.constructor as typeof CTAMixinImpl;
        if (!eventRunAction) {
          throw new TypeError('The class inheriting `CTAMixin` has to implement `eventRunAction` static property.');
        }
        this.dispatchEvent(
          new CustomEvent(eventRunAction, {
            bubbles: true,
            cancelable: true,
            composed: true,
            detail: {
              href,
              type,
            },
          })
        );
      }
    }

    /**
     * `true` if the button should be disabled.
     */
    abstract disabled;

    /**
     * The default file name.
     */
    abstract download;

    /**
     * Link `href`.
     */
    abstract href;

    /**
     * The link target.
     */
    abstract target;

    /**
     * The MIME type of the `target`.
     */
    abstract type;

    /**
     * @returns The template for the icon.
     */
    _renderIcon() {
      const { type } = this;
      return html`
        <slot name="icon">${icons[type]?.({ class: `${prefix}--card__cta ${ddsPrefix}-ce--cta__icon` })}</slot>
      `;
    }

    /**
     * Handles `.updated()` method of `lit-element`.
     */
    updated(changedProperties) {
      // Declaring this mixin as it extends `LitElement` seems to cause a TS error
      // @ts-ignore
      super.updated(changedProperties);
      const { download, href, target, type, _linkNode: linkNode } = this;
      if (type !== CTA_TYPE.DOWNLOAD && download) {
        // eslint-disable-next-line no-console
        console.warn(`\`download\` property used with a CTA data item besides \`type: download\` (\`type: ${type}\`).`);
      }
      // TODO: See why `linkNode` can possibly be `null`
      if (linkNode) {
        // If this CTA is of video, uses the link as the action button
        linkNode.href = type !== CTA_TYPE.VIDEO ? href! : '#';
        // If this CTA is of an external link, defaults the target to `_blank`
        const targetInEffect = target || type !== CTA_TYPE.EXTERNAL ? undefined : '_blank';
        if (!targetInEffect) {
          linkNode.removeAttribute('target');
        } else {
          linkNode.setAttribute('target', targetInEffect);
        }
      }
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

export default CTAMixin;
