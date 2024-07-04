/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import ChevronRight16 from '@carbon/icons/lib/chevron--right/16';
import { prefix } from '../../globals/settings';
import '../skeleton-text/index';
import styles from './accordion.scss';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

/**
 * Skeleton of accordion item.
 *
 * @csspart expando - The element that toggles the accordion open and closed. Usage: `cds-accordion-item-skeleton::part(expando)`
 * @csspart expando-icon - The icon in the toggle. Usage: `cds-accordion-item-skeleton::part(expando-icon)`
 * @csspart title - The title text in the toggle. Usage: `cds-accordion-item-skeleton::part(title)`
 */
@customElement(`${prefix}-accordion-item-skeleton`)
class CDSAccordionItemSkeleton extends LitElement {
  render() {
    return html`
      <span class="${prefix}--accordion__heading" part="expando">
        ${ChevronRight16({
          part: 'expando-icon',
          class: `${prefix}--accordion__arrow`,
        })}
        <cds-skeleton-text
          class="${prefix}--accordion__title"
          part="title"></cds-skeleton-text>
      </span>
    `;
  }

  static styles = styles;
}

export default CDSAccordionItemSkeleton;
