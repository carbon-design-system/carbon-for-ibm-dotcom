/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ConditionalWrapper from '../../internal/components/ConditionalWrapper/ConditionalWrapper';
import MastheadLogo from '@carbon/ibmdotcom-styles/icons/svg/IBM-8bar-logo--h23.svg';
import MastheadLogoAPI from '@carbon/ibmdotcom-services/es/services/MastheadLogo/MastheadLogo';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';
import TooltipDefinition from '../../internal/vendor/carbon-components-react/components/TooltipDefinition';

const { prefix } = settings;

/**
 * IBM Logo 8-bar component.
 */
const IbmLogo = ({ autoid, logoData }) => {
  const useAlternateLogo = MastheadLogoAPI.setMastheadLogo(logoData);

  return (
    <div className={`${prefix}--header__logo`}>
      <ConditionalWrapper
        condition={logoData && logoData.tooltip !== undefined}
        wrapper={children => (
          <TooltipDefinition tooltipText={logoData.tooltip}>
            {children}
          </TooltipDefinition>
        )}>
        {useAlternateLogo ? (
          <a // eslint-disable-line
            aria-label="IBM®"
            data-autoid={autoid}
            href={`http://www.ibm.com${logoData.path}`}
            {...(useAlternateLogo
              ? { dangerouslySetInnerHTML: { __html: logoData.svg } }
              : {})}
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
   * Masthead logo object
   * `svg`: Alternate IBM logo <svg />
   * `tooltip`: Tooltip copy
   * `denyList`: List of paths to block using alternate logo
   * `allowList`: List of paths to allow using alternate logo
   * `expire`: Expiry date. Reverts to standard 8-bar
   * `url`: IBM logo url path. e.g. /it-it
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
