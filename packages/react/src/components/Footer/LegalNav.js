/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import Link from '../../internal/vendor/carbon-components-react/components/Link/Link';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Footer legal nav component.
 */
const LegalNav = ({ links, type, button, adjunctLinks }) => {
  if (!links?.length) {
    return null;
  }

  const listStyle = cx({
    [`${prefix}--legal-nav__micro`]: type === 'micro',
  });

  return (
    <aside
      data-autoid={`${stablePrefix}--footer-legal-nav`}
      className={`${prefix}--legal-nav__container`}
      aria-label="Footer legal links container"
    >
      <nav
        className={`${prefix}--legal-nav`}
        aria-label="Footer legal link list"
      >
        <div className={`${prefix}--legal-nav__list ${listStyle}`}>
          <ul className={`${prefix}--legal-nav__holder`}>
            {links &&
              links.map(({ title, titleEnglish, url }, index) => {
                if (!title || !url) {
                  return null;
                }

                const dataTitle = titleEnglish
                  ? titleEnglish
                      .replace(/[^-a-zA-Z0-9_ ]/g, '')
                      .replace(/ +/g, '-')
                      .toLowerCase()
                  : null;

                return (
                  <li className={`${prefix}--legal-nav__list-item`} key={index}>
                    <Link
                      data-autoid={`${stablePrefix}--footer-legal-nav__link-${dataTitle}`}
                      className={`${prefix}--footer__link`}
                      href={url}
                    >
                      {title}
                    </Link>
                  </li>
                );
              })}
            <li
              className={`${prefix}--legal-nav__list-item`}
              data-autoid={`${stablePrefix}--privacy-cp`}
            />
          </ul>
          {button}
        </div>
        {adjunctLinks && (
          <ul className={`${prefix}--adjunct-links__holder`}>
            {adjunctLinks.map(({ title, titleEnglish, url }, index) => {
              if (!title || !url) {
                return null;
              }

              const dataTitle = titleEnglish
                ? titleEnglish
                    .replace(/[^-a-zA-Z0-9_ ]/g, '')
                    .replace(/ +/g, '-')
                    .toLowerCase()
                : null;

              return (
                <li className={`${prefix}--legal-nav__list-item`} key={index}>
                  <Link
                    data-autoid={`${stablePrefix}--footer-legal-nav__link-${dataTitle}`}
                    className={`${prefix}--footer__link`}
                    href={url}
                  >
                    {title}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </nav>
    </aside>
  );
};

LegalNav.propTypes = {
  /**
   * A list of links to be rendered.
   */
  links: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      url: PropTypes.string,
    })
  ),

  /**
   * List of adjunct links to be rendered
   */
  adjunctLinks: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      url: PropTypes.string,
    })
  ),

  /**
   * Footer type
   */
  type: PropTypes.string,

  /**
   * The locale/language selector button.
   * Renders only in micro version
   */
  button: PropTypes.object,
};

LegalNav.defaultProps = {
  links: null,
};

export default LegalNav;
