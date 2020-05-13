import { ContentBlock } from '../../sub-patterns/ContentBlock';
import { ContentItem } from '../../sub-patterns/ContentItem';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import PropTypes from 'prop-types';
import React from 'react';
import { settings } from 'carbon-components';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * CTASection pattern
 *
 * @param {object} props props object
 * @param {string} props.heading heading string
 * @param {string} props.copy pattern copy
 * @param {object} props.cta CTA component
 * @ param {Array} props.items CTA items to the ContentItem
 * @returns {object} JSX Object
 */
const CTASection = ({ heading, copy, cta, items }) => (
  <section
    data-autoid={`${stablePrefix}--cta-section`}
    className={`${prefix}--cta-section`}>
    <ContentBlock heading={heading} copy={copy} cta={cta} />
    <hr className={`${prefix}--horizontal-line`} />
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
  </section>
);

CTASection.propTypes = {
  heading: PropTypes.string.isRequired,
  copy: PropTypes.string.isRequired,
  cta: PropTypes.object,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      heading: PropTypes.string,
      copy: PropTypes.string,
      cta: PropTypes.shape({
        heading: PropTypes.string,
        copy: PropTypes.string,
        cta: PropTypes.object,
      }),
    })
  ),
};

export default CTASection;
