/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { styleMap } from 'lit/directives/style-map.js';
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import ChevronDown16 from '@carbon/icons/lib/chevron--down/16';
import { prefix } from '../../globals/settings';
import FocusMixin from '../../globals/mixins/focus';
import { CODE_SNIPPET_COLOR_SCHEME, CODE_SNIPPET_TYPE } from './defs';
import styles from './code-snippet.scss';
import Handle from '../../globals/internal/handle';
import '../copy-button/index';
import '../copy/copy';
import '../button/button';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

export { CODE_SNIPPET_COLOR_SCHEME, CODE_SNIPPET_TYPE };

/**
 * Observes resize of the given element with the given resize observer.
 *
 * @param observer The resize observer.
 * @param elem The element to observe the resize.
 */
const observeResize = (observer: ResizeObserver, elem: Element) => {
  if (!elem) {
    return null;
  }
  observer.observe(elem);
  return {
    release() {
      observer.unobserve(elem);
      return null;
    },
  } as Handle;
};

/**
 * Basic code snippet.
 *
 * @element cds-code-snippet
 * @csspart inline-copy - Copy button fot the inline type. covers the entire element. Usage: `cds-code-snippet::part(inline-copy)`
 * @csspart content - Code tag content for all types. Usage: `cds-code-snippet::part(content)`
 * @csspart content--inline - The Code tag content for the inline type. Usage: `cds-code-snippet::part(content--inline)`
 * @csspart content--multi - The Code tag content for the multi line type. Usage: `cds-code-snippet::part(content--multi)`
 * @csspart content--single - The Code tag content for the single line type. Usage: `cds-code-snippet::part(content--single)`
 * @csspart tooltip - The tooltip. Usage: `cds-code-snippet::part(tooltip)`
 * @csspart container - The container for all types. Usage: `cds-code-snippet::part(container)`
 * @csspart container--multi - The container for multi line type Usage: `cds-code-snippet::part(container--multi)`
 * @csspart container--single - The container for single line type. Usage: `cds-code-snippet::part(container--single)`
 * @csspart pre - The pre element for all types Usage: `cds-code-snippet::part(pre)`
 * @csspart pre--multi - The pre element for the multi line type Usage: `cds-code-snippet::part(pre--multi)`
 * @csspart pre--single - The pre element for the single line type. Usage: `cds-code-snippet::part(pre--single)`
 * @csspart oveflow-indicator-left - The left side overflow indicator. Usage: `cds-code-snippet::part(oveflow-indicator-left)`
 * @csspart oveflow-indicator-right - The right side overflow indicator. Usage: `cds-code-snippet::part(oveflow-indicator-right)`
 * @csspart copy-button - The copy button. Usage: `cds-code-snippet::part(copy-button)`
 * @csspart show-button - The show more/less button Usage: `cds-code-snippet::part(show-button)`
 * @csspart show-button-text - The show more/less button text. Usage: `cds-code-snippet::part(show-button-text)`
 *
 */
@customElement(`${prefix}-code-snippet`)
class CDSCodeSnippet extends FocusMixin(LitElement) {
  /**
   * `true` to expand multi-line variant of code snippet.
   */
  private _expandedCode = false;

  /**
   * The handle for observing resize of the parent element of this element.
   */
  private _hObserveResize: Handle | null = null;

  /**
   * Row height in pixels
   */
  private _rowHeightInPixels = 16;

  /**
   * `true` if code-snippet has right overflow
   */
  private _hasRightOverflow = true;

  /**
   * `true` if code-snippet has left overflow
   */
  private _hasLeftOverflow = false;

  /**
   * `true` if show more or show less btn is visible
   */
  private _shouldShowMoreLessBtn = false;

