/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import deprecate from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/deprecate/deprecate';
import C4DContentBlockHorizontal from '../content-block-horizontal/content-block-horizontal';

import '../horizontal-rule/horizontal-rule';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element';

const { stablePrefix: c4dPrefix } = settings;

/**
 * Horizontal version of content group.
 *
 * @element c4d-content-block-horizontal
 */
@customElement(`${c4dPrefix}-content-group-horizontal`)
class C4DContentGroupHorizontal extends C4DContentBlockHorizontal {
  static get stableSelector() {
    return `${c4dPrefix}--content-group-horizontal`;
  }
}
export default deprecate(
  C4DContentGroupHorizontal,
  'The content-group-horizontal component has been deprecated in favor of the content-block-horizontal component. ' +
    'See content-block-horizontal documentation for more information.'
);
