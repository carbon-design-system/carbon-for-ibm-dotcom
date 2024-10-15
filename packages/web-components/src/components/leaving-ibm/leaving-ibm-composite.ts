/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import CDSModal from '@carbon/web-components/es/components/modal/modal.js';
import HostListenerMixin from '@carbon/web-components/es/globals/mixins/host-listener.js';
import HostListener from '@carbon/web-components/es/globals/decorators/host-listener.js';
import settings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import {
  LeavingIBMLabels,
  Translation,
} from '@carbon/ibmdotcom-services-store/es/types/translateAPI';
import './leaving-ibm-modal';
import './leaving-ibm-modal-body';
import './leaving-ibm-modal-heading';
import './leaving-ibm-modal-supplemental';
import ModalRenderMixin from '../../globals/mixins/modal-render';
import '@carbon/web-components/es/components/modal/modal-header.js';
import '@carbon/web-components/es/components/modal/modal-close-button.js';
import '@carbon/web-components/es/components/modal/modal-footer.js';
import '@carbon/web-components/es/components/button/button.js';
import styles from './leaving-ibm.scss?lit';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';

const { stablePrefix: c4dPrefix } = settings;

/**
 * Component that renders leaving IBM modal component.
 *
 * @element c4d-leaving-ibm-composite
 * @csspart modal - The modal container. Usage `c4d-leaving-ibm-composite::part(modal)`
 * @csspart header - The header. Usage `c4d-leaving-ibm-composite::part(header)`
 * @csspart button - The close button.  Usage `c4d-leaving-ibm-composite::part(close-button)`
 * @csspart heading - The modal title. Usage `c4d-leaving-ibm-composite::part(heading)`
 * @csspart body - The modal body. Usage `c4d-leaving-ibm-composite::part(body)`
 * @csspart supplemental - The modal supplemental. Usage `c4d-leaving-ibm-composite::part(supplemental)`
 * @csspart footer - The modal footer. Usage `c4d-leaving-ibm-composite::part(footer)`
 */
@customElement(`${c4dPrefix}-leaving-ibm-composite`)
class C4DLeavingIbmComposite extends HostListenerMixin(
  ModalRenderMixin(LitElement)
) {
  /**
   * The placeholder for `setLanguage()` Redux action that will be mixed in.
   *
   * @internal
   */
  _setLanguage?: (string) => void;

  /**
   * The placeholder for `loadTranslation()` Redux action that will be mixed in.
   *
   * @internal
   */
  _loadTranslation?: (language?: string) => Promise<Translation>;

  /**
   * Leaving IBM modal copy
   */
  @property({ attribute: false })
  leavingIbmCopy: LeavingIBMLabels = {
    LEAVING001: '',
    LEAVING002: '',
    LEAVING003: '',
  };

  /**
   * Leaving IBM modal button label
   */
  @property({ attribute: false })
  leavingIbmButtonLabel = '';

  /**
   * The language used for query.
   */
  @property()
  language?: string;

  /**
   * `true` to open the modal.
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  /**
   * external url triggering the leaving ibm modal.
   */
  @property({ reflect: true })
  href = '';

  @HostListener('document:click')
  protected _handleDocumentClick = (event: PointerEvent): void => {
    const { attributeLeaving } = this
      .constructor as typeof C4DLeavingIbmComposite;
    if (!this.open) {
      const { target } = event;
      const linkTarget =
        target instanceof HTMLAnchorElement
          ? target
          : (event.composedPath().find((pathTarget) => {
              return pathTarget instanceof HTMLAnchorElement;
            }) as HTMLAnchorElement | undefined);

      if (linkTarget) {
        const linkIsExternal = linkTarget.hasAttribute(attributeLeaving);
        const targetIsExternal =
          target instanceof Element && target.hasAttribute(attributeLeaving);

        if (linkIsExternal || targetIsExternal) {
          event.preventDefault();
          this.href = linkTarget.href;
          this.open = true;
        }
      }
    }
  };

  @HostListener(`document:${CDSModal.eventClose}`)
  protected handleEventClose = (): void => {
    this.open = false;
    this.href = '';
  };

  firstUpdated() {
    const { language } = this;
    if (language) {
      this._setLanguage?.(language);
    }
    this._loadTranslation?.(language).catch(() => {}); // The error is logged in the Redux store
  }

  updated(changedProperties) {
    if (changedProperties.has('language')) {
      const { language } = this;
      if (language) {
        this._setLanguage?.(language);
      }
    }
  }

  renderModal() {
    const { open, leavingIbmCopy, leavingIbmButtonLabel, href } = this;
    return html`
      <c4d-leaving-ibm-modal ?open="${open}" part="modal">
        <cds-modal-header part="header">
          <cds-modal-close-button part="close-button"></cds-modal-close-button>
          <c4d-leaving-ibm-modal-heading part="heading"
            >${leavingIbmCopy?.LEAVING001}</c4d-leaving-ibm-modal-heading
          >
        </cds-modal-header>
        <c4d-leaving-ibm-modal-body part="body" href="${href}">
          <p>${leavingIbmCopy?.LEAVING002}</p>
          <c4d-leaving-ibm-modal-supplemental part="supplemental"
            >${leavingIbmCopy?.LEAVING003}</c4d-leaving-ibm-modal-supplemental
          >
        </c4d-leaving-ibm-modal-body>
        <cds-modal-footer part="footer">
          <cds-button
            part="footer-button"
            data-autoid="${c4dPrefix}--leaving-ibm-cta"
            href="${href}"
            kind="primary"
            >${leavingIbmButtonLabel}</cds-button
          >
        </cds-modal-footer>
      </c4d-leaving-ibm-modal>
    `;
  }

  /**
   * Attribute that triggers Leaving IBM modal on click.
   */
  static get attributeLeaving() {
    return 'data-leaving-ibm';
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DLeavingIbmComposite;
