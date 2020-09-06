/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, customElement, LitElement } from 'lit-element';
import on from 'carbon-components/es/globals/js/misc/on';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import HostListener from 'carbon-web-components/es/globals/decorators/host-listener.js';
import HostListenerMixin from 'carbon-web-components/es/globals/mixins/host-listener.js';
import 'carbon-web-components/es/components/modal/modal-close-button.js';
import HybridRenderMixin from '../../globals/mixins/hybrid-render';
import ModalRenderMixin from '../../globals/mixins/modal-render';
import Handle from '../../globals/internal/handle';
/* eslint-disable import/no-duplicates */
import DDSLightboxVideoPlayerContainer from '../lightbox-media-viewer/lightbox-video-player-container';
// Above import is interface-only ref and thus code won't be brought into the build
import '../lightbox-media-viewer/lightbox-video-player-container';
/* eslint-enable import/no-duplicates */
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
class DDSCTAContainer extends ModalRenderMixin(HybridRenderMixin(HostListenerMixin(LitElement))) {
  /**
   * `true` to show the video player.
   */
  private _currentVideoId?: string;

  /**
   * The handle for the listener of `${ddsPrefix}-modal-closed` event.
   */
  private _hCloseModal: Handle | null = null;

  /**
   * Handles the user gesture of closing video player modal.
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
  @HostListener('eventRunAction')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleRunAction(event: CustomEvent) {
    const { href, type } = event.detail;
    if (type === CTA_TYPE.VIDEO) {
      this._currentVideoId = href;
      this.requestUpdate();
    }
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

  disconnectedCallback() {
    if (this._hCloseModal) {
      this._hCloseModal = this._hCloseModal.release();
    }
    super.disconnectedCallback();
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    if (!this._hCloseModal) {
      const { selectorLightboxVideoPlayerContainer } = this.constructor as typeof DDSCTAContainer;
      const videoPlayerContainer = (this.modalRenderRoot as Element).querySelector(
        selectorLightboxVideoPlayerContainer
      ) as DDSLightboxVideoPlayerContainer;
      // Manually hooks the event listeners on the modal render root to make the event names configurable
      this._hCloseModal = on(
        videoPlayerContainer.modalRenderRoot,
        (this.constructor as typeof DDSCTAContainer).eventCloseLightbox,
        this._handleCloseVideoPlayer as EventListener
      );
    }
  }

  /**
   * @returns The media viewer lightbox for `type="video"`.
   */
  renderModal() {
    const { _currentVideoId: currentVideoId } = this;
    return html`
      <dds-lightbox-video-player-container ?open="${Boolean(currentVideoId)}" video-id="${ifNonNull(currentVideoId)}">
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

  /**
   * A selector selecting the video player container component.
   */
  static get selectorLightboxVideoPlayerContainer() {
    return `${ddsPrefix}-lightbox-video-player-container`;
  }

  /**
   * The name of the custom event fired after the lightbox is closed upon a user gesture.
   */
  static get eventCloseLightbox() {
    return `${ddsPrefix}-modal-closed`;
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
