/* eslint-disable */
/* istanbul ignore file */

/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import classnames from 'classnames';
import ChevronDown20 from '@carbon/icons-react/es/chevron--down/20';
import settings from 'carbon-components/es/globals/js/settings';
import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import {
  keys,
  matches,
} from '../../../internal/vendor/carbon-components-react/internal/keyboard';
import { AriaLabelPropType } from '../../../internal/vendor/carbon-components-react/prop-types/AriaPropTypes';

const { prefix } = settings;

const defaultRenderMenuContent = () => (
  <ChevronDown20 className={`${prefix}--header__menu-arrow`} />
);

/**
 * `HeaderMenu` is used to render submenu's in the `Header`. Most often children
 * will be a `HeaderMenuItem`. It handles certain keyboard events to help
 * with managing focus. It also passes along refs to each child so that it can
 * help manage focus state of its children.
 */
class HeaderMenu extends React.Component {
  static propTypes = {
    /**
     * Required props for the accessibility label of the menu
     */
    ...AriaLabelPropType,

    /**
     * Provide a custom ref handler for the menu button
     */
    focusRef: PropTypes.func,

    /**
     * Optionally provide a tabIndex for the underlying menu button
     */
    tabIndex: PropTypes.number,

    /**
     * Provide a label for the link text
     */
    menuLinkName: PropTypes.string.isRequired,

    /**
     * Optional component to render instead of string
     */
    renderMenuContent: PropTypes.func,

    /**
     * function to toogle overlay that appears when opening menu
     */
    setOverlay: PropTypes.func,
  };

  static defaultProps = {
    renderMenuContent: defaultRenderMenuContent,
    setOverlay: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      // Used to manage the expansion state of the menu
      expanded: false,
      // Refers to the menuitem that is currently focused
      // Note: children should have `role="menuitem"` on node consuming ref
      selectedIndex: null,
    };
    this.items = [];
  }

  /**
   * Toggle the expanded state of the menu on click.
   */
  handleOnClick = index => {
    this.setState(prevState => {
      if (prevState.expanded) this.props.setOverlay(false);
      else this.props.setOverlay(true);
      return {
        expanded: !prevState.expanded,
      };
    });
  };

  /**
   * Keyboard event handler for the entire menu.
   */
  handleOnKeyDown = event => {
    // Handle enter or space key for toggling the expanded state of the menu.
    if (matches(event, [keys.Enter, keys.Space])) {
      event.stopPropagation();
      event.preventDefault();

      this.handleOnClick();

      return;
    }
  };

  /**
   * Checks if user has tabbed to menu items within the megamenu,
   * if so do not set overlay to false
   */
  checkMenuItems = event => {
    const megamenuItems = [
      `${prefix}--masthead__megamenu__category-headline`,
      `${prefix}--masthead__megamenu__menu-category`,
      `${prefix}--masthead__megamenu__view-all-cta`,
    ];

    return megamenuItems.filter(item =>
      event.relatedTarget.parentElement.className?.includes(item)
    );
  };

  /**
   * Handle our blur event from our underlying menuitems. Will mostly be used
   * for toggling the expansion status of our menu in response to a user
   * clicking off of the menu or menubar.
   */
  handleOnBlur = event => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      this.setState({ expanded: false, selectedIndex: null });
    }

    const megamenuItems = [
      `${prefix}--masthead__megamenu__category-headline`,
      `${prefix}--masthead__megamenu__menu-category`,
      `${prefix}--masthead__megamenu__view-all-cta`,
    ];

    if (!event.relatedTarget || !this.checkMenuItems(event).length) {
      this.props.setOverlay(false);
    }
  };

  /**
   * ref handler for our menu button. This node is represented by the
   * `role="menu"` attribute. If we are supplied a `focusRef` prop, we also
   * forward along the node.
   *
   * This is useful when this component is a child in a
   * menu or menubar as it will allow the parent to explicitly focus the menu
   * button node when that child should receive focus.
   */
  handleMenuButtonRef = node => {
    if (this.props.focusRef) {
      this.props.focusRef(node);
    }
    this.menuButtonRef = node;
  };

  /**
   * Handles individual menuitem refs. We assign them to a class instance
   * property so that we can properly manage focus of our children.
   */
  handleItemRef = index => node => {
    this.items[index] = node;
  };

  handleMenuClose = event => {
    // Handle ESC keydown for closing the expanded menu.
    if (matches(event, [keys.Escape]) && this.state.expanded) {
      event.stopPropagation();
      event.preventDefault();

      this.setState(() => ({
        expanded: false,
        selectedIndex: null,
      }));

      // remove overlay
      this.props.setOverlay(false);

      // Return focus to menu button when the user hits ESC.
      this.menuButtonRef.focus();
      return;
    }
  };

  render() {
    const {
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      className: customClassName,
      children,
      renderMenuContent: MenuContent,
      menuLinkName,
    } = this.props;
    const accessibilityLabel = {
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
    };

    const className = cx(`${prefix}--header__submenu`, customClassName);
    // Notes on eslint comments and based on the examples in:
    // https://www.w3.org/TR/wai-aria-practices/examples/menubar/menubar-1/menubar-1.html#
    // - The focus is handled by the <a> menuitem, onMouseOver is for mouse
    // users
    // - aria-haspopup can definitely have the value "menu"
    // - aria-expanded is on their example node with role="menuitem"
    // - href can be set to javascript:void(0), ideally this will be a button
    return (
      <li // eslint-disable-line jsx-a11y/mouse-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
        className={className}
        onKeyDown={this.handleMenuClose}
        onClick={this.handleOnClick}
        onBlur={this.handleOnBlur}>
        <a // eslint-disable-line jsx-a11y/role-supports-aria-props,jsx-a11y/anchor-is-valid
          aria-haspopup="menu" // eslint-disable-line jsx-a11y/aria-proptypes
          aria-expanded={this.state.expanded}
          className={`${prefix}--header__menu-item ${prefix}--header__menu-title`}
          href="#"
          onClick={event => event.preventDefault()}
          onKeyDown={this.handleOnKeyDown}
          ref={this.handleMenuButtonRef}
          role="menuitem"
          tabIndex={0}
          {...accessibilityLabel}>
          {menuLinkName}
          <MenuContent />
        </a>
        <ul
          {...accessibilityLabel}
          className={classnames(`${prefix}--header__menu`, {
            [`${prefix}--header__menu--open`]: this.state.expanded,
          })}
          role="menu">
          {React.Children.map(children, this._renderMenuItem)}
        </ul>
      </li>
    );
  }

  /**
   * Render an individual menuitem, passing along `role: 'none'` because the
   * host node <li> doesn't apply when in a <ul> with `role="menu"` and so we
   * need to revert the semantics.
   *
   * We also capture the `ref` for each child inside of `this.items` to properly
   * manage focus. In addition to this focus management, all items receive a
   * `tabIndex: -1` so the user won't hit a large number of items in their tab
   * sequence when they might not want to go through all the items.
   */
  _renderMenuItem = (item, index) => {
    return React.cloneElement(item, {
      ref: this.handleItemRef(index),
      role: 'none',
    });
  };
}

export default React.forwardRef((props, ref) => {
  return <HeaderMenu {...props} focusRef={ref} />;
});
