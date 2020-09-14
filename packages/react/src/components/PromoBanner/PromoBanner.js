/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

const PromoBanner = () => (
  <section
    data-autoid={`${stablePrefix}--promo-banner`}
    className={`${prefix}--promo-banner`}>
    <div className={`${prefix}--promo-banner__row`}>
      <div className={`${prefix}--promo-banner__left-column`}>
        <h2 className={`${prefix}--promo-banner__heading`}>heading</h2>
      </div>
      <div className={`${prefix}--promo-banner__content`}>content</div>
    </div>
  </section>
);

export default PromoBanner;