  /**
   * Handles `click` event on the copy button.
   */
  private _handleCopyClick() {
    const { ownerDocument: doc } = this;
    const selection = doc!.defaultView!.getSelection();
    selection!.removeAllRanges();
    const code = doc!.createElement('code');
    code.className = `${prefix}--visually-hidden`;
    const pre = doc!.createElement('pre');
    const text = Array.from(this.childNodes).filter(
      (node) => node.nodeType === Node.TEXT_NODE
    );
    pre.textContent = this.copyText || text[0].textContent;
    code.appendChild(pre);
    // Using `<code>` in shadow DOM seems to lose the LFs in some browsers
    doc!.body.appendChild(code);
    const range = doc!.createRange();
    range.selectNodeContents(code);
    selection!.addRange(range);
    doc!.execCommand('copy');
    doc!.body.removeChild(code);
    selection!.removeAllRanges();
  }

  // eslint-disable-next-line class-methods-use-this
  private _getCodeRefDimensions(ref) {
    const {
      clientWidth: codeClientWidth,
      scrollLeft: codeScrollLeft,
      scrollWidth: codeScrollWidth,
    } = ref;

    return {
      horizontalOverflow: codeScrollWidth > codeClientWidth,
      codeClientWidth,
      codeScrollWidth,
      codeScrollLeft,
    };
  }
  /**
   * Handles `scroll` event.
   */
  private _handleScroll() {
    if (this) {
      const codeContainerRef = this?.shadowRoot?.querySelector(
        `.${prefix}--snippet-container`
      );
      const codeContentRef = codeContainerRef?.querySelector('pre');
      if (
        this.type === CODE_SNIPPET_TYPE.INLINE ||
        (this.type === CODE_SNIPPET_TYPE.SINGLE && !codeContainerRef) ||
        (this.type === CODE_SNIPPET_TYPE.MULTI && !codeContentRef)
      ) {
        return;
      }

      const {
        horizontalOverflow,
        codeClientWidth,
        codeScrollWidth,
        codeScrollLeft,
      } =
        this.type === CODE_SNIPPET_TYPE.SINGLE
          ? this._getCodeRefDimensions(codeContainerRef)
          : this._getCodeRefDimensions(codeContentRef);

      this._hasLeftOverflow = horizontalOverflow && !!codeScrollLeft;
      this._hasRightOverflow =
        horizontalOverflow &&
        codeScrollLeft + codeClientWidth !== codeScrollWidth;
      this.requestUpdate();
    }
  }

  /**
   * Handles `click` event on the show more or show less button.
   */
  private _handleClickExpanded() {
    this._expandedCode = !this._expandedCode;
    this.requestUpdate();
  }

  /**
   * The `ResizeObserver` instance for observing element resizes for re-positioning floating menu position.
   */
  // TODO: Wait for `.d.ts` update to support `ResizeObserver`
  // @ts-ignore
  private _resizeObserver = new ResizeObserver(() => {
    const codeContainerRef = this.shadowRoot?.querySelector(
      `.${prefix}--snippet-container`
    );
    const codeContentRef = codeContainerRef?.querySelector('code'); // PRE?
    const {
      type,
      maxCollapsedNumberOfRows,
      maxExpandedNumberOfRows,
      minExpandedNumberOfRows,
      _rowHeightInPixels: rowHeightInPixels,
      _handleScroll: handleScroll,
    } = this;
    if (codeContentRef && type === CODE_SNIPPET_TYPE.MULTI) {
      const { height } = codeContentRef.getBoundingClientRect();
      if (
        maxCollapsedNumberOfRows > 0 &&
        (maxExpandedNumberOfRows <= 0 ||
          maxExpandedNumberOfRows > maxCollapsedNumberOfRows) &&
        height > maxCollapsedNumberOfRows * rowHeightInPixels
      ) {
        this._shouldShowMoreLessBtn = true;
      } else {
        this._shouldShowMoreLessBtn = false;
      }
      if (
        this._expandedCode &&
        minExpandedNumberOfRows > 0 &&
        height <= minExpandedNumberOfRows * rowHeightInPixels
      ) {
        this._expandedCode = false;
      }
    }
    if (
      (codeContentRef && type === CODE_SNIPPET_TYPE.MULTI) ||
      (codeContainerRef && type === CODE_SNIPPET_TYPE.SINGLE)
    ) {
      handleScroll();
    }
    this.requestUpdate();
  });

