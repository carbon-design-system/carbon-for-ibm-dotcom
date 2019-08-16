import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { settings } from 'carbon-components';
import { HeaderGlobalAction } from 'carbon-components-react/lib/components/UIShell';
import Search20 from '@carbon/icons-react/lib/search/20';
import Close20 from '@carbon/icons-react/lib/close/20';

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
    }
  }, [isActive]);

  return (
    <>
      <input
        {...componentInputProps}
        data-autoid={`${prefix}--header__search--input`}
        onBlur={() => dispatch({ type: 'setSearchClosed' })}
        ref={searchRef}
      />
      <HeaderGlobalAction
        onClick={() => dispatch({ type: 'setSearchOpen' })}
        aria-label="Search"
        className={`${prefix}--header__search--search`}>
        <Search20 />
      </HeaderGlobalAction>
      <HeaderGlobalAction
        onClick={() => dispatch({ type: 'setSearchClosed' })}
        aria-label="Close"
        className={`${prefix}--header__search--close`}>
        <Close20 />
      </HeaderGlobalAction>
    </>
  );
};

/**
 * @property propTypes
 * @description Defined property types for component
 * @type {{placeHolderText: shim, renderValue: shim}}
 * @param {boolean} isActive Search input active state
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
