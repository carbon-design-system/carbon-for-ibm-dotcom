/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { prefix } from '../../globals/settings';
import styles from './breadcrumb.scss';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

const renderItem = () => {
  return html`
    <div class="${prefix}--breadcrumb-item" part="item">
      <span class="${prefix}--link">&nbsp;</span>
    </div>
  `;
};

/**
 * Skeleton of breadcrumb.
 * @element cds-breadcrumb-skeleton
 * @csspart skeleton - The breadcrumb skeleton. Usage: `cds-breadcrumb-skeleton::part(skeleton)`
 * @csspart item - The items. Usage: `cds-breadcrumb-skeleton::part(item)`
 */
@customElement(`${prefix}-breadcrumb-skeleton`)
class CDSBreadcrumbSkeleton extends LitElement {
  render() {
    return html`
      <div class="${prefix}--breadcrumb ${prefix}--skeleton" part="skeleton">
        ${renderItem()} ${renderItem()} ${renderItem()}
      </div>
    `;
  }

  static styles = styles;
}

export default CDSBreadcrumbSkeleton;
