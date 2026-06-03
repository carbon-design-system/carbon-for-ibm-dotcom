/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import FocusMixin from '@carbon/web-components/es/globals/mixins/focus.js';
import settings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import styles from './audio-player.scss';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';

const { stablePrefix: c4dPrefix } = settings;

/**
 * Audio player component for podcast and audio content.
 * Simplified version focused on audio playback only.
 *
 * @element c4d-audio-player
 * @csspart audio-container - The audio container. Usage `c4d-audio-player::part(audio-container)`
 */
@customElement(`${c4dPrefix}-audio-player`)
class C4DAudioPlayer extends FocusMixin(StableSelectorMixin(LitElement)) {
  /**
   * The media ID for the audio content.
   */
  @property({ attribute: 'media-id' })
  mediaId?: string;

  /**
   * `true` to autoplay the audio.
   */
  @property({ type: Boolean, attribute: 'auto-play' })
  autoPlay = false;

  /**
   * The current playback state.
   */
  @property({ type: Boolean })
  isPlaying = false;

  /**
   * `true` to mute the audio.
   */
  @property({ type: Boolean, attribute: 'muted' })
  muted = false;

  /**
   * Optional custom audio title.
   */
  @property({ attribute: 'audio-title' })
  audioTitle?: string;

  /**
   * Optional custom UI configuration ID for Kaltura player.
   */
  @property({ attribute: 'ui-conf-id' })
  uiConfId?: string;

  /**
   * Optional custom partner ID for Kaltura player.
   */
  @property({ attribute: 'partner-id' })
  partnerId?: string;

  /**
   * Handles playback state changes.
   */
  protected _handlePlaybackChange = () => {
    const { mediaId } = this;
    const { eventPlaybackStateChange } = this
      .constructor as typeof C4DAudioPlayer;
    this.dispatchEvent(
      new CustomEvent(eventPlaybackStateChange, {
        bubbles: true,
        composed: true,
        detail: {
          mediaId,
          isPlaying: !this.isPlaying,
        },
      })
    );
  };

  render() {
    const { audioTitle } = this;

    return html`
      <div class="${c4dPrefix}--audio-player__container" part="audio-container">
        <slot></slot>
        ${audioTitle
          ? html`
              <div class="${c4dPrefix}--audio-player__title">
                ${audioTitle}
              </div>
            `
          : ''}
      </div>
    `;
  }

  firstUpdated() {
    this.tabIndex = 0;
    if (this.audioTitle) {
      this.setAttribute('aria-label', this.audioTitle);
    }
  }

  updated(changedProperties) {
    if (changedProperties.has('audioTitle')) {
      const { audioTitle } = this;
      if (audioTitle) {
        this.setAttribute('aria-label', audioTitle);
      }
    }
  }

  /**
   * The name of the custom event fired when playback state changes.
   */
  static get eventPlaybackStateChange() {
    return `${c4dPrefix}-audio-player-playback-state-changed`;
  }

  static get stableSelector() {
    return `${c4dPrefix}--audio-player`;
  }

  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };
  static styles = styles;
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DAudioPlayer;
