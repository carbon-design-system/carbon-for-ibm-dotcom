import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { settings } from '@carbon/ibmdotcom-utilities';
import { settings as carbonSettings } from 'carbon-components';
import { HeaderGlobalAction } from 'carbon-components-react';
import { Search20 } from '@carbon/icons-react';
import { Close20 } from '@carbon/icons-react';

const { prefix } = settings;
const cPrefix = carbonSettings.prefix;

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
        ref={searchRef}
      />
      <HeaderGlobalAction
        onClick={() => dispatch({ type: 'setSearchOpen' })}
        aria-label="Search"
        className={`${cPrefix}--header__search--search`}
        data-autoid={`${prefix}--header__search--search`}>
        <Search20 />
      </HeaderGlobalAction>
      <HeaderGlobalAction
        onClick={() => dispatch({ type: 'setSearchClosed' })}
        aria-label="Close"
        className={`${cPrefix}--header__search--close`}
        data-autoid={`${prefix}--header__search--close`}>
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
