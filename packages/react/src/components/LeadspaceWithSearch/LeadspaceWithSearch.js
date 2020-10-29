/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useEffect, useRef } from 'react';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import PropTypes from 'prop-types';
import Search from 'carbon-components-react/lib/components/Search';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

const LeadspaceWithSearch = ({ heading, copy, searchProps }) => {
  const [searchPlaceHolder, setSearchplaceHolder] = useState(null);
  const leadspaceContainer = useRef(null);

  useEffect(() => {
    if (leadspaceContainer) {
      const { current } = leadspaceContainer;
      const observer = new ResizeObserver(entries => {
        for (const entry of entries) {
          const { inlineSize: leadspaceWidth } = entry.borderBoxSize[0];
          const CARBON_MD_BREAKPOINT = 672;
          const { desktop, mobile } = searchProps.placeHolder;

          if (leadspaceWidth > CARBON_MD_BREAKPOINT || !mobile) {
            setSearchplaceHolder(desktop);
          }
          if (leadspaceWidth <= CARBON_MD_BREAKPOINT && mobile) {
            setSearchplaceHolder(mobile);
          }
        }
      });
      observer.observe(current);
    }
  }, [searchProps.placeHolder]);

  return (
    <section
      data-autoid={`${stablePrefix}--leadspace-with-search`}
      className={`${prefix}--leadspace-with-search`}
      ref={leadspaceContainer}>
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
            placeHolderText={searchPlaceHolder}
            {...searchProps}
          />
        </div>
      </div>
    </section>
  );
};

LeadspaceWithSearch.propTypes = {
  /**
   * Required heading for the Leadspace with search
   */
  heading: PropTypes.string.isRequired,
  /**
   *  An optional copy for the Leadspace with search
   */
  copy: PropTypes.string,
  /**
   *  The search mechanism does not have a built-in behavior. Make sure to provide both onChange and onKeyDown functions to the component with the validations and behavior you want it to have.
   *
   *  | Function    | Parameters | Description                                                                                                  |
   *  |-------------|------------|--------------------------------------------------------------------------------------------------------------|
   *  | `onChange`  | event      | Use this to reach out to `event.target.value`, the value inputed by the user.                                |
   *  | `onKeyDown` | event      | You could use it to detect the user pressing the 'Enter/Return' key and trigger the search mechanism to work |
   *
   * Any other functions and properties passed down to this will be applyed to the [Search component](https://www.carbondesignsystem.com/components/search/usage/).
   *
   */
  searchProps: {
    /**
     * The Leadspace With Search accepts two placeholders. One for mobile view and another for desktop. Both are optional. If you do not provide, it will be set to "Search".
     */
    placeHolder: PropTypes.shape({
      mobile: PropTypes.string,
      desktop: PropTypes.string,
    }),
    labelText: PropTypes.string,
    ...Search.propTypes,
  },
};

LeadspaceWithSearch.defaultProps = {
  searchProps: {
    desktop: 'Search',
  },
};

export default LeadspaceWithSearch;
