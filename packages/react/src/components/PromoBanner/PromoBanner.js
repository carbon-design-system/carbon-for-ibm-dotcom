/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import LinkWithIcon from '../LinkWithIcon/LinkWithIcon';
import markdownToHtml from '@carbon/ibmdotcom-utilities/es/utilities/markdownToHtml/markdownToHtml';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

const PromoBanner = ({ banner, copy, cta }) =>
  banner && copy && cta ? (
    <section
      data-autoid={`${stablePrefix}--promo-banner`}
      className={`${prefix}--promo-banner`}>
      <div className={`${prefix}--promo-banner__row`}>
        <div className={`${prefix}--promo-banner__left-column`}>{banner}</div>
        <div className={`${prefix}--promo-banner__content`}>
          <div
            className={`${prefix}--promo-banner__copy`}
            dangerouslySetInnerHTML={{
              __html: markdownToHtml(copy, { bold: false }),
            }}
          />
          <LinkWithIcon href={cta.href}>
            <span>{cta.copy}</span>
            {cta.icon}
          </LinkWithIcon>
        </div>
      </div>
    </section>
  ) : null;

PromoBanner.propTypes = {
  /**
   * The banner positioned on the left side of the section. It is required, otherwise, the section will not render.
   */
  banner: PropTypes.node.isRequired,
  /**
   * The promo-band description. Enabled for markdown to HTML utility. It is required, otherwise, the section will not render.
   */
  copy: PropTypes.string.isRequired,
  /**
   * Call to Action of the section. See [LinkWithIcon]('../LinkWithIcon/README.stories.mdx'). It is required, otherwise, the section will not render.
   */
  cta: PropTypes.shape({
    href: PropTypes.string,
    copy: PropTypes.string,
    icon: PropTypes.node,
  }).isRequired,
};

export default PromoBanner;
