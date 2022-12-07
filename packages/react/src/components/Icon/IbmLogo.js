/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ConditionalWrapper from '../../internal/components/ConditionalWrapper/ConditionalWrapper';
import cx from 'classnames';
import MastheadLogo from '@carbon/ibmdotcom-styles/icons/svg/IBM-8bar-logo--h23.svg';
import MastheadLogoAPI from '../../internal/vendor/@carbon/ibmdotcom-services/services/MastheadLogo/MastheadLogo';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';
import TooltipDefinition from '../../internal/vendor/carbon-components-react/components/TooltipDefinition';

const { prefix } = settings;

/**
 * IBM Logo 8-bar component.
 */
const IbmLogo = ({ autoid, logoData, isSearchActive }) => {
  const useAlternateLogo = MastheadLogoAPI.setMastheadLogo(logoData);
  const logoClasses = cx({
    [`${prefix}--header__logo`]: true,
    [`${prefix}--search-active`]: isSearchActive,
  });

  return (
    <div className={logoClasses}>
      <ConditionalWrapper
        condition={logoData && logoData.tooltip !== undefined}
        wrapper={(children) => (
          <TooltipDefinition tooltipText={logoData.tooltip}>
            {children}
          </TooltipDefinition>
        )}>
        {useAlternateLogo ? (
          <a // eslint-disable-line
            aria-label="IBM®"
            data-autoid={autoid}
            href={`https://www.ibm.com${logoData.path}`}
            dangerouslySetInnerHTML={{ __html: logoData.svg }}
          />
        ) : (
          <a aria-label="IBM®" data-autoid={autoid} href={`http://www.ibm.com`}>
            {!useAlternateLogo && <MastheadLogo />}
          </a>
        )}
      </ConditionalWrapper>
    </div>
  );
};

export default IbmLogo;

IbmLogo.propTypes = {
  /**
   * data-autoid attribute for analytics
   */
  autoid: PropTypes.string,

  /**
   * `true` when search is active
   */
  isSearchActive: PropTypes.bool,

  /**
   * Masthead logo object
   * See [mastheadLogo](#mastheadlogo)
   * for details.
   */
  logoData: PropTypes.shape({
    svg: PropTypes.string,
    tooltip: PropTypes.string,
    denyList: PropTypes.array,
    allowList: PropTypes.array,
    expire: PropTypes.string,
    path: PropTypes.string,
  }),
};
