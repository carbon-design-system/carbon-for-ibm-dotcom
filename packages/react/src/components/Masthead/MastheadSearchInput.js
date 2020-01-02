import React, { useCallback, useEffect, useRef } from 'react';
import { Close20 } from '@carbon/icons-react';
import { HeaderGlobalAction } from 'carbon-components-react';
import PropTypes from 'prop-types';
import { Search20 } from '@carbon/icons-react';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import root from 'window-or-global';
import { settings } from 'carbon-components';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Renders the input bar with the search icon
 *
 * @param {object} props Incoming props
 * @param {object} props.componentInputProps contains the input props
 * @param {boolean} props.isActive flag to determine if the search is active
 * @param {Function} props.searchIconClick executes when the search icon is clicked
 * @returns {*} The rendered component
 */
const MastheadSearchInput = ({
  componentInputProps,
  dispatch,
  isActive,
  searchIconClick,
}) => {
  const searchRef = useRef();

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

  /**
   * closeBtnAction resets and sets focus after search is closed
   */
  function closeBtnAction() {
    resetSearch();
    const searchIconRef = root.document.querySelectorAll(
      `[data-autoid="${stablePrefix}--header__search--search"]`
    );
    searchIconRef && searchIconRef[0].focus();
  }

  useEffect(() => {
    if (isActive) {
      searchRef.current && searchRef.current.focus();
    } else resetSearch();
  }, [isActive, resetSearch]);

  return (
    <>
      <input
        {...componentInputProps}
        data-autoid={`${stablePrefix}--header__search--input`}
        ref={searchRef}
        name="q"
        tabIndex={isActive ? null : '-1'}
      />
      <HeaderGlobalAction
        onClick={searchIconClick}
        aria-label="Search all of IBM"
        className={`${prefix}--header__search--search`}
        data-autoid={`${stablePrefix}--header__search--search`}>
        <Search20 />
      </HeaderGlobalAction>
      <HeaderGlobalAction
        onClick={closeBtnAction}
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
  searchIconClick: PropTypes.func,
};

/**
 * @property defaultProps
 * @type {{placeHolderText: string, renderValue: number}}
 */
MastheadSearchInput.defaultProps = {
  componentInputProps: {},
  dispatch: () => {},
  searchIconClick: () => {},
};

export default MastheadSearchInput;
