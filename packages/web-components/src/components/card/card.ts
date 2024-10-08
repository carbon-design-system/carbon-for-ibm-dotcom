/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { TemplateResult, html, LitElement } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import ArrowRight20 from '@carbon/web-components/es/icons/arrow--right/20.js';
import ArrowLeft20 from '@carbon/web-components/es/icons/arrow--left/20.js';
import CDSLink from '@carbon/web-components/es/components/link/link.js';
import markdownToHtml from '@carbon/ibmdotcom-utilities/es/utilities/markdownToHtml/markdownToHtml.js';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';
import settings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import { BASIC_COLOR_SCHEME } from '../../globals/defs';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import C4DCardFooter from './card-footer';
import styles from './card.scss';
import { PICTOGRAM_PLACEMENT } from './defs';

import { CTA_TYPE } from '../cta/defs';

import CTAMixin from '../../component-mixins/cta/cta';

const { prefix, stablePrefix: c4dPrefix } = settings;

/**
 * The table mapping slot name with the private property name that indicates the existence of the slot content.
 */
const slotExistencePropertyNames = {
  image: '_hasImage',
  pictogram: '_hasPictogram',
};

/**
 * Card.
 *
 * @element c4d-card
 * @slot eyebrow - The eyebrow content.
 * @slot heading - The heading content.
 * @slot image - The image content.
 * @slot footer - The footer content.
 * @csspart caption - The Caption (default heading). Usage: `c4d-card::part(caption)`
 * @csspart copy - The Copy. Usage: `c4d-card::part(copy)`
 * @csspart container - The Inner content container. Usage: `c4d-card::part(container)`
 * @csspart video-thumbnail - The video thumbnail. Usage: `c4d-card::part(video-thumbnail)`
 * @csspart disabled-link - . Disabled link. Usage: `c4d-card::part(disabled-link)`
 * @csspart wrapper - The component wrapper. Usage: `c4d-card::part(wrapper)`
 * @csspart content - The content container. Usage: `c4d-card::part(content)`
 * @csspart link - Active link. Usage: `c4d-card::part(link)`
 */
@customElement(`${c4dPrefix}-card`)
class C4DCard extends CTAMixin(StableSelectorMixin(CDSLink)) {
  /**
   * `true` if there is copy content.
   */
  @property({ attribute: 'cta-type' })
  ctaType;

  /**
   * `true` if there is image content.
   */
  @state()
  protected _hasImage = false;

  /**
   * `true` if there is copy content.
   */
  @state()
  protected _hasCopy = false;

  /**
   * `true` if there is a pictogram.
   */
  @state()
  protected _hasPictogram = false;

  @property({ attribute: 'no-poster', type: Boolean })
  noPoster;

  /**
   * Handles `slotchange` event.
   */
  protected _handleSlotChange({ target }: Event) {
    const { name } = target as HTMLSlotElement;
    const hasContent = Boolean(this.querySelector('p'));
    this[slotExistencePropertyNames[name]] = hasContent;
    this._hasCopy = hasContent;
  }

  /**
   * @returns The heading content.
   */
  // eslint-disable-next-line class-methods-use-this
  protected _renderHeading(): TemplateResult | string | void {
    const {
      ctaType,
      videoName,
      formatVideoCaption: formatVideoCaptionInEffect,
    } = this;
    if (ctaType !== CTA_TYPE.VIDEO) {
      return html`<slot name="heading"></slot>`;
    }
    const formatedVideoName = formatVideoCaptionInEffect({ name: videoName });

    this.dispatchEvent(
      new CustomEvent(
        (this.constructor as typeof C4DCard).eventVideoTitleUpdated,
        {
          bubbles: true,
          composed: true,
        }
      )
    );
    return html`
      <slot name="heading">
        <c4d-card-heading>${formatedVideoName}</c4d-card-heading>
      </slot>
    `;
  }

  /**
   * @returns The copy content.
   */
  protected _renderCopy(): TemplateResult | string | void {
    const { _hasCopy: hasCopy } = this;
    return html`
      <div ?hidden="${!hasCopy}" class="${prefix}--card__copy" part="copy">
        <slot @slotchange="${this._handleSlotChange}"></slot>
      </div>
    `;
  }

  protected _renderImage(): TemplateResult | string | void {
    const {
      ctaType,
      videoName,
      videoThumbnailUrl,
      _hasImage: hasImage,
      noPoster,
    } = this;

    const image =
      hasImage || ctaType !== CTA_TYPE.VIDEO || noPoster
        ? undefined
        : html`
            <c4d-image
              class="${prefix}--card__video-thumbnail"
              part="video-thumbnail"
              alt="${videoName}"
              default-src="${videoThumbnailUrl}">
            </c4d-image>
          `;
    return html`
      <slot name="image" @slotchange="${this._handleSlotChange}"></slot>${image}
    `;
  }

