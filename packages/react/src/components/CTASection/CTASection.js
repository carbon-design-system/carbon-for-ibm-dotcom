/**
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import classNames from 'classnames';
import ContentBlock from '../../internal/components/ContentBlock/ContentBlock';
import ContentItem from '../../internal/components/ContentItem/ContentItem';
import { CTA } from '../CTA';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * CTASection pattern.
 */
const CTASection = ({ heading, copy, cta, items, theme }) => {
  return (
    <section
      data-autoid={`${stablePrefix}--cta-section`}
      className={classNames(`${prefix}--cta-section`, {
        [`${prefix}--cta-section__has-items`]: items,
        [`${prefix}--cta-section--${theme}`]: theme,
      })}>
      <ContentBlock heading={heading} copy={copy} />
      <CTA customClassName={`${prefix}--cta-section__cta`} {...cta} />
      {items && (
        <div className={`${prefix}--helper-wrapper`}>
          <div className={`${prefix}--content-item-wrapper`}>
            {items.map((item, index) => (
              <ContentItem
                key={index}
                heading={item.heading}
                copy={item.copy}
                cta={item.cta}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

CTASection.propTypes = {
  /**
   * The heading for the CTA Section pattern.
   */
  heading: PropTypes.string.isRequired,

  /**
   * The copy for the CTA Section pattern.
   */
  copy: PropTypes.string.isRequired,

  /**
   * CTA object.
   * See the [`<CTA>`'s README](http://ibmdotcom-react.mybluemix.net/?path=/docs/components-cta--default#props) for full usage details.
   */
  cta: PropTypes.shape({
    style: PropTypes.oneOf(['text', 'card', 'button', 'feature']),
    type: PropTypes.oneOfType([
      PropTypes.oneOf([
        'jump',
        'local',
        'external',
        'download',
        'video',
        'default',
      ]),
      PropTypes.arrayOf(
        PropTypes.oneOf([
          'jump',
          'local',
          'external',
          'download',
          'video',
          'default',
        ])
      ),
    ]),
    copy: PropTypes.string,
    href: PropTypes.string,
    customClassName: PropTypes.string,
  }),

  /**
   * Color theme for pattern.
   */
  theme: PropTypes.oneOf(['white', 'g10', 'g90', 'g100']),

  /**
   * The `<ContentItem>` data to render.
   * See the [`<ContentItem>`'s README](http://ibmdotcom-react.mybluemix.net/?path=/docs/patterns-sub-patterms-contentitem--default#props) for full usage details.
   */
  items: PropTypes.arrayOf(
    PropTypes.shape({
      heading: PropTypes.string,
      copy: PropTypes.string,
      cta: PropTypes.shape({
        heading: PropTypes.string,
        copy: PropTypes.string,
        cta: PropTypes.shape({
          style: PropTypes.oneOf(['text', 'card', 'button', 'feature']),
          type: PropTypes.oneOfType([
            PropTypes.oneOf([
              'jump',
              'local',
              'external',
              'download',
              'video',
              'default',
            ]),
            PropTypes.arrayOf(
              PropTypes.oneOf([
                'jump',
                'local',
                'external',
                'download',
                'video',
                'default',
              ])
            ),
          ]),
          copy: PropTypes.string,
          href: PropTypes.string,
          customClassName: PropTypes.string,
        }),
      }),
    })
  ),
};

export default CTASection;
