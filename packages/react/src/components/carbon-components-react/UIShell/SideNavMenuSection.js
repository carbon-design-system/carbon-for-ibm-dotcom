/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20';
import ChevronLeft20 from '@carbon/icons-react/es/chevron--left/20';
import cx from 'classnames';
import SideNavLink from '../../../internal/vendor/carbon-components-react/components/UIShell/SideNavLink';
import SideNavMenuItem from '../../../internal/vendor/carbon-components-react/components/UIShell/SideNavMenuItem';
import settings from 'carbon-components/es/globals/js/settings';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import PropTypes from 'prop-types';
import React, { useRef, useEffect } from 'react';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * SideNavMenuSection component
 */
const SideNavMenuSection = ({
  className: customClassName,
  children,
  onBackClick,
  show,
  ...rest
}) => {
  const menuSectionRef = useRef(null);
  const backButtonRef = useRef(null);

  useEffect(() => {
    if (show) {
      /**
       * In order for tabbing to work, focus has to be set in the menu section when it
       * is visible. If menu section is a submenu, set focus to the back button. If menu section
       * is the first parent section, set focus to the hamburger toggle button.
       *
       * @param {Node} focusElement node element to focus
       */
      const setFocus = focusElement => {
        menuSectionRef.current?.addEventListener(
          'transitionend',
          function focus(event) {
            if (
              event.propertyName === 'left' ||
              event.propertyName === 'transform'
            ) {
              focusElement.focus();
            }
            menuSectionRef.current?.removeEventListener('transitionend', focus);
          }
        );
      };

      if (rest.isSubmenu) {
        setFocus(backButtonRef.current);
      } else {
        setFocus(rest.focusNode);
      }
    }
  }, [rest.focusNode, rest.isSubmenu, show]);

  const className = cx({
    [`${prefix}--side-nav__menu-section`]: true,
    [`${prefix}--side-nav__menu-section--expanded`]: show,
    [customClassName]: !!customClassName,
  });

  const handleBackButtonClick = event => {
    event.preventDefault();
    onBackClick();
  };

  const handleBackButtonKeyPress = event => {
    if (event.key === 'Enter' || event.charCode === ' ') {
      event.preventDefault();
      onBackClick();
    }
  };

  return (
    <div className={className} id={rest.id} ref={menuSectionRef}>
      {rest.backButtonText && (
        <>
          <SideNavMenuItem
            ref={backButtonRef}
            onClick={handleBackButtonClick}
            onKeyPress={handleBackButtonKeyPress}
            className={`${prefix}--masthead__side-nav--submemu-back`}
            data-autoid={`${stablePrefix}--masthead-${rest.navType}-sidenav__l0-back`}
            isbackbutton="true"
            role="button"
            tabIndex="0">
            <ChevronLeft20 />
            {rest.backButtonText}
          </SideNavMenuItem>
          {rest.titleUrl ? (
            <SideNavLink
              className={`${prefix}--masthead__side-nav--submemu-section-title`}
              href={rest.titleUrl}>
              {rest.title}
              <div
                className={`${prefix}--masthead__side-nav--submemu-section-title__icon`}>
                <ArrowRight20 />
              </div>
            </SideNavLink>
          ) : (
            <li className={`${prefix}--masthead__side-nav--submemu-title`}>
              {rest.title}
            </li>
          )}
          {rest.heading && (
            <p className={`${prefix}--masthead__side-nav--submemu-heading`}>
              {rest.heading}
            </p>
          )}
        </>
      )}
      {children}
      <button
        className={`${prefix}--masthead__focus`}
        onFocus={e => {
          if (rest.focusNode) {
            rest.focusNode.focus();
          } else {
            e.target.parentElement.querySelector('a').focus();
          }
        }}
        aria-hidden={true}
      />
    </div>
  );
};

SideNavMenuSection.propTypes = {
  /**
   * Provide an optional class to be applied to the containing node
   */
  className: PropTypes.string,

  /**
   * <SideNavMenuItem>'s within SideNavMenuSection
   */
  children: PropTypes.node,

  /**
   * action on back click
   */
  onBackClick: PropTypes.func,

  /**
   * Determine whether to show SideNavMenuSection
   */
  show: PropTypes.bool,
};

SideNavMenuSection.defaultProps = {
  show: false,
  onBackClick: () => {},
};

export default SideNavMenuSection;
