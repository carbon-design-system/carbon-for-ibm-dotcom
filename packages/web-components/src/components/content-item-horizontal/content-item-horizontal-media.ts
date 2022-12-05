/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  customElement,
  html,
  state,
  property,
  TemplateResult,
} from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings.js';
import { baseFontSize, breakpoints } from '@carbon/layout';
import HostListener from '@carbon/web-components/es/globals/decorators/host-listener.js';
import HostListenerMixin from '@carbon/web-components/es/globals/mixins/host-listener.js';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import DDSContentItem from '../content-item/content-item';
import styles from './content-item-horizontal-media.scss';

import { MEDIA_ALIGN } from './defs';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

const breakpoint = parseFloat(breakpoints.lg.width) * baseFontSize;

/**
 * A component to present content in a horizontal orientation with media.
 *
 * @element dds-content-item-horizontal-media
 */
@customElement(`${ddsPrefix}-content-item-horizontal-media`)
class DDSContentItemHorizontalMedia extends HostListenerMixin(DDSContentItem) {
  /**
   * Defines the alignment of the media: `left` or `right`
   */
  @property({ reflect: true })
  align = MEDIA_ALIGN.RIGHT;

  /**
   * Identifies whether the window width is below the breakpoint or not.
   */
  @state()
  _isOneColumn: boolean = window.innerWidth < breakpoint;

  @HostListener('window:resize')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleWindowResize = (): void => {
    this._isOneColumn = window.innerWidth < breakpoint;
  };

  /**
   * @returns The text column content.
   */
  protected _renderTextCol(): TemplateResult | string | void {
    return html`
      <div class="${prefix}--content-item-horizontal__col">
        <slot name="eyebrow" @slotchange="${this._handleSlotChange}"></slot>
        <slot name="heading"></slot>
        ${this._renderBody()} ${this._renderFooter()}
      </div>
    `;
  }

  /**
   * @returns The component content in the appropriate tabbing order.
   */
  protected _renderContent(): TemplateResult | string | void {
    const alignedRight = this._isOneColumn || this.align === MEDIA_ALIGN.RIGHT;

    return alignedRight
      ? html`
          ${this._renderTextCol()}
          <div class="${prefix}--content-item-horizontal__col">
            <slot name="media" @slotchange="${this._handleSlotChange}"></slot>
          </div>
        `
      : html`
          <div class="${prefix}--content-item-horizontal__col">
            <slot name="media" @slotchange="${this._handleSlotChange}"></slot>
          </div>
          ${this._renderTextCol()}
        `;
  }

  render() {
    return html`
      <div
        class="${prefix}--content-item-horizontal__row ${prefix}--content-item-horizontal-media__align-${this
          .align}"
      >
        ${this._renderContent()}
      </div>
    `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--content-item-horizontal-media`;
  }

  static styles = styles;
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSContentItemHorizontalMedia;
