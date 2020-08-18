/* eslint-disable */
/* istanbul ignore file */

/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ChevronDown20 from '@carbon/icons-react/es/chevron--down/20';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import settings from 'carbon-components/es/globals/js/settings';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import SideNavIcon from './SideNavIcon';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

export class SideNavMenu extends React.Component {
  static propTypes = {
    /**
     * Provide an optional class to be applied to the containing node
     */
    className: PropTypes.string,

    /**
     * Provide <SideNavMenuItem>'s inside of the `SideNavMenu`
     */
    children: PropTypes.node,

    /**
     * Pass in a custom icon to render next to the `SideNavMenu` title
     */
    renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

    /**
     * Specify whether the `SideNavMenu` is "active". `SideNavMenu` should be
     * considered active if one of its menu items are a link for the current
     * page.
     */
    isActive: PropTypes.bool,

    /**
     * Provide the text for the overall menu name
     */
    title: PropTypes.string.isRequired,

    /**
     * Specify whether the menu should default to expanded. By default, it will
     * be closed.
     */
    defaultExpanded: PropTypes.bool,

    /**
     * Property to indicate if the side nav container is open (or not). Use to
     * keep local state and styling in step with the SideNav expansion state.
     */
    isSideNavExpanded: PropTypes.bool,

    /**
     * Specify if this is a large variation of the SideNavMenu
     */
    large: PropTypes.bool,

    /**
     * For submenu back button to toggle expand/collapse
     */
    isbackbutton: PropTypes.string,

    /**
     * A callback that is called when this side nav menu is toggled by user gesture.
     */
    onToggle: PropTypes.func,
  };

  static defaultProps = {
    defaultExpanded: false,
    isActive: false,
    large: false,
  };

  static getDerivedStateFromProps = (props, state) => {
    let derivedState = null;

    if (props.isSideNavExpanded === false && state.isExpanded === true) {
      derivedState = {
        isExpanded: props.isSideNavExpanded,
        wasPreviouslyExpanded: true,
      };
    } else if (
      props.isSideNavExpanded === true &&
      state.wasPreviouslyExpanded === true
    ) {
      derivedState = {
        isExpanded: props.isSideNavExpanded,
        wasPreviouslyExpanded: false,
      };
    }

    return derivedState;
  };

  constructor(props) {
    super(props);
    this.state = {
      isExpanded: props.defaultExpanded || false,
      wasPreviouslyExpanded: props.defaultExpanded || false,
    };
  }

  handleToggleExpand = event => {
    const { onToggle } = this.props;
    event.persist();
    this.setState(
      state => ({ isExpanded: !state.isExpanded }),
      () => {
        if (onToggle) {
          onToggle(event, { isExpanded: this.state.isExpanded });
        }
      }
    );
  };

  handleKeyToggleExpand = event => {
    if (event.charCode === 'Enter' || event.charCode === ' ') {
      const { onToggle } = this.props;
      event.persist();
      this.setState(
        state => ({ isExpanded: !state.isExpanded }),
        () => {
          if (onToggle) {
            onToggle(event, { isExpanded: this.state.isExpanded });
          }
        }
      );
    }
  };

  render() {
    const {
      buttonRef,
      className: customClassName,
      children,
      renderIcon: IconElement,
      isActive,
      title,
      large,
      isbackbutton,
      ...rest
    } = this.props;
    const { isExpanded } = this.state;

    let hasActiveChild;
    if (children) {
      // if we have children, either a single or multiple, find if it is active
      hasActiveChild = Array.isArray(children)
        ? children.some(child => {
            if (
              child &&
              child.props &&
              (child.props.isActive === true || child.props['aria-current'])
            ) {
              return true;
            }
            return false;
          })
        : children.props &&
          (children.props.isActive === true || children.props['aria-current']);
    }

    const className = cx({
      [`${prefix}--side-nav__item`]: true,
      [`${prefix}--side-nav__item--active`]:
        isActive || (hasActiveChild && !isExpanded),
      [`${prefix}--side-nav__item--icon`]: IconElement,
      [`${prefix}--side-nav__item--large`]: large,
      [customClassName]: !!customClassName,
    });
    return (
      <li className={className}>
        <button
          aria-haspopup="true"
          aria-expanded={isExpanded}
          className={`${prefix}--side-nav__submenu`}
          onClick={this.handleToggleExpand}
          ref={buttonRef}
          type="button">
          {IconElement && (
            <SideNavIcon>
              <IconElement />
            </SideNavIcon>
          )}
          <span
            className={`${prefix}--side-nav__submenu-title`}
            data-autoid={`${rest.autoid}`}>
            {title}
          </span>
          <SideNavIcon className={`${prefix}--side-nav__submenu-chevron`} small>
            <ChevronDown20 />
          </SideNavIcon>
        </button>
        <ul className={`${prefix}--side-nav__menu`} role="menu">
          {React.Children.map(children, this._renderSideNavItem)}
        </ul>
      </li>
    );
  }

  _renderSideNavItem = (item, index) => {
    if (item) {
      return React.cloneElement(item, {
        onClick:
          item.props.isbackbutton === 'true'
            ? this.handleToggleExpand.bind(this)
            : null,
        onKeyPress:
          item.props.isbackbutton === 'true'
            ? this.handleKeyToggleExpand.bind(this)
            : null,
      });
    }
  };
}

export default React.forwardRef((props, ref) => {
  return <SideNavMenu {...props} buttonRef={ref} />;
});
