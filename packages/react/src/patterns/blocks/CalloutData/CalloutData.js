import Callout from '../../../internal/components/Callout/Callout';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { DDS_CALLOUT_DATA } from '../../../internal/FeatureFlags';
import { featureFlag } from '@carbon/ibmdotcom-utilities';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

const CalloutData = ({ data, copy, source }) => featureFlag(DDS_CALLOUT_DATA,
  (
    <div 
      data-autoid={`${stablePrefix}--callout-data`}
      className={`${prefix}--callout-data`}>
      <Callout>
        <h4 className={`${prefix}--callout-data__data`}>
          {data}
        </h4>

        <p className={`${prefix}--callout-data__copy`}>
          {copy}
        </p>
      </Callout>
      <p className={`${prefix}--callout-data__source`}>
        {source}
      </p>
      
    </div>
  ));

export default CalloutData;