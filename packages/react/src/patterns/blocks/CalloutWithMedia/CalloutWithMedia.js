/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Callout } from '../../../components';
import { ContentBlockSimple } from '../ContentBlockSimple';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 *
 * @param {object} props Props object
 * @returns {*} Callout with media pattern
 */
const CalloutWithMedia = ({ ...ContentBlockSimpleProps }) => {
  return (
    <div
      data-autoid={`${stablePrefix}--callout-with-media`}
      className={`${prefix}--callout-with-media`}>
      <Callout>
        <ContentBlockSimple inverse={true} {...ContentBlockSimpleProps} />
      </Callout>
    </div>
  );
};

CalloutWithMedia.propTypes = ContentBlockSimple.propTypes;

export default CalloutWithMedia;
