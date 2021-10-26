/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement, html, internalProperty, property, TemplateResult } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import HostListener from 'carbon-web-components/es/globals/decorators/host-listener.js';
import HostListenerMixin from 'carbon-web-components/es/globals/mixins/host-listener.js';
import DDSContentItem from '../content-item/content-item';
import styles from './content-item-horizontal-media.scss';

import { MEDIA_ALIGN } from './defs';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

// The "lg" Carbon breakpoint.
// @TODO See if this can be pulled from a Carbon package.
const breakpoint: number = 1056;

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
  @internalProperty()
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
   * @returns The media column content.
   */
  protected _renderMediaCol(): TemplateResult | string | void {
    return html`
      <div class="${prefix}--content-item-horizontal__col">
        <slot name="media" @slotchange="${this._handleSlotChange}"></slot>
      </div>
    `;
  }

  /**
   * @returns The component content in the appropriate tabbing order.
   */
  protected _renderContent(): TemplateResult | string | void {
    return this._isOneColumn || this.align === MEDIA_ALIGN.RIGHT
      ? html`
          ${this._renderTextCol()}${this._renderMediaCol()}
        `
      : html`
          ${this._renderMediaCol()}${this._renderTextCol()}
        `;
  }

  /* eslint-disable class-methods-use-this */
  shouldUpdate(changedProperties) {
    // Don't lose track of footer content if it was ever present.
    if (changedProperties.has('_hasFooter') && changedProperties.get('_hasFooter') === true && changedProperties.size === 1) {
      return false;
    }
    return true;
  }
  /* eslint-enable class-methods-use-this */

  render() {
    return html`
      <div class="${prefix}--content-item-horizontal__row ${prefix}--content-item-horizontal-media__align-${this.align}">
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