  /**
   * Optional text to copy. If not specified, the `children` node's `innerText`
   * will be used as the copy value.
   */
  @property({ attribute: 'copy-text' })
  copyText = '';

  /**
   * `true` if the button should be disabled.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Specify the string displayed when the snippet is copied
   */
  @property()
  feedback = 'Copied!';

  /**
   * Specify the time it takes for the feedback message to timeout
   */
  @property({ type: Number, attribute: 'feedback-timeout' })
  feedbackTimeout = 2000;

  /**
   * Specify whether or not a copy button should be used/rendered.
   */
  @property({ type: Boolean, reflect: true, attribute: 'hide-copy-button' })
  hideCopyButton = false;

  /**
   * Specify the maximum number of rows to be shown when in collapsed view
   */
  @property()
  maxCollapsedNumberOfRows = 15;

  /**
   * Specify the maximum number of rows to be shown when in expanded view
   */
  @property()
  maxExpandedNumberOfRows = 0;

  /**
   * Specify the minimum number of rows to be shown when in collapsed view
   */
  @property()
  minCollapsedNumberOfRows = 3;

  /**
   * Specify the minimum number of rows to be shown when in expanded view
   */
  @property()
  minExpandedNumberOfRows = 16;

  /**
   * Specify a string that is displayed when the Code Snippet has been
   * interacted with to show less lines
   */
  @property({ attribute: 'show-less-text' })
  showLessText = 'Show less';

  /**
   * Specify a string that is displayed when the Code Snippet text is more
   * than 15 lines
   */
  @property({ attribute: 'show-more-text' })
  showMoreText = 'Show more';

  /**
   * Tooltip content for the copy button.
   */
  @property({ attribute: 'tooltip-content' })
  tooltipContent = 'Copy to clipboard';

  /**
   * `true` if the button should be disabled.
   */
  @property({ type: Boolean, reflect: true, attribute: 'wrap-text' })
  wrapText = false;

  /**
   * The type of code snippet.
   */
  @property({ reflect: true })
  type = CODE_SNIPPET_TYPE.SINGLE;

  connectedCallback() {
    super.connectedCallback();
    if (this._hObserveResize) {
      this._hObserveResize = this._hObserveResize.release();
    }
    this._hObserveResize = observeResize(this._resizeObserver, this);
  }

  disconnectedCallback() {
    if (this._hObserveResize) {
      this._hObserveResize = this._hObserveResize.release();
    }
  }

  updated() {
    if (this._expandedCode) {
      this.setAttribute('expanded-code', '');
    } else {
      this.removeAttribute('expanded-code');
    }
  }

