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

const LeadspaceWithSearch = () => (
  <section
    data-autoid={`${stablePrefix}--leadspace-with-search`}
    className={`${prefix}--leadspace-with-search`}>
    leadspace with search
  </section>
);

export default LeadspaceWithSearch;