  /**
   * @returns The disabled link content.
   */
  protected _renderDisabledLink() {
    const { _classes: classes } = this;
    return html`
      <div id="link" class="${classes}" part="disabled-link">
        ${this._renderInner()}
      </div>
    `;
  }

  /**
   * @returns The inner content.
   */
  protected _renderInner() {
    const { _handleSlotChange: handleSlotChange, _hasPictogram: hasPictogram } =
      this;
    return html`
      ${this._renderImage()}
      <div
        class="${prefix}--card__wrapper ${hasPictogram
          ? `${prefix}--card__pictogram`
          : ''}"
        part="wrapper">
        <div class="${prefix}--card__content" part="content">
          ${hasPictogram ? '' : html` <slot name="eyebrow"></slot> `}
          ${this.pictogramPlacement === PICTOGRAM_PLACEMENT.TOP
            ? html`
                <slot
                  name="pictogram"
                  data-pictogram-placement="${PICTOGRAM_PLACEMENT.TOP}"
                  @slotchange="${handleSlotChange}"></slot>
              `
            : ''}
          ${this.pictogramPlacement !== PICTOGRAM_PLACEMENT.TOP || !hasPictogram
            ? this._renderHeading()
            : null}
          ${this.pictogramPlacement === PICTOGRAM_PLACEMENT.BOTTOM ||
          !hasPictogram
            ? this._renderCopy()
            : ''}
          ${this.pictogramPlacement === PICTOGRAM_PLACEMENT.BOTTOM
            ? html`
                <slot
                  name="pictogram"
                  data-pictogram-placement="${PICTOGRAM_PLACEMENT.BOTTOM}"
                  @slotchange="${handleSlotChange}"></slot>
              `
            : ''}
          ${hasPictogram && this.pictogramPlacement === PICTOGRAM_PLACEMENT.TOP
            ? this._renderHeading()
            : null}
          ${hasPictogram && this.pictogramPlacement === PICTOGRAM_PLACEMENT.TOP
            ? this._renderCopy()
            : ''}
          <slot name="footer"></slot>
        </div>
      </div>
    `;
  }

  /**
   * @returns The CTA arrow.
   *
   */
  protected _renderArrow() {
    const isLTR =
      window.getComputedStyle(this).direction.toUpperCase() === 'LTR';
    return html`
      <a
        class="${`${prefix}--card__link`}"
        part="link"
        href="${ifDefined(this.href)}"
        aria-label="${this.querySelector(`${c4dPrefix}-card-heading`)
          ?.textContent || ''}"
        >${isLTR ? ArrowRight20() : ArrowLeft20()}</a
      >
    `;
  }
  /**
   * The color scheme.
   * A typical use case of using another color scheme of card is having a "CTA" purpose of card at the last in card group.
   *
   * Color scheme options are: "inverse" and "regular"
   */
  @property({ attribute: 'color-scheme', reflect: true })
  colorScheme = '';

  /**
   * Link `href`.
   */
  @property()
  href = '';

  /**
   * Pictogram placement
   */
  @property({ attribute: 'pictogram-placement', reflect: true })
  pictogramPlacement = PICTOGRAM_PLACEMENT.BOTTOM;

  /**
   * Whether or not to apply the link style.
   */
  @property({ type: Boolean, reflect: true })
  link = false;

  /**
   * Whether or not to apply the logo style.
   */
  @property({ type: Boolean, reflect: true })
  logo = false;

  @query('div')
  _linkNode;

