/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from 'lit-html';
import { html, property, customElement, LitElement } from 'lit-element';
import on from 'carbon-components/es/globals/js/misc/on';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import ifNonNull from 'carbon-custom-elements/es/globals/directives/if-non-null';
import 'carbon-custom-elements/es/components/modal/modal-close-button';
import HybridRenderMixin from '../../globals/mixins/hybrid-render';
import Handle from '../../globals/internal/handle';
import '../modal/modal';
import '../modal/modal-header';
import '../lightbox-media-viewer/lightbox-media-viewer-body';
import '../lightbox-media-viewer/lightbox-video-player-container';
import './text-cta';
import { CTA_STYLE, CTA_TYPE } from './shared-enums';
import styles from './cta-container.scss';

export { CTA_STYLE, CTA_TYPE };

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Base CTA data item.
 */
export interface BASE_CTA_ITEM {
  /**
   * The copy text.
   */
  copy: string;
}

/**
 * Base CTA data item with `type`.
 */
interface TYPED_CTA_ITEM extends BASE_CTA_ITEM {
  /**
   * The default file name for downloading, should be used only with `CTA_TYPE.DOWNLOAD`.
   */
  download: string;

  /**
   * The href. For video CTA type, the video ID should be given.
   */
  href: string;

  /**
   * The CTA type.
   */
  type: CTA_TYPE;
}

/**
 * CTA data item for text CTA style.
 */
export type TEXT_CTA_ITEM = TYPED_CTA_ITEM;

/**
 * CTA container.
 *
 * @element dds-cta-container
 */
@customElement(`${ddsPrefix}-cta-container`)
class DDSCTAContainer extends HybridRenderMixin(LitElement) {
  /**
   * The handle for the listener of `${ddsPrefix}-cta-run-action` event.
   */
  private _hRunAction: Handle | null = null;

  /**
   * `true` to show the video player.
   */
  private _currentVideoId?: string;

  /**
   * The element where `<dds-lightbox-media-viewer>` should be put in.
   */
  private _modalContainerRoot: HTMLDivElement | null = null;

  /**
   * Creates the element where `<dds-lightbox-media-viewer>` should be put in, if it's not created yet.
   *
   * @returns The element where `<dds-lightbox-media-viewer>` should be put in.
   */
  private _createModalContainerRoot() {
    if (!this._modalContainerRoot) {
      const { ownerDocument: doc } = this;
      const div = doc!.createElement('div');
      doc!.body.appendChild(div);
      this._modalContainerRoot = div;
    }
    return this._modalContainerRoot;
  }

  /**
   * Handles the user gesture of closing video player modal.
   * NOTE:
   *   Given `.renderLightboxMediaViewer()` runs outside of `lit-element` rendering scope,
   *   `lit-element`'s automatic `this` binding won't work here (and thus we are using an arrow function).
   */
  private _handleCloseVideoPlayer = () => {
    this._currentVideoId = undefined;
    this.requestUpdate();
  };

  /**
   * Handles `${ddsPrefix}-cta-run-action` event.
   *
   * @param event The event.
   */
  private _handleRunAction(event: CustomEvent) {
    this._currentVideoId = event.detail.href;
    this.requestUpdate();
  }

  /**
   * @param text The text data to render.
   * @returns The rendered version of the given data.
   */
  // eslint-disable-next-line class-methods-use-this
  private _renderText(text: TEXT_CTA_ITEM) {
    const { copy, download, href, type } = text;
    return html`
      <dds-text-cta download="${ifNonNull(download)}" href="${ifNonNull(href)}" type="${ifNonNull(type)}">
        ${copy}
      </dds-text-cta>
    `;
  }

  /**
   * CTA style.
   */
  @property({ attribute: 'cta-style' })
  ctaStyle = CTA_STYLE.TEXT;

  /**
   * CTA item.
   */
  @property({ type: Object })
  item?: TEXT_CTA_ITEM;

  connectedCallback() {
    super.connectedCallback();
    const { eventRunAction } = this.constructor as typeof DDSCTAContainer;
    // Manually hooks the event listeners on the host element to make the event names configurable
    this._hRunAction = on(this, eventRunAction, this._handleRunAction as EventListener);
  }

  disconnectedCallback() {
    if (this._modalContainerRoot) {
      this._modalContainerRoot.remove();
      this._modalContainerRoot = null;
    }
    if (this._hRunAction) {
      this._hRunAction = this._hRunAction.release();
    }
    super.disconnectedCallback();
  }

  /**
   * @returns The media viewer lightbox for `type="video"`.
   */
  renderLightboxMediaViewer() {
    const { _currentVideoId: currentVideoId, _handleCloseVideoPlayer: handleCloseVideoPlayer } = this;
    return html`
      <dds-lightbox-video-player-container video-id="${ifNonNull(currentVideoId)}">
        <dds-modal ?open="${Boolean(currentVideoId)}" size="full-width" @dds-modal-closed="${handleCloseVideoPlayer}">
          <bx-modal-close-button></bx-modal-close-button>
          <dds-lightbox-media-viewer-body></dds-lightbox-media-viewer-body>
        </dds-modal>
      </dds-lightbox-video-player-container>
    `;
  }

  renderLightDOM() {
    const { ctaStyle, item } = this;
    switch (ctaStyle) {
      case CTA_STYLE.TEXT:
        return this._renderText(item as TEXT_CTA_ITEM);
      default:
        return undefined;
    }
  }

  render() {
    return html`
      <slot></slot>
    `;
  }

  update(changedProperties) {
    super.update(changedProperties);
    const modalContainer = this._createModalContainerRoot();
    if (modalContainer) {
      render(this.renderLightboxMediaViewer(), modalContainer);
    }
  }

  /**
   * The name of the custom event fired when there is a user gesture to run the action.
   */
  static get eventRunAction() {
    return `${ddsPrefix}-cta-run-action`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSCTAContainer;
