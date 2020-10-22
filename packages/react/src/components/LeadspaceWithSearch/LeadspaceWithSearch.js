/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import PropTypes from 'prop-types';
import React from 'react';
import Search from 'carbon-components-react/lib/components/Search';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

const LeadspaceWithSearch = ({ heading, copy, searchProps }) => {
  return (
    <section
      data-autoid={`${stablePrefix}--leadspace-with-search`}
      className={`${prefix}--leadspace-with-search`}>
      <div className={`${prefix}--leadspace-with-search__row`}>
        <div className={`${prefix}--leadspace-with-search__content`}>
          <h1 className={`${prefix}--leadspace-with-search__heading`}>
            {heading}
          </h1>
          {copy && (
            <p className={`${prefix}--leadspace-with-search__copy`}>{copy}</p>
          )}
          <Search
            className={`${prefix}--leadspace-with-search__search`}
            {...searchProps}
          />
        </div>
      </div>
    </section>
  );
};

LeadspaceWithSearch.propTypes = {
  /**
   *
   */
  heading: PropTypes.string.isRequired,
  /**
   *
   */
  copy: PropTypes.string,
  /**
   *
   */
  searchProps: Search.propTypes,
};

export default LeadspaceWithSearch;
