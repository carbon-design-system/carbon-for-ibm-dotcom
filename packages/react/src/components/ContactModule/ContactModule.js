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

const ContactModule = () => (
  <section
    data-autoid={`${stablePrefix}--contact-module`}
    className={`${prefix}--contact-module`}>
    contact module
  </section>
);

export default ContactModule;
