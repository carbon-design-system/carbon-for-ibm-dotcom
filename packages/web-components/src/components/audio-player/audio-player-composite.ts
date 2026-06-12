/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import HostListener from '@carbon/web-components/es/globals/decorators/host-listener.js';
import HostListenerMixin from '@carbon/web-components/es/globals/mixins/host-listener.js';
import settings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import HybridRenderMixin from '../../globals/mixins/hybrid-render';
import { MediaData } from '../../internal/vendor/@carbon/ibmdotcom-services-store/types/kalturaPlayerAPIv7';
import './audio-player';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';
import ifNonEmpty from '@carbon/web-components/es/globals/directives/if-non-empty.js';

const { stablePrefix: c4dPrefix } = settings;

/**
 * Component that renders audio player from its metadata.
 * Simplified composite for audio-only content.
 *
 * @element c4d-audio-player-composite
 * @csspart audio-player - The audio player. Usage `c4d-audio-player-composite::part(audio-player)`
 */
@customElement(`${c4dPrefix}-audio-player-composite`)
class C4DAudioPlayerComposite extends HybridRenderMixin(
  HostListenerMixin(LitElement)
) {
  /**
   * The placeholder for `_loadVideoData()` Redux action that may be mixed in.
   *
   * @internal
   */
  _loadVideoData?: (videoId: string) => Promise<MediaData>;

  /**
   * The placeholder for `_embedMedia()` Redux action that may be mixed in.
   *
   * @internal
   */
  _embedMedia?: (videoId: string) => Promise<any>;

  /**
   * The placeholder for `_setAutoplayPreference()` Redux action that may be mixed in.
   */
  _setAutoplayPreference?: (preference: boolean) => void;

  /**
   * The placeholder for `_getAutoplayPreference()` Redux action that may be mixed in.
   */
  _getAutoplayPreference?: () => null | boolean;

  /**
   * The audio player.
   */
  protected get _audioPlayer() {
    const { selectorAudioPlayer } = this
      .constructor as typeof C4DAudioPlayerComposite;
    return this.querySelector(selectorAudioPlayer);
  }

  /**
   * Handles playback state change events.
   *
   * @param event The event.
   */
  @HostListener('eventPlaybackStateChange')
  protected _handlePlaybackStateChange(event: CustomEvent) {
    const { mediaId, isPlaying } = event.detail;
    const { embeddedVideos = {} } = this;

    if (embeddedVideos[mediaId]) {
      if (isPlaying) {
        embeddedVideos[mediaId].play();
        this.isPlaying = true;
      } else {
        embeddedVideos[mediaId].pause();
        this.isPlaying = false;
      }
      
      if (this._setAutoplayPreference) {
        this._setAutoplayPreference(isPlaying);
      }
    }
  }

  /**
   * `true` to autoplay the audio.
   */
  @property({ type: Boolean, attribute: 'auto-play' })
  autoPlay = false;

  /**
   * `true` to load audio with sound muted.
   */
  @property({ type: Boolean, attribute: 'muted' })
  muted = false;

  /**
   * The embedded Kaltura player element (that has APIs), keyed by the media ID.
   */
  @property({ attribute: false })
  embeddedVideos?: { [videoId: string]: any };

  /**
   * Optional custom audio title.
   */
  @property({ reflect: true, attribute: 'audio-title' })
  audioTitle?: string;

  /**
   * The media data, keyed by the media ID.
   */
  @property({ attribute: false })
  mediaData?: { [videoId: string]: MediaData };

  /**
   * The media ID.
   */
  @property({ attribute: 'media-id' })
  mediaId = '';

  /**
   * The current playback state.
   */
  @property({ type: Boolean })
  isPlaying = false;

  /**
   * Optional custom UI configuration ID.
   */
  @property({ attribute: 'ui-conf-id' })
  uiConfId?: string;

  /**
   * Optional custom partner ID.
   */
  @property({ attribute: 'partner-id' })
  partnerId?: string;

  /**
   * Track when we have triggered initial playback.
   */
  @state()
  playbackTriggered = false;

  connectedCallback() {
    super.connectedCallback();

    if (this.autoPlay) {
      const storedPreference = this._getAutoplayPreference?.();
      if (storedPreference === null) {
        this.isPlaying = !window.matchMedia('(prefers-reduced-motion: reduce)')
          .matches;
      } else {
        this.isPlaying = storedPreference ?? false;
      }
    }
  }

  updated(changedProperties) {
    if (changedProperties.has('mediaId')) {
      const { autoPlay, mediaId } = this;
      if (mediaId) {
        this._loadVideoData?.(mediaId);
        // Auto-embed for audio players
        this._embedMedia?.(mediaId);
        
        if (autoPlay && this.isPlaying) {
          // Trigger autoplay after embed
          setTimeout(() => {
            const { embeddedVideos = {} } = this;
            if (embeddedVideos[mediaId]) {
              embeddedVideos[mediaId].play();
              this.playbackTriggered = true;
            }
          }, 500);
        }
      }
    }
  }

  renderLightDOM() {
    const {
      audioTitle,
      mediaData = {},
      mediaId,
      uiConfId,
      partnerId,
    } = this;
    
    const { [mediaId]: currentMediaData = {} as MediaData } = mediaData;
    const { name } = currentMediaData;
    const title = audioTitle || name;

    return html`
      <c4d-audio-player
        part="audio-player"
        media-id="${ifNonEmpty(mediaId)}"
        audio-title="${ifNonEmpty(title)}"
        ui-conf-id="${ifNonEmpty(uiConfId)}"
        partner-id="${ifNonEmpty(partnerId)}"
        ?auto-play="${this.autoPlay}"
        ?muted="${this.muted}"
        .isPlaying="${this.isPlaying}">
      </c4d-audio-player>
    `;
  }

  render() {
    return html` <slot></slot> `;
  }

  /**
   * A selector selecting the audio player component.
   */
  static get selectorAudioPlayer() {
    return `${c4dPrefix}-audio-player`;
  }

  /**
   * The name of the custom event fired when playback state changes.
   */
  static get eventPlaybackStateChange() {
    return `${c4dPrefix}-audio-player-playback-state-changed`;
  }
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DAudioPlayerComposite;
