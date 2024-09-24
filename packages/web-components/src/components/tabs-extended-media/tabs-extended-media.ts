/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { property } from 'lit/decorators.js';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element';
import C4DTabsExtended from '../tabs-extended/tabs-extended';
import styles from './tabs-extended-media.scss';

const { stablePrefix: c4dPrefix } = settings;

/**
 * A component to present media content inside a tabbed layout.
 *
 * @element c4d-tabs-extended-media
 */
@customElement(`${c4dPrefix}-tabs-extended-media`)
class C4DTabsExtendedMedia extends C4DTabsExtended {
  /**
   * `true` if section heading should be shown.
   */
  @property({ attribute: 'section-heading', reflect: true })
  sectionHeading = 'true';

  static get stableSelector() {
    return `${c4dPrefix}--tabs-extended-media`;
  }

  static styles = styles;
}

console.warn(
  'The tabs-extended-media component has been deprecated in favor of tabs-extended component. ' +
    'See tabs-extended documentation for more information.'
);

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DTabsExtendedMedia;
