/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit/directives/class-map.js';
import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import { ACCORDION_ALIGNMENT } from './accordion';
import { forEach } from '../../globals/internal/collection-helpers';
import ChevronRight16 from '@carbon/icons/lib/chevron--right/16';
import './accordion-item-skeleton';
import '../skeleton-text/index';
import styles from './accordion.scss';

/**
 * Skeleton of code snippet.
 *
 * @csspart item - A skeleton accordion item. Usage: `cds-accordion-skeleton::part(item)`
 * @csspart item-open - An open skeleton accordion item. Usage: `cds-accordion-skeleton::part(item-open)`
 * @csspart item-closed - A closed skeleton accordion item. Usage: `cds-accordion-skeleton::part(item-closed)`
 * @csspart expando - An element that toggles its accordion open and closed. Usage: `cds-accordion-skeleton::part(expando)`
 * @csspart expando-icon - The icon in a toggle. Usage: `cds-accordion-skeleton::part(expando-icon)`
 * @csspart title - The title text in a toggle. Usage: `cds-accordion-skeleton::part(title)`
 * @csspart content - An accordion item's content area. Usage: `cds-accordion-skeleton::part(content)`
 * @csspart text - The text in an accordion item's content area. Usage: `cds-accordion-skeleton::part(text)`
 */
@customElement(`${prefix}-accordion-skeleton`)
class CDSAccordionSkeleton extends LitElement {
  /**
   * Specify the alignment of the accordion heading title and chevron
   */
  @property({ reflect: true })
  alignment = ACCORDION_ALIGNMENT.END;

  /**
   * Set number of items to render
   */
  @property({ type: Number, attribute: 'count' })
  count = 4;

  /**
   * Specify whether Accordion text should be flush, default is false, does not work with align="start"
   */
  @property({ type: Boolean, reflect: true })
  isFlush = false;

  /**
   * `true` if the first accordion item should be open.
   */
  @property({ type: Boolean, reflect: true })
  open = true;

  updated(changedProperties) {
    if (changedProperties.has('alignment')) {
      // Propagate `alignment` attribute to descendants until `:host-context()` gets supported in all major browsers
      forEach(
        this.shadowRoot!.querySelectorAll(
          (this.constructor as typeof CDSAccordionSkeleton)
            .selectorAccordionItemSkeletons
        ),
        (elem) => {
          elem.setAttribute('alignment', this.alignment);
        }
      );
    }
    if (
      changedProperties.has('isFlush') ||
      changedProperties.has('alignment')
    ) {
      // Propagate `isFlush` attribute to descendants until `:host-context()` gets supported in all major browsers
      forEach(
        this.shadowRoot!.querySelectorAll(
          (this.constructor as typeof CDSAccordionSkeleton)
            .selectorAccordionItemSkeletons
        ),
        (elem) => {
          this.isFlush && this.alignment !== 'start'
            ? elem.setAttribute('isFlush', '')
            : elem.removeAttribute('isFlush');
        }
      );
    }
  }

  render() {
    const classes = classMap({
      [`${prefix}--accordion__item`]: true,
      [`${prefix}--accordion__item--active`]: true,
      [`${prefix}--accordion--${this.alignment}`]: this.alignment,
      [`${prefix}--accordion--flush`]:
        this.isFlush && this.alignment !== 'start',
    });
    const numSkeletonItems = this.open ? this.count - 1 : this.count;
    return html`
      ${this.open
        ? html`
            <li class="${classes}" part="item item-open">
              <span class="${prefix}--accordion__heading" part="expando">
                ${ChevronRight16({
                  part: 'expando-icon',
                  class: `${prefix}--accordion__arrow`,
                })}
                <cds-skeleton-text
                  class="${prefix}--accordion__title"
                  part="title"></cds-skeleton-text>
              </span>
              <div class="${prefix}--accordion__content" part="content">
                <cds-skeleton-text width="90%" part="text"></cds-skeleton-text>
                <cds-skeleton-text width="80%" part="text"></cds-skeleton-text>
                <cds-skeleton-text width="85%" part="text"></cds-skeleton-text>
              </div>
            </li>
          `
        : ``}
      ${Array.from(new Array(numSkeletonItems)).map(
        (_, index) =>
          html`
            <cds-accordion-item-skeleton
              key=${index}
              part="item item-closed"></cds-accordion-item-skeleton>
          `
      )}
    `;
  }

  static get selectorAccordionItemSkeletons() {
    return `${prefix}-accordion-item-skeleton`;
  }

  static styles = styles;
}

export default CDSAccordionSkeleton;
