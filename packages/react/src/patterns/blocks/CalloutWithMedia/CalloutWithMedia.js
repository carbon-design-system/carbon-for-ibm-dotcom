/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Callout } from '../../sub-patterns';
import { ContentBlockSimple } from '../ContentBlockSimple';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import PropTypes from 'prop-types';
import React from 'react';
import { settings } from 'carbon-components';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 *
 * @param {object} props Props object
 * @param {object} props.contentblocksimple Contentblocksimple object
 * @returns {*} Callout with media pattern
 */
const CalloutWithMedia = ({ contentblocksimple }) => {
  return (
    <div
      data-autoid={`${stablePrefix}--callout-with-media`}
      className={`${prefix}--callout-with-media`}>
      <Callout>
        <ContentBlockSimple inverse={true} {...contentblocksimple} />
      </Callout>
    </div>
  );
};

CalloutWithMedia.propTypes = {
  contentblocksimple: PropTypes.shape({
    copy: PropTypes.string.isRequired,
    heading: PropTypes.string.isRequired,
    mediaType: PropTypes.string,
    mediaData: PropTypes.object,
    inverse: PropTypes.bool,
  }),
};

export default CalloutWithMedia;
