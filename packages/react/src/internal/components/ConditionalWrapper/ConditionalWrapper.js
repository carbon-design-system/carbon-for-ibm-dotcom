/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';

/**
 * Conditional wrapper internal component
 *
 * @param {object} props React props object
 * @param {boolean} props.condition whether to use wrapper
 * @param {*} props.wrapper JSX components
 * @param {*} props.children element(s)
 * @returns {*} JSX element
 * @example
 * import ConditionalWrapper from '../../internal/components/ConditionalWrapper/ConditionalWrapper';
 *
 * const example = ({ link, copy }) => {
 *   return (
 *     <ConditionalWrapper
 *       condition={link}
 *       wrapper={children => <a href={link}>{children}</a>}
 *     >
 *       <p>{children}</p>
 *     </ConditionalWrapper>
 *   );
 * }
 */
const ConditionalWrapper = ({ condition, wrapper, children }) =>
  condition ? wrapper(children) : children;

ConditionalWrapper.propTypes = {
  /**
   * Condition whether to use wrapper or not
   */
  condition: PropTypes.bool,

  /**
   * Wrapper element
   */
  wrapper: PropTypes.func,

  /**
   * Children elements
   */
  children: PropTypes.node,
};

export default ConditionalWrapper;