  updated(changedProperties) {
    super.updated(changedProperties);
    const { colorScheme, disabled, href, _linkNode: linkNode, ctaType } = this;

    if (
      changedProperties.has('ctaType') ||
      changedProperties.has('disabled') ||
      changedProperties.has('formatCaption') ||
      changedProperties.has('formatDuration') ||
      changedProperties.has('videoDuration') ||
      changedProperties.has('videoName')
    ) {
      const {
        ctaType,
        videoDuration,
        videoName,
        videoDescription,
        formatVideoCaption: formatVideoCaptionInEffect,
        formatVideoDuration: formatVideoDurationInEffect,
      } = this;
      const footer = this.querySelector(`${c4dPrefix}-card-footer`);

      const headingText = this.querySelector(
        `${c4dPrefix}-card-heading`
      )?.textContent;
      const copyText = this.textContent;
      if (footer) {
        const ariaTitle = videoName || headingText || copyText;
        let ariaDuration = '';
        if (videoDuration !== undefined) {
          ariaDuration = `, DURATION ${videoDuration}`;
        }
        (footer as C4DCardFooter).disabled = disabled;
        (footer as C4DCardFooter).altAriaLabel = `${ariaTitle}${ariaDuration}`;
        (footer as C4DCardFooter).ctaType = ctaType;
        (footer as C4DCardFooter).videoDuration = videoDuration;
        (footer as C4DCardFooter).videoName = videoName;
        (footer as C4DCardFooter).videoDescription = videoDescription;
        if (formatVideoCaptionInEffect) {
          (footer as C4DCardFooter).formatVideoCaption =
            formatVideoCaptionInEffect;
        }
        if (formatVideoDurationInEffect) {
          (footer as C4DCardFooter).formatVideoDuration =
            formatVideoDurationInEffect;
        }
      }
    }

    if (changedProperties.has('colorScheme') || changedProperties.has('href')) {
      const headingText = this.querySelector(
        `${c4dPrefix}-card-heading`
      )?.textContent;
      const copyText = this.textContent;
      const footer = this.querySelector(
        (this.constructor as typeof C4DCard).selectorFooter
      );
      if (footer && href) {
        (footer as C4DCardFooter).colorScheme = colorScheme;
        (footer as C4DCardFooter).parentHref = href;
        (footer as C4DCardFooter).ctaType = ctaType;
        (footer as C4DCardFooter).href = href;
        (footer as C4DCardFooter).altAriaLabel = headingText || copyText;
      }
    }
    if (linkNode) {
      linkNode.classList.add(`${prefix}--tile`);
      linkNode.classList.add(`${prefix}--card`);
      linkNode.classList.toggle(`${prefix}--tile--clickable`, Boolean(href));
      linkNode.classList.toggle(`${prefix}--card--link`, Boolean(href));
      linkNode.classList.toggle(
        `${prefix}--card--inverse`,
        colorScheme === BASIC_COLOR_SCHEME.INVERSE
      );
      linkNode.classList.toggle(
        `${prefix}--link--disabled`,
        Boolean(this.disabled)
      );
    }

    if (this._hasPictogram) {
      this.onclick = () => window.open(this.href, '_self');
      this.setAttribute('pictogram', '');
    } else {
      this.removeAttribute('pictogram');
    }

    const copyElement = this.querySelector('p');
    if (this._hasCopy && copyElement?.innerText) {
      copyElement.innerHTML = `${markdownToHtml(copyElement?.innerText, {
        bold: false,
      })}`;
      copyElement.firstElementChild?.setAttribute('style', 'all:unset;');
    }
  }

  /**
   * Handles card with video heading and applies the set same height function.
   *
   * @param event The event.
   */
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleVideoTitleUpdate = async (event) => {
    if (event && this.ctaType === CTA_TYPE.VIDEO) {
      const { videoDuration, videoName } = event.detail as any;
      const { formatVideoDuration, formatVideoCaption } = this;
      const formattedVideoDuration = formatVideoDuration({
        duration: !videoDuration ? videoDuration : videoDuration * 1000,
      });
      this.videoDuration ? null : (this.videoDuration = formattedVideoDuration);

      this.videoTitle = formatVideoCaption({
        name: videoName,
      });

      const heading = this.querySelector(`${c4dPrefix}-card-heading`);
      const footer = this.querySelector(`${c4dPrefix}-card-footer`);

      if (heading?.textContent?.trim() === '') {
        const title = document.createTextNode(this.videoTitle);
        heading?.appendChild(title);
      }

      if (footer?.textContent?.trim() === '') {
        const title = document.createTextNode(formattedVideoDuration);
        footer?.appendChild(title);
      }
    }
  };

  connectedCallback() {
    super.connectedCallback();
    const { eventRequestAdditionalVideoData } = this
      .constructor as typeof C4DCard;
    document.addEventListener(
      eventRequestAdditionalVideoData,
      this._handleVideoTitleUpdate
    );
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    const { eventRequestAdditionalVideoData } = this
      .constructor as typeof C4DCard;
    document.removeEventListener(
      eventRequestAdditionalVideoData,
      this._handleVideoTitleUpdate
    );
  }

  render() {
    return this._hasPictogram
      ? html`
          <div part="container">
            ${this._renderInner()} ${this._renderArrow()}
          </div>
        `
      : html` <div part="container">${this._renderInner()}</div> `;
  }

  static get stableSelector() {
    return `${c4dPrefix}--card`;
  }

  /**
   * A selector that will return the child footer.
   */
  static get selectorFooter() {
    return `${c4dPrefix}-card-footer`;
  }

  /**
   * The name of the custom event fired when there is a user gesture to run the action.
   */
  static get eventRequestAdditionalVideoData() {
    return `${c4dPrefix}-cta-request-additional-video-data`;
  }

  /**
   * The name of the custom event fired when the video title is updated
   */
  static get eventVideoTitleUpdated() {
    return `${c4dPrefix}-card-video-title-updated`;
  }

  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };
  static styles = styles;
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DCard;