  render() {
    const {
      disabled,
      feedback,
      feedbackTimeout,
      hideCopyButton,
      maxExpandedNumberOfRows,
      minExpandedNumberOfRows,
      maxCollapsedNumberOfRows,
      minCollapsedNumberOfRows,
      type,
      wrapText,
      tooltipContent,
      showMoreText,
      showLessText,
      _expandedCode: expandedCode,
      _handleCopyClick: handleCopyClick,
      _handleScroll: handleScroll,
      _hasRightOverflow: hasRightOverflow,
      _hasLeftOverflow: hasLeftOverflow,
      _rowHeightInPixels: rowHeightInPixels,
      _shouldShowMoreLessBtn: shouldShowMoreLessBtn,
    } = this;

    let classes = `${prefix}--snippet`;
    type ? (classes += ` ${prefix}--snippet--${type}`) : '';
    type !== 'inline' && disabled
      ? (classes += ` ${prefix}--snippet--disabled`)
      : '';
    hideCopyButton ? (classes += ` ${prefix}--snippet--no-copy`) : '';
    wrapText ? (classes += ` ${prefix}--snippet--wraptext`) : '';
    type == 'multi' && hasRightOverflow
      ? (classes += ` ${prefix}--snippet--has-right-overflow`)
      : '';

    const expandButtonClass = `${prefix}--snippet-btn--expand`;

    const disabledCopyButtonClasses = disabled
      ? `${prefix}--snippet--disabled`
      : '';

    const expandCodeBtnText = expandedCode ? showLessText : showMoreText;

    if (type === CODE_SNIPPET_TYPE.INLINE) {
      // Ensures no extra whitespace text node
      // prettier-ignore
      return html`
        <cds-copy button-class-name="${classes}" @click="${handleCopyClick}"  part="inline-copy">
          <code slot="icon" part="content content--inline"><slot></slot></code>
          <span slot="tooltip-content" part="tooltip tooltip--inline">${tooltipContent}</span>
        </cds-copy>
      `;
    }

    const styles = {};
    if (type === 'multi') {
      if (expandedCode) {
        if (maxExpandedNumberOfRows > 0) {
          styles['max-height'] =
            maxExpandedNumberOfRows * rowHeightInPixels + 'px';
        }
        if (minExpandedNumberOfRows > 0) {
          styles['min-height'] =
            minExpandedNumberOfRows * rowHeightInPixels + 'px';
        }
      } else {
        if (maxCollapsedNumberOfRows > 0) {
          styles['max-height'] =
            maxCollapsedNumberOfRows * rowHeightInPixels + 'px';
        }
        if (minCollapsedNumberOfRows > 0) {
          styles['min-height'] =
            minCollapsedNumberOfRows * rowHeightInPixels + 'px';
        }
      }
    }

    return html`
      <div
        role="${type === CODE_SNIPPET_TYPE.SINGLE ||
        type === CODE_SNIPPET_TYPE.MULTI
          ? 'textbox'
          : null}"
        tabindex="${(type === CODE_SNIPPET_TYPE.SINGLE ||
          type === CODE_SNIPPET_TYPE.MULTI) &&
        !disabled
          ? 0
          : null}"
        class="${prefix}--snippet-container"
        aria-label="${'code-snippet'}"
        aria-readonly="${type === CODE_SNIPPET_TYPE.SINGLE ||
        type === CODE_SNIPPET_TYPE.MULTI
          ? true
          : null}"
        aria-multiline="${type === CODE_SNIPPET_TYPE.MULTI ? true : null}"
        @scroll="${(type === CODE_SNIPPET_TYPE.SINGLE && handleScroll) || null}"
        style=${styleMap(styles)}
        part="container container--${type}">
        <pre
          @scroll="${(type === CODE_SNIPPET_TYPE.MULTI && handleScroll) ||
          null}"
          part="pre pre--${type}"><code part="content content--${type}"><slot></slot></code></pre>
      </div>

      ${hasLeftOverflow
        ? html`
            <div
              class="${prefix}--snippet__overflow-indicator--left"
              part="oveflow-indicator-left"></div>
          `
        : ``}
      ${hasRightOverflow && type !== CODE_SNIPPET_TYPE.MULTI
        ? html`
            <div
              class="${prefix}--snippet__overflow-indicator--right"
              part="oveflow-indicator-right"></div>
          `
        : ``}
      ${hideCopyButton
        ? ``
        : html`
            <cds-copy-button
              ?disabled=${disabled}
              button-class-name=${disabledCopyButtonClasses}
              feedback=${feedback}
              feedback-timeout=${feedbackTimeout}
              @click="${handleCopyClick}"
              part="copy-button">
              ${tooltipContent}
            </cds-copy-button>
          `}
      ${shouldShowMoreLessBtn
        ? html`
            <cds-button
              kind="ghost"
              size="sm"
              button-class-name=${expandButtonClass}
              ?disabled=${disabled}
              @click=${() => this._handleClickExpanded()}
              part="show-button">
              <span
                class="${prefix}--snippet-btn--text"
                part="show-button-text">
                ${expandCodeBtnText}
              </span>
              ${ChevronDown16({
                class: `${prefix}--icon-chevron--down ${prefix}--snippet__icon`,
                name: 'cheveron--down',
                role: 'img',
                slot: 'icon',
              })}
            </cds-button>
          `
        : ``}
    `;
  }

  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };
  static styles = styles;
}

export default CDSCodeSnippet;
