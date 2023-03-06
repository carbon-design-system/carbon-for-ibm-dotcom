/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import settings from 'carbon-components/es/globals/js/settings.js';
import ArrowDown20 from '../../internal/vendor/@carbon/web-components/icons/arrow--down/20.js';
import ArrowRight20 from '../../internal/vendor/@carbon/web-components/icons/arrow--right/20.js';
import Download20 from '../../internal/vendor/@carbon/web-components/icons/download/20.js';
import Launch20 from '../../internal/vendor/@carbon/web-components/icons/launch/20.js';
import PlayOutline20 from '../../internal/vendor/@carbon/web-components/icons/play--outline/20.js';
import Blog20 from '../../internal/vendor/@carbon/web-components/icons/blog/20.js';
import DocumentPDF20 from '../../internal/vendor/@carbon/web-components/icons/document--pdf/20.js';
import NewTab20 from '../../internal/vendor/@carbon/web-components/icons/new-tab/20.js';
import Phone20 from '../../internal/vendor/@carbon/web-components/icons/phone/20.js';
import Calendar20 from '../../internal/vendor/@carbon/web-components/icons/calendar/20.js';
import Email20 from '../../internal/vendor/@carbon/web-components/icons/email/20.js';
import Chat20 from '../../internal/vendor/@carbon/web-components/icons/chat/20.js';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import { Constructor } from '../../globals/defs';
import { CTA_TYPE } from '../../components/cta/defs';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Icons to use, keyed by CTA type.
 */
export const icons = {
  [CTA_TYPE.LOCAL]: ArrowRight20,
  [CTA_TYPE.DOWNLOAD]: Download20,
  [CTA_TYPE.EXTERNAL]: Launch20,
  [CTA_TYPE.NEW_TAB]: NewTab20,
  [CTA_TYPE.JUMP]: ArrowDown20,
  [CTA_TYPE.VIDEO]: PlayOutline20,
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
  abstract class CTAMixinImpl extends Base {
    /**
     * The `<a>`.
     *
     * @internal
     */
    abstract _linkNode;

    /**
     * Handles `click` event on the `<a>.
     *
     * @param event The event.
     */
    _handleClick(event: MouseEvent) {
      const { disabled } = this;
      if (disabled) {
        event.preventDefault(); // Stop following the link
        event.stopPropagation(); // Stop firing `onClick`
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
     * Link `href`.
     */
    abstract href?: string;

    /**
     * The link target.
     */
    abstract target?: string;

    /**
     * @returns The template for the icon.
     */
    _renderIcon() {
      const { ctaType } = this;
      return html`
        <slot name="icon">
          <span class="bx--visually-hidden">${ariaLabels[ctaType]}</span>
          ${icons[ctaType]?.({
            class: `${prefix}--card__cta ${ddsPrefix}-ce--cta__icon`,
          })}
        </slot>
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
    }
  }

  return CTAMixinImpl;
};

export type CTAMixinImpl = InstanceType<ReturnType<typeof CTAMixin>>;

export default CTAMixin;
