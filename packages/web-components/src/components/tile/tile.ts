import { LitElement, html, property, state, query } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element';
import settings from '../../globals/settings';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import CTAMixin from '@carbon/ibmdotcom-web-components/es/component-mixins/cta/cta';
import VideoCTAMixin from '@carbon/ibmdotcom-web-components/es/component-mixins/cta/video';
import { CTA_TYPE } from '@carbon/ibmdotcom-web-components/es/components/cta/defs';
import styles from './tile.scss';

const { stablePrefix: caemPrefix } = settings;

/**
 * The Tile component.
 *
 * @element caem-tile
 */
@customElement(`${caemPrefix}-tile`)
class CAEMTile extends VideoCTAMixin(CTAMixin(LitElement)) {
  /**
   * The label text.
   */
  @property({ attribute: 'label' })
  label?: string;

  @property({ attribute: 'cta-type', reflect: true })
  ctaType = CTA_TYPE['LOCAL'];

  @property({ attribute: 'href' })
  href?: string;

  @state()
  slottedImages = false;

  @state()
  slottedPictogram = false;

  @state()
  slotName = '';

  @state()
  slotContent: Element[] = [];

  @property({ type: Boolean, reflect: true, attribute: 'align-with-content' })
  alignWithContent = false;

  @property({ type: Boolean, reflect: true, attribute: 'double-tile' })
  doubleTile = false;

  @property({ attribute: 'target', reflect: true })
  target?: string | undefined;

  @query(`.${caemPrefix}-tile__action`)
  _linkNode!: HTMLAnchorElement;

  _handleSlotChange(event: Event) {
    const { target } = event;
    this.slotName = (target as HTMLSlotElement).name;
    this.slotContent = (target as HTMLSlotElement).assignedElements();

    if (this.slotName === 'image' && this.slotContent.length === 1) {
      this.slottedImages = true;
    } else if (this.slotName === 'image' && this.slotContent.length === 0) {
      this.slottedImages = false;
    }

    if (this.slotName === 'pictogram' && this.slotContent.length === 1) {
      this.slottedPictogram = true;
    } else if (this.slotName === 'pictogram' && this.slotContent.length === 0) {
      this.slottedPictogram = false;
    }
  }

  render() {
    const {
      label,
      href,
      _handleSlotChange: handleSlotChange,
      _handleClick: handleClick,
      slottedPictogram,
      slottedImages,
      alignWithContent,
      doubleTile,
    } = this;

    const ctaClasses = classMap({
      [`${caemPrefix}-tile__footer-placement`]: alignWithContent,
      [`${caemPrefix}-tile__action`]: true,
    });

    const imgClasses = classMap({
      [`${caemPrefix}-tile__image-double`]: doubleTile,
      [`${caemPrefix}-tile__image`]: true,
    });

    return html`
      <div class="${caemPrefix}-tile__outer" part="outer">
        <div class="${caemPrefix}-tile__wrapper" part="wrapper">
          <div class="${imgClasses}" part="image" ?hidden=${!slottedImages}>
            <slot name="image" @slotchange=${handleSlotChange}></slot>
          </div>

          <div class="${caemPrefix}-tile__content" part="content">
            <div
              class="${caemPrefix}-tile__pictogram"
              part="pictogram"
              ?hidden=${!slottedPictogram}
            >
              <slot name="pictogram" @slotchange="${handleSlotChange}"></slot>
            </div>

            ${label
              ? html`
                  <span class="${caemPrefix}-tile__label" part="label"
                    >${label}</span
                  >
                `
              : ''}

            <div class="${caemPrefix}-tile__text" part="text">
              <slot></slot>
            </div>

            <a
              href=${ifDefined(href)}
              @click="${handleClick}"
              class="${ctaClasses} cds--link cds--link--lg cds--link-with-icon cds--link-with-icon__icon-right cds--link-with-icon--inline-icon"
              part="cta"
            >
              <slot name="cta"></slot>
              ${this._renderIcon()}
            </a>
          </div>
        </div>
      </div>
    `;
  }
  static styles = styles;
}

export default CAEMTile;
