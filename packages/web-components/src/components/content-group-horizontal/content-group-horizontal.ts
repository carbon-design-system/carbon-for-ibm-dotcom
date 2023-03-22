/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import deprecate from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/deprecate/deprecate';
import DDSContentBlockHorizontal from '../content-block-horizontal/content-block-horizontal';

import '../horizontal-rule/horizontal-rule';
import { carbonElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Horizontal version of content group.
 *
 * @element dds-content-block-horizontal
 */
@carbonElement(`${ddsPrefix}-content-group-horizontal`)
class DDSContentGroupHorizontal extends DDSContentBlockHorizontal {
  static get stableSelector() {
    return `${ddsPrefix}--content-group-horizontal`;
  }
}
export default deprecate(
  DDSContentGroupHorizontal,
  'The content-group-horizontal component has been deprecated in favor of the content-block-horizontal component. ' +
    'See content-block-horizontal documentation for more information.'
);
