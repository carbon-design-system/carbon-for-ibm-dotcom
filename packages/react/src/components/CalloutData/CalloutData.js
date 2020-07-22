/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Callout from '../../internal/components/Callout/Callout';
import { DDS_CALLOUT_DATA } from '../../internal/FeatureFlags';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import featureFlag from '@carbon/ibmdotcom-utilities/es/utilities/featureflag/featureflag';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Callout with Data pattern.
 */

const CalloutData = ({ data, copy, source }) =>
  featureFlag(
    DDS_CALLOUT_DATA,
    <div
      data-autoid={`${stablePrefix}--callout-data`}
      className={`${prefix}--callout-data`}>
      <Callout>
        <h4 className={`${prefix}--callout-data__data`}>{data}</h4>

        <p className={`${prefix}--callout-data__copy`}>{copy}</p>
      </Callout>
      <p className={`${prefix}--callout-data__source`}>{source}</p>
    </div>
  );

CalloutData.PropTypes = {
  /**
   * Data for CalloutData pattern.
   */
  data: PropTypes.string.isRequired,

  /**
   * Copy text
   */
  copy: PropTypes.string.isRequired,

  /**
   * Source test
   */
  source: PropTypes.string.isRequired,
};

export default CalloutData;
