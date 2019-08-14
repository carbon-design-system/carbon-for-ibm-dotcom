import React from 'react';
import PropTypes from 'prop-types';
import Search20 from '@carbon/icons-react/lib/search/20';
import { settings } from 'carbon-components';
import cx from 'classnames';
import { HeaderGlobalAction } from 'carbon-components-react/lib/components/UIShell';

const { prefix } = settings;

/**
 * Renders the input bar with the search icon
 *
 * @param {object} props Incoming props
 * @param {object} props.componentInputProps contains the input props
 * @param {Function} props.dispatch for component reducer
 * @returns {*} The rendered component
 */
const MastheadSearchInput = ({
  componentInputProps,
  dispatch
}) => {
  const className = cx({
    [`${prefix}--header__search--input`]: true,
  });

  return (
    <>
    <input
      {...componentInputProps}
      data-autoid={`${prefix}--header__search--input`}
      className={className}
    />
    <HeaderGlobalAction
      onClick={() =>
        dispatch({ type: 'setVal', payload: { val: '' } })
      }
      aria-label="Search"
    >
      <Search20 />
    </HeaderGlobalAction>
    </>
  );
};


/**
 * @property propTypes
 * @description Defined property types for component
 * @type {{placeHolderText: shim, renderValue: shim}}
 */
MastheadSearchInput.propTypes = {
  componentInputProps: PropTypes.object,
  dispatch: PropTypes.func,
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
