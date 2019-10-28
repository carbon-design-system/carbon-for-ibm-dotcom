import React, { useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { settings } from 'carbon-components';
import { HeaderGlobalAction } from 'carbon-components-react';
import { Search20 } from '@carbon/icons-react';
import { Close20 } from '@carbon/icons-react';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Renders the input bar with the search icon
 *
 * @param {object} props Incoming props
 * @param {object} props.componentInputProps contains the input props
 * @param {Function} props.dispatch for component reducer
 * @returns {*} The rendered component
 */
const MastheadSearchInput = ({ componentInputProps, dispatch, isActive }) => {
  const searchRef = useRef();

  useEffect(() => {
    if (isActive) {
      searchRef.current.focus();
    } else resetSearch();
  }, [isActive, resetSearch]);

  /**
   * Clear search and clear input when called
   */
  const resetSearch = useCallback(() => {
    dispatch({ type: 'setSearchClosed' });
    dispatch({
      type: 'setVal',
      payload: { val: '' },
    });
  }, [dispatch]);

  return (
    <>
      <input
        {...componentInputProps}
        data-autoid={`${stablePrefix}--header__search--input`}
        ref={searchRef}
      />
      <HeaderGlobalAction
        onClick={() => dispatch({ type: 'setSearchOpen' })}
        aria-label="Search all of IBM"
        className={`${prefix}--header__search--search`}
        data-autoid={`${stablePrefix}--header__search--search`}>
        <Search20 />
      </HeaderGlobalAction>
      <HeaderGlobalAction
        onClick={resetSearch}
        aria-label="Close"
        className={`${prefix}--header__search--close`}
        data-autoid={`${stablePrefix}--header__search--close`}>
        <Close20 />
      </HeaderGlobalAction>
    </>
  );
};

/**
 * @property propTypes
 * @description Defined property types for component
 * @type {{dispatch: Function, componentInputProps: object, isActive: boolean}}
 */
MastheadSearchInput.propTypes = {
  componentInputProps: PropTypes.object,
  dispatch: PropTypes.func,
  isActive: PropTypes.bool,
};

/**
 * @property defaultProps
 * @type {{placeHolderText: string, renderValue: number}}
 */
MastheadSearchInput.defaultProps = {
  componentInputProps: {},
  dispatch: () => {},
};

export default MastheadSearchInput;
